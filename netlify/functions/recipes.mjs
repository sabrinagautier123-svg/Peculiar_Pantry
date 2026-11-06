import { getStore } from '@netlify/blobs';
import { createHash } from 'node:crypto';

const MAX_IMAGE_CHARS = 700_000; // ~500 KB image as data URL
const json = (data, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  });

const hash = (token) => createHash('sha256').update(String(token)).digest('hex');
const str = (v, max) => String(v ?? '').slice(0, max);
const num = (v, fallback = 0) => (Number.isFinite(Number(v)) ? Number(v) : fallback);
const img = (v) => {
  const s = String(v ?? '');
  return s.length <= MAX_IMAGE_CHARS ? s : '';
};

// Whitelist and clamp every field so users can't store arbitrary junk.
function sanitize(r) {
  if (!r || typeof r !== 'object') return null;
  const id = str(r.id, 40);
  if (!/^[A-Za-z0-9_-]+$/.test(id)) return null;
  const title = str(r.title, 200).trim();
  if (!title) return null;

  const ingredients = (Array.isArray(r.ingredients) ? r.ingredients : [])
    .slice(0, 60)
    .map((i) => ({
      name: str(i?.name, 120),
      amount: num(i?.amount, 1),
      unit: str(i?.unit, 12),
      aisle: str(i?.aisle, 60),
      image: img(i?.image),
    }));
  const instructions = (Array.isArray(r.instructions) ? r.instructions : [])
    .slice(0, 60)
    .map((s) => str(s, 1000));
  const tags = (Array.isArray(r.tags) ? r.tags : []).slice(0, 12).map((t) => str(t, 40));

  return {
    id,
    title,
    category: str(r.category, 40),
    prepTime: num(r.prepTime, 15),
    servings: Math.max(1, num(r.servings, 1)),
    calories: num(r.calories),
    protein: num(r.protein),
    carbs: num(r.carbs),
    fat: num(r.fat),
    tags,
    image: img(r.image),
    ingredients,
    instructions,
  };
}

export default async (req) => {
  const store = getStore({ name: 'recipes', consistency: 'strong' });
  const url = new URL(req.url);
  const token = req.headers.get('x-owner-token') || '';

  try {
    // LIST: everyone can read all shared recipes
    if (req.method === 'GET') {
      const { blobs } = await store.list();
      const items = await Promise.all(blobs.map((b) => store.get(b.key, { type: 'json' })));
      const recipes = items
        .filter(Boolean)
        .map(({ _owner, ...recipe }) => recipe) // never expose owner hashes
        .sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
      return json({ recipes });
    }

    // CREATE
    if (req.method === 'POST') {
      if (!token) return json({ error: 'Missing owner token' }, 400);
      const recipe = sanitize(await req.json());
      if (!recipe) return json({ error: 'Invalid recipe' }, 400);
      const existing = await store.get(recipe.id, { type: 'json' });
      if (existing) return json({ error: 'Recipe id already exists' }, 409);
      await store.setJSON(recipe.id, { ...recipe, createdAt: Date.now(), _owner: hash(token) });
      return json({ ok: true });
    }

    // UPDATE (owner only)
    if (req.method === 'PUT') {
      const recipe = sanitize(await req.json());
      if (!recipe) return json({ error: 'Invalid recipe' }, 400);
      const existing = await store.get(recipe.id, { type: 'json' });
      if (!existing) return json({ error: 'Not found' }, 404);
      if (!token || existing._owner !== hash(token)) return json({ error: 'Not allowed' }, 403);
      await store.setJSON(recipe.id, {
        ...recipe,
        createdAt: existing.createdAt,
        _owner: existing._owner,
      });
      return json({ ok: true });
    }

    // DELETE (owner only)
    if (req.method === 'DELETE') {
      const id = url.searchParams.get('id') || '';
      const existing = await store.get(id, { type: 'json' });
      if (!existing) return json({ ok: true });
      if (!token || existing._owner !== hash(token)) return json({ error: 'Not allowed' }, 403);
      await store.delete(id);
      return json({ ok: true });
    }

    return json({ error: 'Method not allowed' }, 405);
  } catch (err) {
    console.error(err);
    return json({ error: 'Server error' }, 500);
  }
};

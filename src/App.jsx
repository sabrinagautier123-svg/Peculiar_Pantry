import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { 
  Calendar, Plus, Trash2, CheckCircle, Circle, ChefHat, 
  ShoppingBag, Clock, Users, X, BookOpen, HelpCircle, Utensils, Pencil, Eye, Upload
} from 'lucide-react';

const INITIAL_RECIPES = [
  {
    id: '1',
    title: 'Avocado Toast & Poached Egg',
    category: 'Breakfast',
    prepTime: 10,
    servings: 1,
    calories: 320,
    protein: 14,
    carbs: 28,
    fat: 18,
    tags: ['Breakfast', 'High Protein', 'Quick & Easy'],
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=600&auto=format&fit=crop&q=80',
    ingredients: [
      { name: 'Sourdough Bread', amount: 2, unit: 'slice', aisle: 'Bakery', image: '' },
      { name: 'Avocado', amount: 1, unit: 'pc', aisle: 'Produce', image: '' },
      { name: 'Eggs', amount: 2, unit: 'pc', aisle: 'Dairy & Eggs', image: '' },
      { name: 'Chili Flakes', amount: 1, unit: 'tsp', aisle: 'Pantry', image: '' }
    ],
    instructions: [
      'Toast sourdough slices until golden.',
      'Mash avocado with a pinch of salt and lemon juice.',
      'Poach eggs in simmering water for 3 minutes.',
      'Spread avocado on toast, top with eggs and chili flakes.'
    ]
  },
  {
    id: '2',
    title: 'Grilled Salmon Quinoa Bowl',
    category: 'Lunch/Dinner',
    prepTime: 25,
    servings: 2,
    calories: 540,
    protein: 42,
    carbs: 45,
    fat: 22,
    tags: ['Lunch/Dinner', 'High Protein', 'Low Carb'],
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600&auto=format&fit=crop&q=80',
    ingredients: [
      { name: 'Salmon Fillet', amount: 300, unit: 'g', aisle: 'Meat & Seafood', image: '' },
      { name: 'Cooked Quinoa', amount: 1, unit: 'cup', aisle: 'Grains & Pasta', image: '' },
      { name: 'Spinach', amount: 100, unit: 'g', aisle: 'Produce', image: '' },
      { name: 'Cherry Tomatoes', amount: 10, unit: 'pc', aisle: 'Produce', image: '' },
      { name: 'Olive Oil', amount: 1, unit: 'tbsp', aisle: 'Pantry', image: '' }
    ],
    instructions: [
      'Season salmon with salt, pepper, and olive oil.',
      'Grill salmon for 4 minutes per side until cooked through.',
      'Assemble bowl with quinoa base, fresh spinach, and cherry tomatoes.',
      'Top with grilled salmon fillet and serve.'
    ]
  },
  {
    id: '3',
    title: 'Greek Yogurt Berry Parfait',
    category: 'Snack',
    prepTime: 5,
    servings: 1,
    calories: 220,
    protein: 18,
    carbs: 26,
    fat: 4,
    tags: ['Snack', 'High Protein', 'Quick & Easy'],
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600&auto=format&fit=crop&q=80',
    ingredients: [
      { name: 'Greek Yogurt', amount: 1, unit: 'cup', aisle: 'Dairy & Eggs', image: '' },
      { name: 'Mixed Berries', amount: 100, unit: 'g', aisle: 'Produce', image: '' },
      { name: 'Honey', amount: 1, unit: 'tbsp', aisle: 'Pantry', image: '' },
      { name: 'Granola', amount: 0.5, unit: 'cup', aisle: 'Pantry', image: '' }
    ],
    instructions: [
      'Layer Greek yogurt in a glass bowl or jar.',
      'Top with mixed fresh berries and granola.',
      'Drizzle with honey before serving.'
    ]
  },
  {
    id: 'mp1',
    title: 'Grilled Chicken Burrito Bowls',
    category: 'Lunch/Dinner',
    prepTime: 40,
    servings: 3,
    calories: 930,
    protein: 88,
    carbs: 125,
    fat: 14,
    tags: ['Lunch/Dinner', 'High Protein', 'Meal Prep'],
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600&auto=format&fit=crop&q=80',
    ingredients: [
      { name: 'Chicken Breast', amount: 300, unit: 'g', aisle: 'Meat & Seafood', image: '' },
      { name: 'Brown Rice (dry)', amount: 0.5, unit: 'cup', aisle: 'Grains & Pasta', image: '' },
      { name: 'Paprika', amount: 1, unit: 'tsp', aisle: 'Pantry', image: '' },
      { name: 'Ground Cumin', amount: 0.5, unit: 'tsp', aisle: 'Pantry', image: '' },
      { name: 'Garlic', amount: 1, unit: 'pc', aisle: 'Produce', image: '' },
      { name: 'Zucchini', amount: 1, unit: 'pc', aisle: 'Produce', image: '' },
      { name: 'Capsicum', amount: 1, unit: 'pc', aisle: 'Produce', image: '' },
      { name: 'Corn Kernels', amount: 1, unit: 'cup', aisle: 'Produce', image: '' },
      { name: 'Shredded Lettuce', amount: 1, unit: 'cup', aisle: 'Produce', image: '' },
      { name: 'Salsa', amount: 0.25, unit: 'cup', aisle: 'Pantry', image: '' },
      { name: 'Light Greek Yoghurt', amount: 0.25, unit: 'cup', aisle: 'Dairy & Eggs', image: '' }
    ],
    instructions: [
      'Rinse the rice and simmer with 1 cup water, covered, for 30-35 minutes until tender. Rest 5 minutes, fluff, and spread on a tray to cool quickly.',
      'Slice the chicken in half horizontally so it is evenly thin. Rub with paprika, cumin, crushed garlic, salt, pepper and a little oil spray.',
      'Cook in a hot pan or grill pan for 5-6 minutes per side, until the centre reaches 75°C or the juices run clear. Rest 5 minutes, then slice.',
      'Grill or pan-fry the sliced zucchini and capsicum on high for 3-4 minutes per side until lightly charred. Warm the corn in the same pan for 2 minutes.',
      'Divide the rice, chicken, corn and grilled veg into 3 containers. Keep the lettuce, salsa and yoghurt in a separate small container.',
      'To serve, reheat until steaming hot (about 2 minutes in the microwave), then add the fresh toppings. Keeps 3 days in the fridge.'
    ]
  },
  {
    id: 'mp2',
    title: 'Beef Mince & Veg Bolognese',
    category: 'Lunch/Dinner',
    prepTime: 35,
    servings: 3,
    calories: 810,
    protein: 82,
    carbs: 105,
    fat: 20,
    tags: ['Lunch/Dinner', 'High Protein', 'Meal Prep', 'Freezer Friendly'],
    image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=600&auto=format&fit=crop&q=80',
    ingredients: [
      { name: 'Lean Beef Mince', amount: 300, unit: 'g', aisle: 'Meat & Seafood', image: '' },
      { name: 'Onion', amount: 1, unit: 'pc', aisle: 'Produce', image: '' },
      { name: 'Garlic', amount: 2, unit: 'pc', aisle: 'Produce', image: '' },
      { name: 'Zucchini', amount: 1, unit: 'pc', aisle: 'Produce', image: '' },
      { name: 'Carrot', amount: 1, unit: 'pc', aisle: 'Produce', image: '' },
      { name: 'Crushed Tomatoes (can)', amount: 1, unit: 'pc', aisle: 'Pantry', image: '' },
      { name: 'Dried Italian Herbs', amount: 1, unit: 'tsp', aisle: 'Pantry', image: '' },
      { name: 'Lentil Pasta (dry)', amount: 60, unit: 'g', aisle: 'Grains & Pasta', image: '' },
      { name: 'Green Beans or Cauliflower', amount: 200, unit: 'g', aisle: 'Produce', image: '' }
    ],
    instructions: [
      'Heat a large pan over medium-high with a little oil spray. Fry the diced onion for 3 minutes, then add the garlic for 30 seconds.',
      'Add the mince, break it up, and cook 5-6 minutes until browned.',
      'Stir in the grated zucchini and carrot and cook for 3 minutes.',
      'Add the crushed tomatoes, herbs, salt and pepper. Reduce the heat and simmer, partly covered, for 15-20 minutes, stirring occasionally.',
      'Cook the lentil pasta per the packet (usually 7-9 minutes), drain, and measure 1/3 cup cooked per serve.',
      'Steam the green beans or cauliflower for 4-5 minutes.',
      'Divide the sauce, pasta and veg into 3 containers. Cool before sealing and refrigerating. Keeps 3 days, or freeze up to 3 months.'
    ]
  },
  {
    id: 'mp3',
    title: 'Tuna & Sweet Potato Cakes',
    category: 'Lunch/Dinner',
    prepTime: 40,
    servings: 3,
    calories: 850,
    protein: 97,
    carbs: 100,
    fat: 16,
    tags: ['Lunch/Dinner', 'High Protein', 'Meal Prep'],
    image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=600&auto=format&fit=crop&q=80',
    ingredients: [
      { name: 'Sweet Potato', amount: 250, unit: 'g', aisle: 'Produce', image: '' },
      { name: 'Canned Tuna in Springwater (95g)', amount: 3, unit: 'pc', aisle: 'Pantry', image: '' },
      { name: 'Eggs', amount: 2, unit: 'pc', aisle: 'Dairy & Eggs', image: '' },
      { name: 'Corn Kernels', amount: 0.5, unit: 'cup', aisle: 'Produce', image: '' },
      { name: 'Spring Onion', amount: 1, unit: 'pc', aisle: 'Produce', image: '' },
      { name: 'Cauliflower', amount: 1, unit: 'pc', aisle: 'Produce', image: '' },
      { name: 'Green Beans', amount: 100, unit: 'g', aisle: 'Produce', image: '' }
    ],
    instructions: [
      'Peel and cube the sweet potato. Boil for 10-12 minutes (or microwave) until very soft. Drain well and mash, which should give about 1 cup.',
      'Cool the mash for 10 minutes so it does not cook the eggs.',
      'Drain the tuna thoroughly. Mix with the mash, eggs, corn, sliced spring onion, salt and pepper.',
      'Shape into 6 patties. If the mixture is too wet, chill it for 15 minutes or add 1-2 tbsp oat flour or breadcrumbs.',
      'Bake on a lined tray at 200°C for 20 minutes, flipping halfway, until golden. Or pan-fry on medium heat with oil spray, 3-4 minutes per side.',
      'Toss the cauliflower florets and green beans with oil spray and salt. Roast on a second tray at 200°C for 20-25 minutes.',
      'Cool completely, then portion 2 cakes plus veg per container. Best eaten within 2 days (3 at most).'
    ]
  },
  {
    id: 'mp4',
    title: 'Chicken, Cauliflower & Veg Tray Bake',
    category: 'Lunch/Dinner',
    prepTime: 40,
    servings: 3,
    calories: 720,
    protein: 85,
    carbs: 78,
    fat: 10,
    tags: ['Lunch/Dinner', 'High Protein', 'Meal Prep'],
    image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=600&auto=format&fit=crop&q=80',
    ingredients: [
      { name: 'Chicken Breast', amount: 300, unit: 'g', aisle: 'Meat & Seafood', image: '' },
      { name: 'Sweet Potato', amount: 200, unit: 'g', aisle: 'Produce', image: '' },
      { name: 'Cauliflower', amount: 1, unit: 'pc', aisle: 'Produce', image: '' },
      { name: 'Zucchini', amount: 2, unit: 'pc', aisle: 'Produce', image: '' },
      { name: 'Green Beans', amount: 150, unit: 'g', aisle: 'Produce', image: '' },
      { name: 'Lemon', amount: 1, unit: 'pc', aisle: 'Produce', image: '' },
      { name: 'Garlic', amount: 2, unit: 'pc', aisle: 'Produce', image: '' },
      { name: 'Dried Mixed Herbs', amount: 1, unit: 'tsp', aisle: 'Pantry', image: '' }
    ],
    instructions: [
      'Heat the oven to 200°C (180°C fan) and line a large tray with baking paper.',
      'Spread the sweet potato cubes (1.5cm) on the tray, spray with oil, and roast alone for 10 minutes since it takes longest.',
      'Meanwhile, toss the chicken strips with the juice of half the lemon, crushed garlic, herbs, salt and pepper.',
      'Add the cauliflower, zucchini, green beans and chicken to the tray, spreading everything out so it roasts rather than steams.',
      'Roast 20-25 minutes, stirring once, until the chicken is cooked through (75°C, no pink) and the veg is golden.',
      'Squeeze over the remaining lemon, cool, and divide into 3 containers. Keeps 3 days.'
    ]
  },
  {
    id: 'mp5',
    title: 'Beef & Veg Stir-Fry with Buckwheat Noodles',
    category: 'Lunch/Dinner',
    prepTime: 25,
    servings: 3,
    calories: 750,
    protein: 76,
    carbs: 64,
    fat: 24,
    tags: ['Lunch/Dinner', 'High Protein', 'Meal Prep', 'Quick & Easy'],
    image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=600&auto=format&fit=crop&q=80',
    ingredients: [
      { name: 'Beef Strips', amount: 300, unit: 'g', aisle: 'Meat & Seafood', image: '' },
      { name: 'Buckwheat Noodles (dry)', amount: 50, unit: 'g', aisle: 'Grains & Pasta', image: '' },
      { name: 'Carrot', amount: 1, unit: 'pc', aisle: 'Produce', image: '' },
      { name: 'Zucchini', amount: 1, unit: 'pc', aisle: 'Produce', image: '' },
      { name: 'Green Beans', amount: 150, unit: 'g', aisle: 'Produce', image: '' },
      { name: 'Soy Sauce', amount: 2, unit: 'tbsp', aisle: 'Pantry', image: '' },
      { name: 'Fresh Ginger', amount: 1, unit: 'tsp', aisle: 'Produce', image: '' },
      { name: 'Garlic', amount: 2, unit: 'pc', aisle: 'Produce', image: '' },
      { name: 'Sesame Oil', amount: 1, unit: 'tsp', aisle: 'Pantry', image: '' }
    ],
    instructions: [
      'Cook the noodles in boiling water as directed (usually 4-6 minutes). Rinse under cold water to stop the cooking and prevent sticking, then toss with the sesame oil.',
      'Mix the soy sauce, ginger, garlic and 2 tbsp water in a small bowl.',
      'Heat a wok or large pan until very hot. Add a little oil and cook the beef in two batches, 1-2 minutes each, until browned. Set aside on a plate. Crowding the pan makes the beef stew instead of sear.',
      'In the same pan, stir-fry the sliced carrot for 2 minutes, then add the green beans and zucchini for 3 minutes more, until tender but still crisp.',
      'Return the beef, pour in the sauce, and toss for 1 minute.',
      'Cool, then pack the stir-fry and noodles in separate containers. Keeps 2-3 days.'
    ]
  },
  {
    id: 'mp6',
    title: 'Grilled Chicken & Cauliflower Rice Bowls',
    category: 'Lunch/Dinner',
    prepTime: 35,
    servings: 3,
    calories: 745,
    protein: 90,
    carbs: 81,
    fat: 10,
    tags: ['Lunch/Dinner', 'High Protein', 'Meal Prep'],
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600&auto=format&fit=crop&q=80',
    ingredients: [
      { name: 'Chicken Breast', amount: 300, unit: 'g', aisle: 'Meat & Seafood', image: '' },
      { name: 'Cauliflower', amount: 600, unit: 'g', aisle: 'Produce', image: '' },
      { name: 'Sweet Potato', amount: 200, unit: 'g', aisle: 'Produce', image: '' },
      { name: 'Green Beans', amount: 150, unit: 'g', aisle: 'Produce', image: '' },
      { name: 'Lemon', amount: 1, unit: 'pc', aisle: 'Produce', image: '' },
      { name: 'Garlic', amount: 3, unit: 'pc', aisle: 'Produce', image: '' },
      { name: 'Paprika', amount: 1, unit: 'tsp', aisle: 'Pantry', image: '' },
      { name: 'Dried Oregano', amount: 1, unit: 'tsp', aisle: 'Pantry', image: '' },
      { name: 'Light Greek Yoghurt', amount: 0.25, unit: 'cup', aisle: 'Dairy & Eggs', image: '' },
      { name: 'Fresh Parsley', amount: 1, unit: 'tbsp', aisle: 'Produce', image: '' }
    ],
    instructions: [
      'Heat the oven to 200°C (180°C fan) and line a tray with baking paper. Spread the cubed sweet potato on the tray, spray with oil, add a pinch of salt, and roast for 10 minutes.',
      'Slice the chicken in half horizontally so it is evenly thin. Rub with 1 tbsp lemon juice, paprika, oregano, 2 crushed garlic cloves, salt, pepper and a little oil spray.',
      'Add the green beans to the tray with the sweet potato and roast for another 15 minutes, until golden.',
      'Cook the chicken in a hot pan or grill pan for 5-6 minutes per side, until the centre reaches 75°C or the juices run clear. Rest 5 minutes, then slice.',
      'To make the cauliflower rice, cut the cauliflower into florets and pulse in a food processor until it looks like rice grains, or grate it on a box grater.',
      'Cook the cauliflower rice in a large pan over medium-high heat with a little oil spray for 4-5 minutes, stirring often, until just tender. Do not overcook or it turns watery. Season with salt, pepper, a squeeze of lemon and the parsley.',
      'Mix the yoghurt, 1 tbsp lemon juice, 1 small crushed garlic clove and a pinch of salt for the sauce.',
      'Divide the cauliflower rice, chicken, sweet potato (about 1/3 cup per serve) and green beans into 3 containers. Keep the sauce separate.',
      'Cool before sealing and refrigerating. Drain any liquid from the cauliflower rice before reheating until steaming hot, then drizzle with the sauce. Keeps 3 days.'
    ]
  }

];

const INITIAL_PLAN = {
  Monday: { Breakfast: [{ id: '1', portions: 1 }], Lunch: [{ id: '2', portions: 1 }], Snack: [{ id: '3', portions: 1 }], Dinner: [{ id: '2', portions: 1 }] },
  Tuesday: { Breakfast: [{ id: '1', portions: 1 }], Lunch: [{ id: '2', portions: 1 }], Snack: [{ id: '3', portions: 1 }], Dinner: [{ id: '2', portions: 1 }] },
  Wednesday: { Breakfast: [{ id: '1', portions: 1 }], Lunch: [{ id: '2', portions: 1 }], Snack: [{ id: '3', portions: 1 }], Dinner: [{ id: '2', portions: 1 }] },
  Thursday: { Breakfast: [{ id: '1', portions: 1 }], Lunch: [{ id: '2', portions: 1 }], Snack: [{ id: '3', portions: 1 }], Dinner: [{ id: '2', portions: 1 }] },
  Friday: { Breakfast: [{ id: '1', portions: 1 }], Lunch: [{ id: '2', portions: 1 }], Snack: [{ id: '3', portions: 1 }], Dinner: [{ id: '2', portions: 1 }] },
  Saturday: { Breakfast: [{ id: '1', portions: 1 }], Lunch: [{ id: '2', portions: 1 }], Snack: [{ id: '3', portions: 1 }], Dinner: [{ id: '2', portions: 1 }] },
  Sunday: { Breakfast: [{ id: '1', portions: 1 }], Lunch: [{ id: '2', portions: 1 }], Snack: [{ id: '3', portions: 1 }], Dinner: [{ id: '2', portions: 1 }] }
};

// ---------- Shared recipe sync (Netlify Function + Netlify Blobs) ----------
const API = '/.netlify/functions/recipes';

const readLS = (key, fallback) => {
  try {
    const v = localStorage.getItem(key);
    return v ? JSON.parse(v) : fallback;
  } catch {
    return fallback;
  }
};

// Each recipe you create gets a secret token stored only in this browser.
// It proves ownership, so only you can edit or delete your shared recipes.
const getTokens = () => readLS('ppp_tokens', {});
const saveToken = (id, token) =>
  localStorage.setItem('ppp_tokens', JSON.stringify({ ...getTokens(), [id]: token }));
const newToken = () =>
  (crypto.randomUUID ? crypto.randomUUID() : Date.now() + '-' + Math.random().toString(36).slice(2));

const apiFetch = async (method, body, token, query = '') => {
  const res = await fetch(API + query, {
    method,
    headers: { 'Content-Type': 'application/json', ...(token ? { 'x-owner-token': token } : {}) },
    body: body ? JSON.stringify(body) : undefined
  });
  if (!res.ok) throw new Error((await res.json().catch(() => ({}))).error || 'Request failed');
  return res.json();
};

// Shrink uploaded photos so shared recipes stay small and fast to load.
const resizeImage = (file, maxSize, quality = 0.8) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      const image = new Image();
      image.onerror = reject;
      image.onload = () => {
        const scale = Math.min(1, maxSize / Math.max(image.width, image.height));
        const canvas = document.createElement('canvas');
        canvas.width = Math.round(image.width * scale);
        canvas.height = Math.round(image.height * scale);
        canvas.getContext('2d').drawImage(image, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL('image/jpeg', quality));
      };
      image.src = reader.result;
    };
    reader.readAsDataURL(file);
  });

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const mealTypes = ['Breakfast', 'Lunch', 'Snack', 'Dinner'];

export default function App() {
  const [activeTab, setActiveTab] = useState('planner');

  // Shared recipes come from the server; built-in starters stay local.
  const [sharedRecipes, setSharedRecipes] = useState(() => readLS('ppp_shared_cache', []));
  const [hiddenIds, setHiddenIds] = useState(() => readLS('ppp_hidden', []));
  // Edits to recipes that aren't saved to the shared cookbook (works with no server, e.g. in a preview)
  const [localEdits, setLocalEdits] = useState(() => readLS('ppp_local_edits', {}));
  useEffect(() => {
    try {
      localStorage.setItem('ppp_local_edits', JSON.stringify(localEdits));
    } catch {
      /* storage unavailable: edits last until the page is closed */
    }
  }, [localEdits]);

  const recipes = useMemo(() => {
    const sharedIds = new Set(sharedRecipes.map((r) => r.id));
    const starters = INITIAL_RECIPES.filter((r) => !sharedIds.has(r.id));
    return [...sharedRecipes, ...starters]
      .map((r) => localEdits[r.id] || r)
      .filter((r) => !hiddenIds.includes(r.id));
  }, [sharedRecipes, hiddenIds, localEdits]);

  const isOwner = (id) => Boolean(getTokens()[id]);

  const refreshShared = useCallback(async () => {
    try {
      const { recipes: list } = await apiFetch('GET');
      setSharedRecipes(list);
    } catch (err) {
      console.warn('Could not load shared recipes:', err.message);
    }
  }, []);

  const [weeklyPlan, setWeeklyPlan] = useState(() => {
    const saved = localStorage.getItem('ppp_plan');
    return saved ? JSON.parse(saved) : INITIAL_PLAN;
  });

  const [shoppingList, setShoppingList] = useState(() => {
    const saved = localStorage.getItem('ppp_shopping');
    return saved ? JSON.parse(saved) : [];
  });

  // UI state
  const [selectedRecipeDetail, setSelectedRecipeDetail] = useState(null);
  const [lightboxImage, setLightboxImage] = useState(null);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [notification, setNotification] = useState(null);

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  // Custom Recipe Modal State
  const [isRecipeModalOpen, setIsRecipeModalOpen] = useState(false);
  const [editingRecipeId, setEditingRecipeId] = useState(null);
  const [newRecipe, setNewRecipe] = useState({
    title: '',
    category: 'Lunch/Dinner',
    prepTime: 15,
    servings: 2,
    image: '',
    ingredients: [{ name: '', amount: 1, unit: 'cup', aisle: 'Produce', image: '' }],
    instructions: ['']
  });

  // Sync state changes to local storage
  useEffect(() => {
    try {
      localStorage.setItem('ppp_shared_cache', JSON.stringify(sharedRecipes));
    } catch {
      /* cache is optional (e.g. storage full) */
    }
  }, [sharedRecipes]);

  useEffect(() => {
    localStorage.setItem('ppp_hidden', JSON.stringify(hiddenIds));
  }, [hiddenIds]);

  // Load on start, and again whenever the tab regains focus
  useEffect(() => {
    (async () => {
      // One-time migration: publish custom recipes this browser saved before sharing existed
      if (!localStorage.getItem('ppp_migrated')) {
        const legacy = readLS('ppp_recipes', []).filter(
          (r) => !INITIAL_RECIPES.some((s) => s.id === r.id)
        );
        try {
          for (const r of legacy) {
            const token = newToken();
            try {
              await apiFetch('POST', r, token);
              saveToken(r.id, token);
            } catch {
              /* skip duplicates or invalid recipes */
            }
          }
          localStorage.setItem('ppp_migrated', '1');
        } catch {
          /* try again next visit */
        }
      }
      // One-time: save every built-in recipe as your own shared recipe, so all of them can be
      // edited (including their photos). Until this succeeds, the built-in copies are shown
      // as a fallback.
      if (!localStorage.getItem('ppp_seeded_all')) {
        let failed = false;
        for (const r of INITIAL_RECIPES) {
          const token = newToken();
          try {
            await apiFetch('POST', r, token);
            saveToken(r.id, token);
          } catch (err) {
            if (!/already exists/i.test(err.message)) failed = true;
          }
        }
        if (!failed) localStorage.setItem('ppp_seeded_all', '1');
      }
      refreshShared();
    })();
    const onFocus = () => document.visibilityState === 'visible' && refreshShared();
    document.addEventListener('visibilitychange', onFocus);
    return () => document.removeEventListener('visibilitychange', onFocus);
  }, [refreshShared]);

  useEffect(() => {
    localStorage.setItem('ppp_plan', JSON.stringify(weeklyPlan));
  }, [weeklyPlan]);

  useEffect(() => {
    localStorage.setItem('ppp_shopping', JSON.stringify(shoppingList));
  }, [shoppingList]);

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const estimateNutritionFromIngredients = (ingredients) => {
    let totalCals = 0;
    let totalProt = 0;
    let totalCarbs = 0;
    let totalFat = 0;

    ingredients.forEach(ing => {
      const name = ing.name.toLowerCase();
      const amt = parseFloat(ing.amount) || 0;
      let factor = amt;

      if (ing.unit === 'mg') factor = amt / 100000;
      if (ing.unit === 'g') factor = amt / 100;
      if (ing.unit === 'kg') factor = amt * 10;
      if (ing.unit === 'ml') factor = amt / 100;
      if (ing.unit === 'l') factor = amt * 10;
      if (ing.unit === 'cup') factor = amt * 1.5;
      if (ing.unit === 'pc' || ing.unit === 'slice') factor = amt * 0.7;
      if (ing.unit === 'tbsp') factor = amt * 0.15;
      if (ing.unit === 'tsp') factor = amt * 0.05;
      if (ing.unit === 'pinch') factor = amt * 0.01;
      if (ing.unit === 'oz') factor = amt * 0.3;

      if (name.includes('chicken') || name.includes('turkey') || name.includes('salmon') || name.includes('beef')) {
        totalCals += factor * 200;
        totalProt += factor * 25;
        totalFat += factor * 8;
      } else if (name.includes('egg')) {
        totalCals += factor * 140;
        totalProt += factor * 12;
        totalFat += factor * 10;
      } else if (name.includes('cheese') || name.includes('yogurt') || name.includes('milk')) {
        totalCals += factor * 150;
        totalProt += factor * 10;
        totalCarbs += factor * 5;
        totalFat += factor * 8;
      } else if (name.includes('bread') || name.includes('rice') || name.includes('quinoa') || name.includes('pasta') || name.includes('granola')) {
        totalCals += factor * 220;
        totalProt += factor * 6;
        totalCarbs += factor * 45;
        totalFat += factor * 2;
      } else if (name.includes('avocado') || name.includes('oil') || name.includes('nut') || name.includes('butter')) {
        totalCals += factor * 400;
        totalFat += factor * 40;
      } else {
        totalCals += factor * 50;
        totalProt += factor * 2;
        totalCarbs += factor * 10;
      }
    });

    return {
      calories: Math.round(totalCals) || 250,
      protein: Math.round(totalProt) || 15,
      carbs: Math.round(totalCarbs) || 20,
      fat: Math.round(totalFat) || 8
    };
  };

  const estimateTagsFromRecipe = (recipe) => {
    const tags = [recipe.category];
    const macros = estimateNutritionFromIngredients(recipe.ingredients);

    if (macros.protein >= 25) tags.push('High Protein');
    if (macros.carbs <= 15) tags.push('Low Carb');
    if (recipe.prepTime <= 20) tags.push('Quick & Easy');

    const allIngNames = recipe.ingredients.map(i => i.name.toLowerCase()).join(' ');
    if (!allIngNames.match(/(chicken|beef|pork|salmon|tuna|turkey|bacon|fish|meat)/)) {
      tags.push('Vegetarian');
    }

    return Array.from(new Set(tags));
  };

  const handleOpenAddRecipe = () => {
    setEditingRecipeId(null);
    setNewRecipe({
      title: '',
      category: 'Lunch/Dinner',
      prepTime: 15,
      servings: 2,
      image: '',
      ingredients: [{ name: '', amount: 1, unit: 'cup', aisle: 'Produce', image: '' }],
      instructions: ['']
    });
    setIsRecipeModalOpen(true);
  };

  const handleOpenEditRecipe = (recipe) => {
    setEditingRecipeId(recipe.id);
    setNewRecipe({
      title: recipe.title || '',
      category: recipe.category || 'Lunch/Dinner',
      prepTime: recipe.prepTime || 15,
      servings: recipe.servings || 2,
      image: recipe.image || '',
      ingredients: recipe.ingredients && recipe.ingredients.length > 0
        ? recipe.ingredients.map(ing => ({ ...ing, image: ing.image || '' }))
        : [{ name: '', amount: 1, unit: 'cup', aisle: 'Produce', image: '' }],
      instructions: recipe.instructions && recipe.instructions.length > 0
        ? recipe.instructions
        : ['']
    });
    setIsRecipeModalOpen(true);
  };

  // Bring back recipes that were hidden or deleted. Built-in recipes are saved to the shared cookbook again.
  const handleRestoreRecipes = async () => {
    const toRestore = INITIAL_RECIPES.filter(
      (r) => hiddenIds.includes(r.id) && !sharedRecipes.some((s) => s.id === r.id)
    );
    setHiddenIds([]);
    for (const r of toRestore) {
      const token = newToken();
      try {
        await apiFetch('POST', r, token);
        saveToken(r.id, token);
      } catch {
        /* the built-in copy still shows even if saving fails */
      }
    }
    await refreshShared();
    showNotification('Deleted recipes restored');
  };

  const handleDeleteRecipe = async (id) => {
    const token = getTokens()[id];
    if (!token) {
      // Not yours (or a starter recipe): hide it on this device only
      setHiddenIds((prev) => [...prev, id]);
      showNotification('Recipe hidden on this device');
      return;
    }
    if (!window.confirm('Delete this recipe for everyone?')) return;
    try {
      await apiFetch('DELETE', null, token, `?id=${encodeURIComponent(id)}`);
      setSharedRecipes((prev) => prev.filter((r) => r.id !== id));
      if (INITIAL_RECIPES.some((r) => r.id === id)) setHiddenIds((prev) => [...prev, id]);
      showNotification('Recipe deleted from shared cookbook');
    } catch (err) {
      showNotification(`Could not delete: ${err.message}`);
    }
  };

  const handleImageFileUpload = async (e, targetField, index = null) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const dataUrl = await resizeImage(file, targetField === 'cover' ? 800 : 300);
      if (targetField === 'cover') {
        setNewRecipe((prev) => ({ ...prev, image: dataUrl }));
      } else if (targetField === 'ingredient' && index !== null) {
        setNewRecipe((prev) => {
          const updatedIngs = [...prev.ingredients];
          updatedIngs[index] = { ...updatedIngs[index], image: dataUrl };
          return { ...prev, ingredients: updatedIngs };
        });
      }
    } catch {
      showNotification('Could not read that image');
    }
  };

  const handleAddIngredientRow = () => {
    setNewRecipe(prev => ({
      ...prev,
      ingredients: [...prev.ingredients, { name: '', amount: 1, unit: 'cup', aisle: 'Produce', image: '' }]
    }));
  };

  const handleRemoveIngredientRow = (index) => {
    setNewRecipe(prev => ({
      ...prev,
      ingredients: prev.ingredients.filter((_, i) => i !== index)
    }));
  };

  const handleIngredientChange = (index, field, value) => {
    setNewRecipe(prev => {
      const updatedIngs = [...prev.ingredients];
      updatedIngs[index] = { ...updatedIngs[index], [field]: value };
      return { ...prev, ingredients: updatedIngs };
    });
  };

  const handleAddInstructionRow = () => {
    setNewRecipe(prev => ({ ...prev, instructions: [...prev.instructions, ''] }));
  };

  const handleInstructionChange = (index, value) => {
    setNewRecipe(prev => {
      const updated = [...prev.instructions];
      updated[index] = value;
      return { ...prev, instructions: updated };
    });
  };

  const handleRemoveInstructionRow = (index) => {
    setNewRecipe(prev => ({
      ...prev,
      instructions: prev.instructions.filter((_, i) => i !== index)
    }));
  };

  const handleSaveCustomRecipe = async (e) => {
    e.preventDefault();
    if (!newRecipe.title.trim()) return;

    const sig = (list) =>
      JSON.stringify((list || []).map((i) => [i.name, String(i.amount), i.unit]));
    const existing = editingRecipeId ? recipes.find((r) => r.id === editingRecipeId) : null;
    const macros =
      existing && existing.calories && sig(existing.ingredients) === sig(newRecipe.ingredients)
        ? { calories: existing.calories, protein: existing.protein, carbs: existing.carbs, fat: existing.fat }
        : estimateNutritionFromIngredients(newRecipe.ingredients);
    const tags = estimateTagsFromRecipe(newRecipe);

    const recipeId = editingRecipeId || `r${Date.now()}${Math.random().toString(36).slice(2, 6)}`;
    const recipeData = {
      id: recipeId,
      ...newRecipe,
      calories: macros.calories,
      protein: macros.protein,
      carbs: macros.carbs,
      fat: macros.fat,
      tags,
      image:
        newRecipe.image.trim() ||
        'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=600&auto=format&fit=crop&q=80'
    };

    const closeModal = () => {
      setIsRecipeModalOpen(false);
      setEditingRecipeId(null);
    };

    if (editingRecipeId && !getTokens()[editingRecipeId]) {
      // Not saved to the shared cookbook (no server, or someone else's recipe): keep the edit on this device
      setLocalEdits((prev) => ({ ...prev, [editingRecipeId]: recipeData }));
      closeModal();
      showNotification(`Saved \"${recipeData.title}\" on this device`);
    } else if (editingRecipeId) {
      const token = getTokens()[editingRecipeId];
      const previous = sharedRecipes;
      setSharedRecipes((prev) => prev.map((r) => (r.id === editingRecipeId ? recipeData : r)));
      closeModal();
      try {
        await apiFetch('PUT', recipeData, token);
        showNotification(`Updated "${recipeData.title}"!`);
      } catch (err) {
        setSharedRecipes(previous);
        showNotification(`Could not update: ${err.message}`);
      }
    } else {
      const token = newToken();
      setSharedRecipes((prev) => [recipeData, ...prev]);
      closeModal();
      try {
        await apiFetch('POST', recipeData, token);
        saveToken(recipeData.id, token);
        showNotification(`Shared "${recipeData.title}" with everyone!`);
      } catch (err) {
        setSharedRecipes((prev) => prev.filter((r) => r.id !== recipeData.id));
        showNotification(`Could not save: ${err.message}`);
      }
    }
  };

  const handleMealSlotChange = (day, meal, index, field, value) => {
    setWeeklyPlan((prev) => {
      const dayPlan = { ...prev[day] };
      const currentArr = [...(dayPlan[meal] || [{ id: '', portions: 1 }])];
      if (field === 'id') {
        currentArr[index] = { ...currentArr[index], id: value };
      } else if (field === 'portions') {
        currentArr[index] = { ...currentArr[index], portions: parseInt(value) || 1 };
      }
      dayPlan[meal] = currentArr;
      return { ...prev, [day]: dayPlan };
    });
  };

  const handleAddDishToSlot = (day, meal) => {
    setWeeklyPlan((prev) => {
      const dayPlan = { ...prev[day] };
      const currentArr = [...(dayPlan[meal] || [{ id: '', portions: 1 }])];
      currentArr.push({ id: '', portions: 1 });
      dayPlan[meal] = currentArr;
      return { ...prev, [day]: dayPlan };
    });
  };

  const handleRemoveDishFromSlot = (day, meal, index) => {
    setWeeklyPlan((prev) => {
      const dayPlan = { ...prev[day] };
      let currentArr = [...(dayPlan[meal] || [{ id: '', portions: 1 }])];
      currentArr.splice(index, 1);
      if (currentArr.length === 0) currentArr = [{ id: '', portions: 1 }];
      dayPlan[meal] = currentArr;
      return { ...prev, [day]: dayPlan };
    });
  };

  const getDailyTotals = (day) => {
    const dayPlan = weeklyPlan[day] || {};
    let calories = 0;
    let protein = 0;

    Object.values(dayPlan).forEach((dishes) => {
      if (Array.isArray(dishes)) {
        dishes.forEach((item) => {
          if (!item || !item.id) return;
          const r = recipes.find((rec) => rec.id === item.id);
          if (r) {
            const defaultServings = r.servings || 1;
            const portionRatio = (item.portions || 1) / defaultServings;
            calories += (r.calories || 0) * portionRatio;
            protein += (r.protein || 0) * portionRatio;
          }
        });
      }
    });

    return { calories: Math.round(calories), protein: Math.round(protein) };
  };

  const handleSyncShoppingList = () => {
    const ingredientMap = {};

    Object.values(weeklyPlan).forEach((dayPlan) => {
      Object.values(dayPlan).forEach((dishes) => {
        if (Array.isArray(dishes)) {
          dishes.forEach((item) => {
            if (!item || !item.id) return;
            const recipe = recipes.find((r) => r.id === item.id);
            const defaultServings = recipe?.servings || 1;
            const portionRatio = (item.portions || 1) / defaultServings;

            if (recipe && recipe.ingredients) {
              recipe.ingredients.forEach((ing) => {
                const key = `${ing.name.toLowerCase()}_${ing.unit}`;
                const addedAmount = (parseFloat(ing.amount) || 1) * portionRatio;
                if (ingredientMap[key]) {
                  ingredientMap[key].amount += addedAmount;
                } else {
                  ingredientMap[key] = {
                    id: Date.now().toString() + Math.random(),
                    name: ing.name,
                    amount: addedAmount,
                    unit: ing.unit,
                    aisle: ing.aisle || 'Other',
                    image: ing.image || '',
                    checked: false
                  };
                }
              });
            }
          });
        }
      });
    });

    const syncedList = Object.values(ingredientMap).map(i => ({
      ...i,
      amount: Math.round(i.amount * 100) / 100
    }));
    setShoppingList(syncedList);
    showNotification(`Synced ${syncedList.length} items to your shopping list!`);
    setActiveTab('shopping');
  };

  const handleResetMealPlan = () => {
    const emptyPlan = {
      Monday: { Breakfast: [{ id: '', portions: 1 }], Lunch: [{ id: '', portions: 1 }], Snack: [{ id: '', portions: 1 }], Dinner: [{ id: '', portions: 1 }] },
      Tuesday: { Breakfast: [{ id: '', portions: 1 }], Lunch: [{ id: '', portions: 1 }], Snack: [{ id: '', portions: 1 }], Dinner: [{ id: '', portions: 1 }] },
      Wednesday: { Breakfast: [{ id: '', portions: 1 }], Lunch: [{ id: '', portions: 1 }], Snack: [{ id: '', portions: 1 }], Dinner: [{ id: '', portions: 1 }] },
      Thursday: { Breakfast: [{ id: '', portions: 1 }], Lunch: [{ id: '', portions: 1 }], Snack: [{ id: '', portions: 1 }], Dinner: [{ id: '', portions: 1 }] },
      Friday: { Breakfast: [{ id: '', portions: 1 }], Lunch: [{ id: '', portions: 1 }], Snack: [{ id: '', portions: 1 }], Dinner: [{ id: '', portions: 1 }] },
      Saturday: { Breakfast: [{ id: '', portions: 1 }], Lunch: [{ id: '', portions: 1 }], Snack: [{ id: '', portions: 1 }], Dinner: [{ id: '', portions: 1 }] },
      Sunday: { Breakfast: [{ id: '', portions: 1 }], Lunch: [{ id: '', portions: 1 }], Snack: [{ id: '', portions: 1 }], Dinner: [{ id: '', portions: 1 }] }
    };
    setWeeklyPlan(emptyPlan);
    showNotification('Weekly meal planner has been reset');
  };

  const filteredRecipes = recipes.filter((r) => {
    const matchesSearch = r.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      categoryFilter === 'All' ||
      r.category === categoryFilter ||
      (r.tags && r.tags.includes(categoryFilter));
    return matchesSearch && matchesCategory;
  });

  const estimatedModalMacros = estimateNutritionFromIngredients(newRecipe.ingredients);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 text-sm font-semibold animate-bounce">
          <CheckCircle className="w-5 h-5 text-emerald-400" />
          {notification}
        </div>
      )}

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setLightboxImage(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh]">
            <img src={lightboxImage} alt="Full view" className="max-w-full max-h-[85vh] rounded-2xl object-contain shadow-2xl" />
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute -top-12 right-0 text-white hover:text-slate-300 p-2 text-xl font-bold"
            >
              <X className="w-8 h-8" />
            </button>
          </div>
        </div>
      )}

      {/* Help Modal */}
      {isHelpOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsHelpOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 p-1 rounded-full"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-emerald-100 text-emerald-700 rounded-2xl">
                <HelpCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-slate-900">How to use Peculiar Pantry Plan</h3>
                <p className="text-xs text-slate-500">Quick user guide & local storage</p>
              </div>
            </div>
            <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <h4 className="font-bold text-slate-800 mb-1 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-emerald-600" /> Weekly Meal Planner & Portions
                </h4>
                <p>Assign recipes and adjust portion numbers (e.g. 1, 2, 3) to instantly scale your daily calorie and protein calculations!</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-600 text-white rounded-2xl shadow-md">
              <ChefHat className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                Peculiar Pantry Plan
                <span className="text-[10px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-bold">
                  Ready
                </span>
              </h1>
              <p className="text-xs text-slate-500 font-medium">Smart Kitchen & Recipe Planner</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsHelpOpen(true)}
              className="p-2.5 text-slate-500 hover:text-emerald-600 hover:bg-slate-100 rounded-xl transition"
              title="Help & Guide"
            >
              <HelpCircle className="w-5 h-5" />
            </button>
            <button
              onClick={handleSyncShoppingList}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition flex items-center gap-2 shadow-sm"
            >
              <ShoppingBag className="w-4 h-4" /> Sync Shopping List
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="max-w-7xl mx-auto px-4 flex gap-6 border-t border-slate-100">
          <button
            onClick={() => setActiveTab('planner')}
            className={`py-3 font-extrabold text-sm border-b-2 transition flex items-center gap-2 ${
              activeTab === 'planner'
                ? 'border-emerald-600 text-emerald-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Calendar className="w-4 h-4" /> Meal Planner
          </button>
          <button
            onClick={() => setActiveTab('cookbook')}
            className={`py-3 font-extrabold text-sm border-b-2 transition flex items-center gap-2 ${
              activeTab === 'cookbook'
                ? 'border-emerald-600 text-emerald-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <BookOpen className="w-4 h-4" /> Cookbook ({recipes.length})
          </button>
          <button
            onClick={() => setActiveTab('shopping')}
            className={`py-3 font-extrabold text-sm border-b-2 transition flex items-center gap-2 ${
              activeTab === 'shopping'
                ? 'border-emerald-600 text-emerald-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <ShoppingBag className="w-4 h-4" /> Shopping List ({shoppingList.length})
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Tab 1: Meal Planner */}
        {activeTab === 'planner' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-black text-slate-900">Weekly Schedule</h2>
                <p className="text-xs text-slate-500">Plan your meals from Monday to Sunday with custom portions</p>
              </div>
              <button
                onClick={handleResetMealPlan}
                className="bg-white border border-slate-200 hover:bg-red-50 hover:border-red-200 hover:text-red-600 text-slate-600 font-bold text-xs px-4 py-2.5 rounded-xl transition flex items-center gap-2 shadow-sm"
              >
                <Trash2 className="w-4 h-4" /> Reset Meal Planner
              </button>
            </div>

            <div className="space-y-4">
              {daysOfWeek.map((day) => {
                const totals = getDailyTotals(day);
                return (
                  <div key={day} className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="bg-slate-100/70 px-6 py-3.5 border-b border-slate-200 flex items-center justify-between">
                      <span className="font-black text-slate-900 text-base">{day}</span>
                      <div className="flex items-center gap-4 text-xs font-extrabold text-slate-600">
                        <span>🔥 {totals.calories} kcal</span>
                        <span>💪 {totals.protein}g protein</span>
                      </div>
                    </div>

                    <div className="p-6 grid grid-cols-1 md:grid-cols-4 gap-6">
                      {mealTypes.map((meal) => {
                        const assignedDishes = weeklyPlan[day]?.[meal] || [{ id: '', portions: 1 }];
                        const allowMultiple = meal !== 'Snack';

                        return (
                          <div key={meal} className="space-y-3 bg-slate-50/60 p-4 rounded-2xl border border-slate-100">
                            <span className="text-xs font-black uppercase tracking-wider text-slate-400">{meal}</span>

                            {assignedDishes.map((dishItem, idx) => {
                              const recipeMatch = recipes.find((r) => r.id === dishItem.id);
                              const portions = dishItem.portions || 1;
                              const defaultServings = recipeMatch?.servings || 1;
                              const ratio = portions / defaultServings;

                              return (
                                <div key={idx} className="space-y-2 relative group">
                                  <div className="flex items-center gap-1.5">
                                    <select
                                      value={dishItem.id}
                                      onChange={(e) => handleMealSlotChange(day, meal, idx, 'id', e.target.value)}
                                      className="flex-1 bg-white border border-slate-200 text-slate-800 text-xs font-semibold rounded-xl p-2.5 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 text-wrap break-words min-w-0"
                                    >
                                      <option value="">Select a dish...</option>
                                      {recipes.map((r) => (
                                        <option key={r.id} value={r.id}>
                                          {r.title}
                                        </option>
                                      ))}
                                    </select>

                                    {assignedDishes.length > 1 && (
                                      <button
                                        onClick={() => handleRemoveDishFromSlot(day, meal, idx)}
                                        className="text-slate-400 hover:text-red-500 p-1"
                                      >
                                        <X className="w-4 h-4" />
                                      </button>
                                    )}
                                  </div>

                                  {recipeMatch && (
                                    <div className="bg-white p-2.5 rounded-xl border border-slate-200 flex items-center gap-3 shadow-sm">
                                      <img
                                        src={recipeMatch.image}
                                        alt=""
                                        onClick={() => setLightboxImage(recipeMatch.image)}
                                        className="w-10 h-10 rounded-lg object-cover cursor-pointer hover:opacity-80 transition"
                                      />
                                      <div className="flex-1 min-w-0 space-y-1">
                                        <div className="flex flex-wrap items-center gap-x-2 text-[11px] font-bold text-slate-500">
                                          <span>🔥 {Math.round((recipeMatch.calories || 0) * ratio)} kcal</span>
                                          <span>💪 {Math.round((recipeMatch.protein || 0) * ratio)}g</span>
                                        </div>
                                        <div className="inline-flex items-center gap-1 bg-slate-50 border border-slate-200 px-1.5 py-0.5 rounded-lg">
                                          <span className="text-[10px] font-bold text-slate-400">Portions:</span>
                                          <input
                                            type="number"
                                            min="1"
                                            max="10"
                                            value={portions}
                                            onChange={(e) => handleMealSlotChange(day, meal, idx, 'portions', e.target.value)}
                                            className="w-9 text-xs font-bold text-slate-800 focus:outline-none text-center bg-white rounded-md"
                                          />
                                        </div>
                                      </div>
                                      <button
                                        onClick={() => setSelectedRecipeDetail({
                                          ...recipeMatch,
                                          ingredients: recipeMatch.ingredients.map(ing => ({
                                            ...ing,
                                            amount: Math.round(((parseFloat(ing.amount) || 0) * ratio) * 100) / 100
                                          }))
                                        })}
                                        className="text-[10px] font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-2 py-1 rounded-lg"
                                      >
                                        Details
                                      </button>
                                    </div>
                                  )}
                                </div>
                              );
                            })}

                            {allowMultiple && (
                              <button
                                onClick={() => handleAddDishToSlot(day, meal)}
                                className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-xs rounded-xl border border-slate-200 transition flex items-center justify-center gap-1.5"
                              >
                                <Plus className="w-3.5 h-3.5" /> Add Another Dish
                              </button>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 2: Cookbook */}
        {activeTab === 'cookbook' && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-black text-slate-900">Cookbook</h2>
                <p className="text-xs text-slate-500">Recipes shared by everyone</p>
              </div>

              <div className="flex items-center gap-3 w-full md:w-auto">
                <input
                  type="text"
                  placeholder="Search recipes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-white border border-slate-200 text-xs px-3.5 py-2.5 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 w-full md:w-48"
                />
                {hiddenIds.length > 0 && (
                  <button
                    onClick={handleRestoreRecipes}
                    className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-bold text-xs px-4 py-2.5 rounded-xl shadow-sm transition shrink-0"
                  >
                    Restore deleted ({hiddenIds.length})
                  </button>
                )}
                <button
                  onClick={handleOpenAddRecipe}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-md transition flex items-center gap-2 shrink-0"
                >
                  <Plus className="w-4 h-4" /> Add Custom Recipe
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredRecipes.map((recipe) => (
                <div key={recipe.id} className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                  <div className="relative h-48 bg-slate-100 cursor-pointer" onClick={() => setLightboxImage(recipe.image)}>
                    <img src={recipe.image} alt={recipe.title} className="w-full h-full object-cover" />
                    <div className="absolute top-3 right-3 flex items-center gap-1.5">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenEditRecipe(recipe);
                        }}
                        className="p-2 bg-white/90 hover:bg-emerald-600 hover:text-white text-slate-700 rounded-full transition shadow-md"
                        title="Edit Recipe"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteRecipe(recipe.id);
                        }}
                        className="p-2 bg-white/90 hover:bg-red-500 hover:text-white text-slate-700 rounded-full transition shadow-md"
                        title="Delete Recipe"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex flex-wrap gap-1.5 mb-2">
                        {recipe.tags?.map((t) => (
                          <span key={t} className="text-[10px] font-extrabold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">
                            {t}
                          </span>
                        ))}
                      </div>
                      <h3 className="font-extrabold text-slate-900 text-base">{recipe.title}</h3>
                    </div>

                    <div className="grid grid-cols-4 gap-2 text-center py-2 bg-slate-50 rounded-2xl border border-slate-100 text-xs font-bold text-slate-700">
                      <div>
                        <span className="block text-[9px] text-slate-400 uppercase">Cals</span>
                        {recipe.calories}
                      </div>
                      <div>
                        <span className="block text-[9px] text-slate-400 uppercase">Prot</span>
                        {recipe.protein}g
                      </div>
                      <div>
                        <span className="block text-[9px] text-slate-400 uppercase">Carb</span>
                        {recipe.carbs}g
                      </div>
                      <div>
                        <span className="block text-[9px] text-slate-400 uppercase">Fat</span>
                        {recipe.fat}g
                      </div>
                    </div>

                    <button
                      onClick={() => setSelectedRecipeDetail(recipe)}
                      className="w-full py-2.5 bg-slate-900 text-white font-bold text-xs rounded-xl hover:bg-slate-800 transition"
                    >
                      View Recipe Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Shopping List */}
        {activeTab === 'shopping' && (
          <div className="space-y-6 max-w-3xl mx-auto">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-black text-slate-900">Shopping List</h2>
                <p className="text-xs text-slate-500">Grocery list compiled from your weekly plan and portions</p>
              </div>
              <button
                onClick={() => setShoppingList([])}
                className="text-xs font-bold text-red-600 hover:underline"
              >
                Clear All
              </button>
            </div>

            {shoppingList.length === 0 ? (
              <div className="bg-white p-12 text-center rounded-3xl border border-slate-200 space-y-3">
                <ShoppingBag className="w-12 h-12 text-slate-300 mx-auto" />
                <h3 className="font-bold text-slate-700">Your shopping list is empty</h3>
                <p className="text-xs text-slate-400">Click "Sync Shopping List" above to import your weekly meal plan ingredients.</p>
              </div>
            ) : (
              <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-3 shadow-sm">
                {shoppingList.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      setShoppingList(prev => prev.map(i => i.id === item.id ? { ...i, checked: !i.checked } : i));
                    }}
                    className={`flex items-center justify-between p-3.5 rounded-2xl border transition cursor-pointer ${
                      item.checked ? 'bg-slate-50 border-slate-100 text-slate-400 line-through' : 'bg-white border-slate-200 text-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {item.checked ? <CheckCircle className="w-5 h-5 text-emerald-500" /> : <Circle className="w-5 h-5 text-slate-300" />}
                      <span className="font-bold text-sm">{item.name}</span>
                    </div>
                    <span className="text-xs font-bold px-2.5 py-1 bg-slate-100 rounded-lg text-slate-600">
                      {item.amount} {item.unit}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Recipe Detail Modal */}
      {selectedRecipeDetail && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto space-y-6">
            <button
              onClick={() => setSelectedRecipeDetail(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 p-1 rounded-full"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="flex gap-4 items-center">
              <img
                src={selectedRecipeDetail.image}
                alt=""
                onClick={() => setLightboxImage(selectedRecipeDetail.image)}
                className="w-24 h-24 rounded-2xl object-cover cursor-pointer hover:opacity-90 transition"
              />
              <div>
                <h3 className="text-xl font-black text-slate-900">{selectedRecipeDetail.title}</h3>
                <p className="text-xs text-slate-500 font-bold mt-1">
                  ⏱️ {selectedRecipeDetail.prepTime} mins | 👥 Serves {selectedRecipeDetail.servings}
                </p>
              </div>
            </div>

            <div>
              <h4 className="font-extrabold text-sm text-slate-800 mb-3">Ingredients</h4>
              <div className="grid grid-cols-2 gap-2">
                {selectedRecipeDetail.ingredients?.map((ing, idx) => (
                  <div key={idx} className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 text-xs font-semibold flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      {ing.image && (
                        <img
                          src={ing.image}
                          alt=""
                          onClick={() => setLightboxImage(ing.image)}
                          className="w-6 h-6 rounded-md object-cover cursor-pointer hover:opacity-80 transition"
                        />
                      )}
                      <span>{ing.name}</span>
                    </div>
                    <span className="text-slate-400">{ing.amount} {ing.unit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-extrabold text-sm text-slate-800 mb-3">Instructions</h4>
              <ol className="space-y-2 text-xs text-slate-600 font-medium">
                {selectedRecipeDetail.instructions?.map((step, idx) => (
                  <li key={idx} className="flex gap-2">
                    <span className="font-bold text-emerald-600">{idx + 1}.</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Custom Recipe Modal */}
      {isRecipeModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto space-y-6">
            <button
              onClick={() => setIsRecipeModalOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 p-1 rounded-full"
            >
              <X className="w-6 h-6" />
            </button>

            <h2 className="text-lg font-extrabold text-slate-900">
              {editingRecipeId ? 'Edit Custom Recipe' : 'Add New Recipe'}
            </h2>

            <form onSubmit={handleSaveCustomRecipe} className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Recipe Title</label>
                <input
                  type="text"
                  required
                  value={newRecipe.title}
                  onChange={(e) => setNewRecipe({ ...newRecipe, title: e.target.value })}
                  placeholder="e.g. Garlic Butter Shrimp Bowl"
                  className="w-full bg-slate-50 border border-slate-200 text-xs p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
                  <select
                    value={newRecipe.category}
                    onChange={(e) => setNewRecipe({ ...newRecipe, category: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 text-xs p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="Breakfast">Breakfast</option>
                    <option value="Lunch/Dinner">Lunch/Dinner</option>
                    <option value="Snack">Snack</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Prep Time (mins)</label>
                  <input
                    type="number"
                    value={newRecipe.prepTime}
                    onChange={(e) => setNewRecipe({ ...newRecipe, prepTime: parseInt(e.target.value) || 10 })}
                    className="w-full bg-slate-50 border border-slate-200 text-xs p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Servings</label>
                  <input
                    type="number"
                    value={newRecipe.servings}
                    onChange={(e) => setNewRecipe({ ...newRecipe, servings: parseInt(e.target.value) || 1 })}
                    className="w-full bg-slate-50 border border-slate-200 text-xs p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Recipe Cover Image</label>
                <div className="flex gap-2 items-center">
                  <input
                    type="text"
                    placeholder="Paste Image URL or upload below..."
                    value={newRecipe.image}
                    onChange={(e) => setNewRecipe({ ...newRecipe, image: e.target.value })}
                    className="flex-1 bg-slate-50 border border-slate-200 text-xs p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  <label className="cursor-pointer bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs px-4 py-3 rounded-xl transition border border-slate-200 flex items-center gap-1.5 shrink-0">
                    📷 Upload
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageFileUpload(e, 'cover')}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* Ingredients List */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-slate-700">Ingredients</label>
                  <button
                    type="button"
                    onClick={handleAddIngredientRow}
                    className="text-xs font-bold text-emerald-600 hover:underline flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Ingredient
                  </button>
                </div>

                {newRecipe.ingredients.map((ing, index) => (
                  <div key={index} className="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="Ingredient name..."
                        value={ing.name}
                        onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
                        className="flex-1 bg-white border border-slate-200 text-xs p-2 rounded-xl"
                      />
                      <input
                        type="number"
                        step="0.1"
                        placeholder="Amt"
                        value={ing.amount}
                        onChange={(e) => handleIngredientChange(index, 'amount', e.target.value)}
                        className="w-16 bg-white border border-slate-200 text-xs p-2 rounded-xl"
                      />
                      <select
                        value={ing.unit}
                        onChange={(e) => handleIngredientChange(index, 'unit', e.target.value)}
                        className="bg-white border border-slate-200 text-xs p-2 rounded-xl"
                      >
                        <option value="mg">mg</option>
                        <option value="g">g</option>
                        <option value="kg">kg</option>
                        <option value="cup">cup</option>
                        <option value="tbsp">tbsp</option>
                        <option value="tsp">tsp</option>
                        <option value="ml">ml</option>
                        <option value="l">l</option>
                        <option value="pc">pc</option>
                        <option value="slice">slice</option>
                        <option value="pinch">pinch</option>
                        <option value="oz">oz</option>
                      </select>
                      {newRecipe.ingredients.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveIngredientRow(index)}
                          className="text-slate-400 hover:text-red-500 p-1"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                    <div className="flex gap-2 items-center">
                      <input
                        type="text"
                        placeholder="Ingredient picture URL..."
                        value={ing.image || ''}
                        onChange={(e) => handleIngredientChange(index, 'image', e.target.value)}
                        className="flex-1 bg-white border border-slate-200 text-xs p-2 rounded-xl"
                      />
                      <label className="cursor-pointer bg-white hover:bg-slate-100 text-slate-700 font-bold text-[10px] px-3 py-2 rounded-xl transition border border-slate-200 shrink-0">
                        📷 Photo
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageFileUpload(e, 'ingredient', index)}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>
                ))}
              </div>

              {/* Instructions List */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-slate-700">Instructions / Preparation Steps</label>
                  <button
                    type="button"
                    onClick={handleAddInstructionRow}
                    className="text-xs font-bold text-emerald-600 hover:underline flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Step
                  </button>
                </div>

                {newRecipe.instructions.map((step, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-400 w-5">{index + 1}.</span>
                    <input
                      type="text"
                      placeholder={`Step ${index + 1} instructions...`}
                      value={step}
                      onChange={(e) => handleInstructionChange(index, e.target.value)}
                      className="flex-1 bg-slate-50 border border-slate-200 text-xs p-2.5 rounded-xl"
                    />
                    {newRecipe.instructions.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveInstructionRow(index)}
                        className="text-slate-400 hover:text-red-500 p-1"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {/* Auto Estimated Macro Preview */}
              <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-100 space-y-2">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-800">Auto-estimated Macros</span>
                <div className="grid grid-cols-4 gap-2 text-center text-xs font-bold text-emerald-900">
                  <div>🔥 {estimatedModalMacros.calories} kcal</div>
                  <div>💪 {estimatedModalMacros.protein}g protein</div>
                  <div>🌾 {estimatedModalMacros.carbs}g carbs</div>
                  <div>🥑 {estimatedModalMacros.fat}g fat</div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-emerald-600 text-white font-extrabold rounded-xl hover:bg-emerald-700 shadow-md transition"
              >
                {editingRecipeId ? 'Update Recipe' : 'Save Recipe to Cookbook'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
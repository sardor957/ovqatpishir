const RECIPES_KEY = "ovqatpishir_community_recipes_v1";
const REVIEWS_KEY = "ovqatpishir_recipe_reviews_v1";

function read(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

export function getCommunityRecipes() {
  return read(RECIPES_KEY, []);
}

export function addCommunityRecipe(recipe) {
  const recipes = getCommunityRecipes();
  const next = [recipe, ...recipes];
  localStorage.setItem(RECIPES_KEY, JSON.stringify(next));
  return next;
}

export function getRecipeReviews(recipeId) {
  return read(REVIEWS_KEY, []).filter((review) => String(review.recipeId) === String(recipeId));
}

export function addRecipeReview(review) {
  const reviews = read(REVIEWS_KEY, []);
  const next = [review, ...reviews];
  localStorage.setItem(REVIEWS_KEY, JSON.stringify(next));
  return next.filter((item) => String(item.recipeId) === String(review.recipeId));
}

import { API_URL, RESULT_PER_PAGE } from './config';
import { getJSON } from './helper';
// state variable (//imports will have live connection)
export const state = {
  recipe: {},
  search: {
    query: '',
    page: 1,
    resultPerPage: RESULT_PER_PAGE,
    results: [],
  },
};

export const loadRecipe = async id => {
  try {
    const data = await getJSON(`${API_URL}/${id}`);
    const recipeData = data.data.recipe;

    state.recipe = {
      cookingTime: recipeData.cooking_time,
      id: recipeData.id,
      imageUrl: recipeData.image_url,
      ingredients: recipeData.ingredients,
      publisher: recipeData.publisher,
      servings: recipeData.servings,
      title: recipeData.title,
      sourceUrl: recipeData.source_url,
    };
  } catch (err) {
    throw err;
  }
};

export const searchRecipes = async query => {
  try {
    state.search.query = query;
    const data = await getJSON(`${API_URL}?search=${query}`);
    const searchResults = data.data.recipes.map(rec => ({
      id: rec.id,
      imageUrl: rec.image_url,
      publisher: rec.publisher,
      title: rec.title,
    }));
    state.search.results = searchResults;
  } catch (err) {
    throw err;
  }
};

export const getResultPerPage = (page = state.search.page) => {
  state.search.page = page;
  const pageLimit = state.search.resultPerPage;
  const start = (page - 1) * pageLimit;
  const end = page * pageLimit;
  return state.search.results.slice(start, end);
};

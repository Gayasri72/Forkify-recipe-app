const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// Error modal elements
const errorModal = document.querySelector('.error-modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const errorModalMessage = document.querySelector('.error-modal__message');
const errorModalBtn = document.querySelector('.error-modal__btn');

// Error modal functions
const showErrorModal = function (message) {
  errorModalMessage.textContent = message;
  errorModal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const hideErrorModal = function () {
  errorModal.classList.add('hidden');
  overlay.classList.add('hidden');
};

// Event listeners for error modal
btnCloseModal.addEventListener('click', hideErrorModal);
overlay.addEventListener('click', hideErrorModal);
errorModalBtn.addEventListener('click', hideErrorModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !errorModal.classList.contains('hidden')) {
    hideErrorModal();
  }
});

const showRecipe = async function () {
  try {
    // Temporarily using a bad URL to test the error modal
    const res = await fetch(
      'https://forkify-api.jonas.io/api/v2/recipes/5ed6604591c37cdc054bc886'
    );
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);

    let { recipe } = data.data;
    recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      image: recipe.image_url,
      sourceUrl: recipe.source_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };

    console.log(recipe);
  } catch (err) {
    console.error(err);
    showErrorModal(
      err.message ||
        'Something went wrong while loading the recipe. Please try again.'
    );
  }
};

showRecipe();

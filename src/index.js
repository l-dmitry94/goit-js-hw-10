import { fetchBreeds, fetchCatByBreed } from './cat-api';
import SlimSelect from 'slim-select';

const refs = {
  breedSelect: document.querySelector('.breed-select'),
  catInfo: document.querySelector('.cat-info'),
  loader: document.querySelector('.overlay'),
  error: document.querySelector('.error'),
};

const allBreeds = [];

fetchBreeds()
  .then(data => {
    const options = data
      .map(cat => {
        allBreeds.push(cat);
        return `<option value="${cat.id}">${cat.name}</option>`;
      })
      .join('');
    refs.breedSelect.innerHTML = options;
  })
  .catch(error => console.log(error));

refs.breedSelect.addEventListener('change', () => {
  const selectedBreed = refs.breedSelect.value;

  fetchCatByBreed(selectedBreed)
    .then(data => {
      const catImg = data[0].url;
      renderCatInfo(allBreeds, selectedBreed, catImg);
    })
    .catch(error => console.log(error));
});

function renderCatInfo(cats, breed, catImg) {
  const markup = cats
    .map(cat => {
      if (breed === cat.id) {
        return `
        <img class="cat-img" src="${catImg}" alt="${cat.name}">
        <div class="cat-info-block">
          <h2 class="cat-title">${cat.name}</h2>
          <p class="cat-descr">${cat.description}</p>
          <p class="cat-temp"><b class="cat-temp-title">Temperament: </b>${cat.temperament}</p>
        </div>
        `;
      }
    })
    .join('');

  refs.catInfo.innerHTML = markup;
}

export function hideLoader() {
  refs.loader.classList.add('hidden');
}

export function showLoader() {
  refs.loader.classList.remove('hidden');
}

export function hideError() {
  refs.error.classList.add('hidden');
}

export function showError() {
  refs.error.classList.remove('hidden');
}

// new SlimSelect({
//   select: refs.breedSelect,
// });

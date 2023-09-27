import axios from 'axios';
import { hideError, hideLoader, showError, showLoader, refs } from './index';

axios.defaults.headers.common['x-api-key'] =
  'live_nxqY5arkN4nOHU5fGQPW6s3cKzzajEtEYQiPEEeYeiSNiHsZYsmEbhme5qUSQ2AK';

const BASE_URL = 'https://api.thecatapi.com/v1';

export function fetchBreeds() {
  refs.breedSelect.classList.remove("hidden");
  showLoader();
  hideError();
  return axios
    .get(`${BASE_URL}/breeds`)
    .then(response => {
      hideLoader();
      return response.data;
    })
    .catch(() => {
      hideLoader();
      refs.breedSelect.classList.add("hidden");
      showError();
    });
}

export function fetchCatByBreed(breedId) {
  refs.breedSelect.classList.remove("hidden");
  showLoader();
  hideError();
  return axios
    .get(`${BASE_URL}/images/search?breed_ids=${breedId}`)
    .then(response => {
      hideLoader();
      return response.data;
    })
    .catch(() => {
      hideLoader();
      refs.breedSelect.classList.add("hidden");
      showError();
    });
}

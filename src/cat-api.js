import axios from 'axios';
import { hideError, hideLoader, showError, showLoader } from './index';

axios.defaults.headers.common['x-api-key'] =
  'live_nxqY5arkN4nOHU5fGQPW6s3cKzzajEtEYQiPEEeYeiSNiHsZYsmEbhme5qUSQ2AK';

const BASE_URL = 'https://api.thecatapi.com/v1';

export function fetchBreeds() {
  showLoader();
  hideError();
  return axios.get(`${BASE_URL}/breeds123`).then(response => {
    hideLoader();
    if (response.status !== 200) {
      showError();
      throw new Error('Bad Request');
    }
    return response.data;
  });
}

export function fetchCatByBreed(breedId) {
  showLoader();
  hideError();
  return axios
    .get(`${BASE_URL}/images/search?breed_ids=${breedId}`)
    .then(response => {
      hideLoader();
      showError();
      if (response.status !== 200) {
        throw new Error('Bad Request');
      }
      return response.data;
    });
}



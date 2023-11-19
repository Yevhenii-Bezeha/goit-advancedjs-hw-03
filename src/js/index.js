import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import Notiflix from 'notiflix';
import { fetchBreeds, fetchCatByBreed } from './cat-api';

const select = document.querySelector('.breed-select');
const divCat = document.querySelector('.cat-info');
const loaderText = document.querySelector('.loader-text');
const errorMessage = document.querySelector('.error');

select.addEventListener('change', onChangeSelect);

errorMessage.classList.add('hidden');

fetchBreeds()
  .then(response => {
    const markup = response
      .map(cat => {
        return `<option value="${cat.id}">${cat.name}</option>`;
      })
      .join('');
    select.innerHTML = markup;
    new SlimSelect({
      select: '.breed-select',
    });
    select.classList.remove('hidden');
  })
  .catch(error => {
    Notiflix.Notify.failure(
      'Oops! Something went wrong! Try reloading the page!'
    );
  })
  .finally(() => {
    loaderText.classList.add('hidden');
  });

function onChangeSelect() {
  const selectedCat = select.value;
  loaderText.classList.remove('hidden');
  select.disabled = true;
  divCat.classList.add('hidden');
  fetchCatByBreed(selectedCat)
    .then(catInfo => {
      renderPage(catInfo);
    })
    .catch(error => {
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
    })
    .finally(() => {
      loaderText.classList.add('hidden');
      select.disabled = false;
      divCat.classList.remove('hidden');
    });
}

function renderPage(info) {
  const markup = `<img src="${info[0].url}" alt="cat image" width = 450 height = 400>
        <h2>${info[0].breeds[0].name}</h2>
        <p>${info[0].breeds[0].description}</p>
        <p>${info[0].breeds[0].temperament}</p>`;

  divCat.innerHTML = markup;
}

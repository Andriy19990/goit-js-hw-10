import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import { fetchCountries } from "./fetchCountries";

const DEBOUNCE_DELAY = 300;

const inputRef = document.querySelector('#search-box');
const listRef = document.querySelector('.country-list');
const infoRef = document.querySelector('.country-info');

inputRef.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(event) {
    const countryName = event.target.value.trim();
    if (!countryName) {
        listRef.innerHTML = '';
        infoRef.innerHTML = '';
        return;
    }
    fetchCountries(countryName)
        .then(renderCountriesList)
        .catch(() => Notiflix.Notify.failure("Oops, there is no country with that name"));
}

function renderCountriesList(data) {
    if (data.length > 10) {
        Notiflix.Notify.warning('Too many matches found. Please enter a more specific name.')
    } else if (data.length === 1) {
        infoRef.innerHTML = renderCountryInfo(data[0]);
        listRef.innerHTML = "";
    } else {
        const list = data.map(country => renderCountryList(country)).join('');
        listRef.insertAdjacentHTML('beforeend', list);
        infoRef.innerHTML = "";
    }
}

function renderCountryList({ name, flags }) {
    return `
    <li class="country-list__item">
        <img src=${flags.svg} alt="${name.official}" width=80px>
        <h2 class="country-list__name">${name.official}</h2>
    </li>
    `
}

function renderCountryInfo({ name, capital, population, flags, languages }) {
    return `
    <div class="country">
        <div class="country__title">
            <img class="country__img" src=${flags.svg} alt="${name.official}" width=200px>
            <h2 class="country__name">${name.official}</h2>
        </div>
        <div class="info">
            <p class="capital"><span class="text">Capital</span>: ${capital}</p>
            <p class="population"><span class="text">Population</span>: ${population}</p>
            <p class="languages"><span class="text">Languages</span>: ${Object.values(languages)}</p>
        </div>
    </div>
    `
}







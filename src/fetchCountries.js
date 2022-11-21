export { fetchCountries };

function fetchCountries(name) {
    const url = `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`;
    return fetch(url)
    .then(responce => {
    if (!responce.ok) {
    throw Error(responce.statusText);
    }
    return responce.json();
});
}
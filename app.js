const searchInput = document.querySelector('#search');
const container = document.querySelector('.container');
const body = document.querySelector('.main');
const loader = document.querySelector('.loader');
const formContainer = document.querySelector('.form-container');
const title = document.querySelector('.title');
const list = document.querySelector('#list');


let countries = [];

const loadCountries = async () => {
  const response = await fetch('https://restcountries.com/v3.1/all');
  countries = await response.json(); 
  renderCountries(countries);
};
const renderCountries = async (countries)  => {
  const country = countries[0];
  if (countries.length > 10) {
    list.innerHTML = '<h1 id="msg-title">Please make your search more specific.</h1>';
  } else if (countries.length === 1) {
    const responseWheather = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${country.latlng[0]}&lon=${country.latlng[1]}&appid=${'cdd9d1d118eafa7b8037745d3e06adb9'}`)
    const clima = await responseWheather.json();
    const icono = `https://openweathermap.org/img/w/${clima.weather[0].icon}.png`;
    list.innerHTML = `
      <div id="country-box">
        <img src=${country.flags.svg} alt="">
        <h3>${country.name.common}</h3>
        <p>
          <b>Capital:</b>${country.capital}
        </p>
        <p>
         <b>Population:</b>${country.population.toLocaleString()}
        </p>
        <p>
          <b>Region:</b> ${country.region}
        </p>
        <p id="weather-box">
         <b>
         Weather:</b>${clima.weather[0].main}
         <img class="icon" src="${icono}" alt="">
        </p>
      </div>
    `;
  } else if (countries.length > 0) {
    list.innerHTML = countries.map(country => `
      <div id="country-box">
        <img src=${country.flags.svg} alt="">
        <h3>${country.name.common}</h3>
      </div>
    `).join('');
    
  } else {
    list.innerHTML = '<h1 id="msg-title">There are no countries that match your search </h1>';
  }
};
searchInput.addEventListener('keyup', async e => {
  const inputValue = searchInput.value.toLowerCase();
  const filteredCountries = countries.filter(country => country.name.common.toLowerCase().includes(inputValue));
  renderCountries(filteredCountries);
});
loadCountries();
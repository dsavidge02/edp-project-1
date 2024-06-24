let nameH1;
let climateSpan;
let surfaceWaterSpan;
let diameterSpan;
let rotationPeriodSpan;
let orbitalPeriodSpan;
let terrainSpan;
let gravitySpan;
let populationSpan;
let filmsUl;
let charsUl;
const baseUrl = `https://swapi2.azurewebsites.net/api`;

addEventListener("DOMContentLoaded", () => {
  nameH1 = document.querySelector("h1#name");
  climateSpan = document.querySelector("span#climate");
  surfaceWaterSpan = document.querySelector("span#surface_water");
  diameterSpan = document.querySelector("span#diameter");
  rotationPeriodSpan = document.querySelector("span#rotation_period");
  orbitalPeriodSpan = document.querySelector("span#orbital_period");
  terrainSpan = document.querySelector("span#terrain");
  gravitySpan = document.querySelector("span#gravity");
  populationSpan = document.querySelector("span#population");
  filmsUl = document.querySelector("#films>ul");
  charsUl = document.querySelector("#characters>ul"); // MUST RENAME

  const sp = new URLSearchParams(window.location.search);
  const id = sp.get("id");
  getPlanet(id);
});

async function getPlanet(id) {
  let planet;
  try {
    planet = await fetchPlanet(id);
    console.log(planet);
    planet.characters = await fetchCharacter(id);
    planet.films = await fetchFilms(id);
  } catch (ex) {
    console.error(`Error reading character ${id} data.`, ex.message);
  }
  renderCharacter(character);
}
async function fetchPlanet(id) {
  const url = `${baseUrl}/planets/${id}`;
  const planet = await fetch(url).then((res) => res.json());
  return planet;
}

async function fetchCharacter(id) {
  let characterUrl = `${baseUrl}/planets/${id}/characters`;
  const characters = await fetch(characterUrl).then((res) => res.json());
  return characters;
}

async function fetchFilms(id) {
  const url = `${baseUrl}/planets/${id}/films`;
  const films = await fetch(url).then((res) => res.json());
  return films;
}

const renderPlanet = (planet) => {
  document.title = `SWAPI - ${planet?.name}`; // Just to make the browser tab say their name
  nameH1.textContent = planet?.name;
  climateSpan.textContent = character?.climate;
  surfaceWaterSpan.textContent = character?.surface_water;
  diameterSpan.textContent = character?.diameter;
  rotationPeriodSpan.textContent = character?.rotation_period;
  orbitalPeriodSpan.textContent = character?.orbital_period;
  terrainSpan.textContent = character?.terrain;
  gravitySpan.textContent = character?.gravity;
  populationSpan.textContent = character?.population;

  const filmsLis = planet?.films?.map(
    (film) => `<li><a href="/film.html?id=${film.id}">${film.title}</li>`
  );
  filmsUl.innerHTML = filmsLis.join("");

  const charsLis = planet?.characters?.map(
    (chars) => `<li><a href="/film.html?id=${chars.id}">${chars.name}</li>`
  );
  charsUl.innerHTML = charsLis.join("");
};

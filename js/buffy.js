const buffySeason = document.getElementById('buffyseason');
const buffyEpisode = document.getElementById('buffyepisode');
const buffySearchBtn = document.getElementById('buffybtn');
const buffySearchSection = document.getElementById('search-section')

const errorMessage = document.getElementById('errormessage');
const searchResults = document.getElementById('buffyresults');

const episodeTitle = document.getElementById('episode-title');
const seasonEpisode = document.getElementById('season-ep');
const airDate = document.getElementById('airdate');
const epDirector = document.getElementById('director');
const epPlot = document.getElementById('plot');
const epQuote = document.getElementById('ep-quote');
const epTrivia = document.getElementById('ep-trivia');
const imdbLink = document.getElementById('imdb-link');

const apiURL = "https://buffy-the-vampire-slayer-api.herokuapp.com/";
const apiEpisode = "episode/";
const apiSeason = "/season/";

errorMessage.style.display = 'none';
searchResults.style.display = 'none';

buffySearchBtn.addEventListener('click', Search);

function Search() {
  const seasonValue = buffySeason.value;
  const episodeValue = buffyEpisode.value;
  findData(seasonValue, episodeValue);
  buffySeason.value = "";
  buffyEpisode.value = "";
}

async function findData(seasonValue, episodeValue){
try {
const res = await fetch(`${apiURL}${apiEpisode}${episodeValue}${apiSeason}${seasonValue}`);
const json = await res.json();
displayData(json);
errorMessage.style.display = 'none'
} catch (error) {
errorMessage.style.display = 'block';
searchResults.style.display = 'none';
}
}

function displayData(jsonData) {
  console.log(jsonData.error);
  if(jsonData.error) {
    errorMessage.style.display = 'block';
    searchResults.style.display = 'none';
    return;
  }
  buffySearchSection.style.display = 'none';
  searchResults.style.display = 'block';
  episodeTitle.innerHTML = jsonData[0].title;
  seasonEpisode.innerHTML = 'season ' + jsonData[0].season + ' episode ' + jsonData[0].episode_number;
  airDate.innerHTML = 'original air date - ' + jsonData[0].air_date;
  epDirector.innerHTML = 'this episode was directed by ' + jsonData[0].director;
  epPlot.innerHTML = jsonData[0].title + "'s plot - " + jsonData[0].plot;
  epQuote.innerHTML = 'a quote from this episode - ' + jsonData[0].quote;
  epTrivia.innerHTML = "here's a little piece of trivia from " + jsonData[0].title + " - " + jsonData[0].trivia;
  imdbLink.href = jsonData[0].imdb_url;
}
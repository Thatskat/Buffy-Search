const buffySeason = document.getElementById('buffyseason'); //Gets the season input from index.html
const buffyEpisode = document.getElementById('buffyepisode'); //Gets the episode input from index.html
const buffySearchBtn = document.getElementById('buffybtn'); //The search button from idex.html
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


/**
 * @const {string}
 */
const apiURL = "https://buffy-the-vampire-slayer-api.herokuapp.com/";
/**
 * @const {string}
 */
const apiEpisode = "episode/";
/**
 * @const {string}
 */
const apiSeason = "/season/";

// Hides the error Messages and Search Results page 
errorMessage.style.display = 'none';
searchResults.style.display = 'none';

buffySearchBtn.addEventListener('click', validateForm); //CLick event on button will start the search for the specific episode


/**
 * validateFrom() - validates the inputted values to see if it complies with how many episodes and season there are 
 * 
 * @returns {string} - If inputted values pass the validation, buffySeason and buffyEpisode values will be passed onto the search()
 */

function validateForm(){
  let seasonNumber = buffySeason.value;
  let episodeNumber = buffyEpisode.value;
  if(seasonNumber == "" && episodeNumber == ""){
    alert("both the season and episode fields MUST be filled out!")
  }
  else if(seasonNumber == ""){
    alert("the season number MUST be filled out!");
    return false;
  }
  else if(episodeNumber == ""){
    alert("the episode number MUST be filled out!");
    return false;
  }else if(seasonNumber == "1" && episodeNumber > 12){
    alert("season one only has 12 episodes!");
    return false;
  } else if(seasonNumber > 7){
    alert("there are only 7 seasons of buffy!");
    return false;
  } else if(seasonNumber > 1 && seasonNumber < 8 && episodeNumber > 22){
    alert("there are only 22 episodes in a season of buffy!")
    return false;
  }
  else {
    search()
  }
}

/**
 * search() - receives the inputted buffySeason and buffyEpisode values and passes them as parameters for the findData()
 * buffySeason and buffyEpisode values are then reset to ""
 * 
 * @return {Parameters}
 */
function search() {
  const seasonValue = buffySeason.value;
  const episodeValue = buffyEpisode.value;
  findData(seasonValue, episodeValue);
  buffySeason.value = "";
  buffyEpisode.value = "";
}

/**
 * 
 * @param {*} seasonValue 
 * @param {*} episodeValue 
 * 
 * findData() - returns the episode data of the inputted Buffy episode
 * 
 * @return {object} - JSON object containing the information of the specified Buffy episode
 */
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

/**
 * 
 * @param {*} jsonData 
 * 
 * displayData() - Displays the buffy json data in a presentable fashion
 * json data included is episode title, season and episode number, director, original broadcast date, the episode's main plot, a quote from the episode, a piece of trivia as well as the link to that episode's imdb page for further information
 * 
 *
 */
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

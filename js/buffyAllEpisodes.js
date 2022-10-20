const results = document.getElementById('results');
const errorMessageEpisode = document.getElementById('errorMessageEpisode');

const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const season1Btn = document.getElementById('season1Btn');
const season2Btn = document.getElementById('season2Btn');
const season3Btn = document.getElementById('season3Btn');
const season4Btn = document.getElementById('season4Btn');
const season5Btn = document.getElementById('season5Btn');
const season6Btn = document.getElementById('season6Btn');
const season7Btn = document.getElementById('season7Btn');

const episodeApi = "https://buffy-the-vampire-slayer-api.herokuapp.com/episode/season/";

errorMessageEpisode.style.display = 'none';

let seasonNumber = 1;
let totalEpisodes;

async function loadEpisodes(seasonNumber) {
  const buffyEpsLink = await fetch(`${episodeApi}${seasonNumber}`);
  const buffyEpsJson = await buffyEpsLink.json();
  
  totalEpisodes = buffyEpsJson.length;

results.innerHTML = '';

  for(i=0; i <= buffyEpsJson.length ; i++) {
let flipCard = document.createElement('div')
let col = document.createElement('div');
let titleArea = document.createElement('h1');
let seasonEpNumber = document.createElement('h2');
let seasonEpImdb = document.createElement('a');

let seasonEpAirDate = document.createElement('p');
let seasonEpDirector = document.createElement('p');
let seasonEpPlot = document.createElement('p');

flipCard.className = 'flip-card d-inline-block mb-3 me-3'
col.className = 'card season-ep-results flip-card-inner';

titleArea.className = 'flip-front card-title card-spacing-1 fs-1';
seasonEpNumber.className = 'flip-front card-text card-spacing-2 fs-4';
seasonEpPlot.className = 'flip-front card-text card-spacing-3';

seasonEpAirDate.className = 'flip-back card-text card-spacing-4 fs-3';
seasonEpDirector.className = 'flip-back card-text card-spacing-5';
seasonEpImdb.className = 'btn btn-ep-back flip-back card-spacing-6';
seasonEpImdb.setAttribute('target', '_blank');
seasonEpImdb.innerText = "IMDB Episode Link"

flipCard.style.width = "31%";
col.appendChild(titleArea);
col.appendChild(seasonEpNumber);
col.appendChild(seasonEpPlot);

col.appendChild(seasonEpAirDate);
col.appendChild(seasonEpDirector);
col.appendChild(seasonEpImdb);

titleArea.innerHTML = buffyEpsJson[i].title;
seasonEpNumber.innerHTML = 'season ' + buffyEpsJson[i].season + ' episode ' + buffyEpsJson[i].episode_number;
seasonEpImdb.href = buffyEpsJson[i].imdb_url;

seasonEpAirDate.innerHTML = 'original air date - ' + buffyEpsJson[i].air_date;
seasonEpDirector.innerHTML = 'this episode was directed by ' + buffyEpsJson[i].director;
seasonEpPlot.innerHTML = buffyEpsJson[i].title + "'s plot - " + buffyEpsJson[i].plot;

flipCard.appendChild(col);
results.appendChild(flipCard);
  }
}

loadEpisodes();

prevBtn.addEventListener('click', async function(e) {
  if(seasonNumber == 1) {
    prevBtn.style.display = 'none';
    return
  }
  seasonNumber--
  loadEpisodes(seasonNumber);
  prevBtn.style.display = 'inline';
  nextBtn.style.display = 'inline';
});

nextBtn.addEventListener('click', async function(e) {
  if(seasonNumber == 7) {
    nextBtn.style.display = 'none';
    return
  }
  nextBtn.style.display = 'inline';
  prevBtn.style.display = 'inline';
  seasonNumber++
  loadEpisodes(seasonNumber);
});

season1Btn.addEventListener('click', async function(e) {
  seasonNumber = 1;
  prevBtn.style.display = 'none';
  nextBtn.style.display = 'inline';
  loadEpisodes(seasonNumber);
});
season2Btn.addEventListener('click', async function(e) {
  seasonNumber = 2;
  prevBtn.style.display = 'inline';
  nextBtn.style.display = 'inline';
  loadEpisodes(seasonNumber);
});
season3Btn.addEventListener('click', async function(e) {
  seasonNumber = 3;
  prevBtn.style.display = 'inline';
  nextBtn.style.display = 'inline';
  loadEpisodes(seasonNumber);
});
season4Btn.addEventListener('click', async function(e) {
  seasonNumber = 4;
  prevBtn.style.display = 'inline';
  nextBtn.style.display = 'inline';
  loadEpisodes(seasonNumber);
});
season5Btn.addEventListener('click', async function(e) {
  seasonNumber = 5;
  prevBtn.style.display = 'inline';
  nextBtn.style.display = 'inline';
  loadEpisodes(seasonNumber);
});
season6Btn.addEventListener('click', async function(e) {
  seasonNumber = 6;
  prevBtn.style.display = 'inline';
  nextBtn.style.display = 'inline';
  loadEpisodes(seasonNumber);
});
season7Btn.addEventListener('click', async function(e) {
  seasonNumber = 7;
  prevBtn.style.display = 'inline';
  nextBtn.style.display = 'none';
  loadEpisodes(seasonNumber);
});

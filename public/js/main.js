import { displayCurrentDate, setupScrollButtons } from './dom.js';
import { initYoutubeFeed, initTruthFeed} from './feed.js';
import { initFakeNewsForm } from './instagram.js';
import { fetchAndDisplayRss } from './rss.js';
import { initLocalStorage, renderInstagramList } from './localStorage.js';

fetchAndDisplayRss("https://www.aljazeera.com/xml/rss/all.xml", 'al-jazeera-news', 'trump'); //Real al-jazeera-news RSS
fetchAndDisplayRss("https://feeds.bbci.co.uk/news/world/rss.xml/", 'bbc-news', 'trump'); //Real BBC RSS
fetchAndDisplayRss("https://www.washingtontimes.com/rss/headlines/news", 'washingtontimes-news', 'trump'); //Washington Times RSS
displayCurrentDate();
initLocalStorage();
renderInstagramList()
initYoutubeFeed(); // Will later be real feed if we continue to work on this project
initTruthFeed(); // Will later be real feed if we continue to work on this project

setupScrollButtons("youtubeContainer", document.querySelector(".youtube-prev"), document.querySelector(".youtube-next")); //Will later be moved to new js-file for youtube

document.addEventListener("DOMContentLoaded", () => {
  const fakeNewsBtn = document.getElementById("createFakeNewsBtn");
  if (fakeNewsBtn) {
    fakeNewsBtn.addEventListener("click", initFakeNewsForm);
  }
});
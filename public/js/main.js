import { displayCurrentDate, setupScrollButtons } from './dom.js';
import { initYoutubeFeed, initTruthFeed} from './feed.js';
import { initFakeNewsForm } from './instagram.js';
import { fetchAndDisplayRss } from './rss.js';
import { initLocalStorage, renderInstagramList } from './localStorage.js';

fetchAndDisplayRss("https://www.aljazeera.com/xml/rss/all.xml", 'al-jazeera-news', 'trump');
fetchAndDisplayRss("https://feeds.bbci.co.uk/news/world/rss.xml/", 'bbc-news', 'trump');
fetchAndDisplayRss("https://www.washingtontimes.com/rss/headlines/news", 'nyt-news', 'trump');
displayCurrentDate();
initLocalStorage();
renderInstagramList()
initYoutubeFeed(); //Will later be real feed
initTruthFeed(); //Will later be real feed
setupScrollButtons("instagramContainer", document.querySelector(".instagram-prev"), document.querySelector(".instagram-next"));
setupScrollButtons("youtubeContainer", document.querySelector(".youtube-prev"), document.querySelector(".youtube-next"));

document.addEventListener("DOMContentLoaded", () => {
  const fakeNewsBtn = document.getElementById("createFakeNewsBtn");
  if (fakeNewsBtn) {
    fakeNewsBtn.addEventListener("click", initFakeNewsForm);
  }
});
import { displayCurrentDate } from './dom.js';
import {
  initInstagramFeed,
  initYoutubeFeed,
  setupScrollButtons
} from './feed.js';
import { initFakeNewsForm } from './fakeNews.js';
import { fetchAndDisplayRss } from './rss.js';

fetchAndDisplayRss("https://www.aljazeera.com/xml/rss/all.xml", 'al-jazeera-news', 'trump');
fetchAndDisplayRss("https://feeds.bbci.co.uk/news/world/rss.xml/", 'bbc-news', 'trump');
fetchAndDisplayRss("https://rss.nytimes.com/services/xml/rss/nyt/World.xml", 'nyt-news', 'trump');
displayCurrentDate();
initInstagramFeed();
initYoutubeFeed();
setupScrollButtons("instagramContainer", document.querySelector(".instagram-prev"), document.querySelector(".instagram-next"));
setupScrollButtons("youtubeContainer", document.querySelector(".youtube-prev"), document.querySelector(".youtube-next"));
initFakeNewsForm();
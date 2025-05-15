import { displayCurrentDate } from './dom.js';
import {
  initInstagramFeed,
  initYoutubeFeed,
  setupScrollButtons
} from './feed.js';
import { initFakeNewsForm } from './fakeNews.js';
import { fetchAndDisplayRss } from './rss.js';

//", , "https://rss.nytimes.com/services/xml/rss/nyt/World.xml", "nyt-news, https://feeds.bbci.co.uk/news/world/rss.xml
fetchAndDisplayRss("https://www.dn.se/rss/", 'bbc-news', 'trump');
displayCurrentDate();
initInstagramFeed();
initYoutubeFeed();
setupScrollButtons("instagramContainer", document.querySelector(".instagram-prev"), document.querySelector(".instagram-next"));
setupScrollButtons("youtubeContainer", document.querySelector(".youtube-prev"), document.querySelector(".youtube-next"));
initFakeNewsForm();
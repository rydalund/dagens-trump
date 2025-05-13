import { displayCurrentDate } from './dom.js';
import {
  initInstagramFeed,
  initYoutubeFeed,
  setupScrollButtons
} from './feed.js';
import { initFakeNewsForm } from './fakeNews.js';

displayCurrentDate();
initInstagramFeed();
initYoutubeFeed();
setupScrollButtons("instagramContainer", document.querySelector(".instagram-prev"), document.querySelector(".instagram-next"));
setupScrollButtons("youtubeContainer", document.querySelector(".youtube-prev"), document.querySelector(".youtube-next"));
initFakeNewsForm();
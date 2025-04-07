// Instagram-slider
const instaContainer = document.getElementById("instagramContainer");
document.querySelector(".instagram-prev").addEventListener("click", () => {
  instaContainer.scrollBy({ left: -300, behavior: "smooth" });
});
document.querySelector(".instagram-next").addEventListener("click", () => {
  instaContainer.scrollBy({ left: 300, behavior: "smooth" });
});

// YouTube-slider ===
const ytContainer = document.getElementById("youtubeContainer");
document.querySelector(".youtube-prev").addEventListener("click", () => {
  ytContainer.scrollBy({ left: -300, behavior: "smooth" });
});
document.querySelector(".youtube-next").addEventListener("click", () => {
  ytContainer.scrollBy({ left: 300, behavior: "smooth" });
});

// RSS-feeds
// SVT: https://www.svt.se/nyheter/rss.xml (kolla och fixa)
fetch('https://api.rss2json.com/v1/api.json?rss_url=https://www.svt.se/nyheter/rss.xml')
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById("svt-news");
    container.innerHTML = "";
    const filtered = data.items.filter(item => item.title.toLowerCase().includes("trump"));
    if (filtered.length === 0) {
      container.innerHTML = "<p>Inga nyheter om Trump hittades.</p>";
    } else {
      filtered.slice(0, 5).forEach(item => {
        container.innerHTML += `<p><a href="${item.link}" target="_blank">${item.title}</a></p>`;
      });
    }
  });

// Google News RSS
fetch('https://api.rss2json.com/v1/api.json?rss_url=https://news.google.com/rss/search?q=trump&hl=sv&gl=SE&ceid=SE:sv')
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById("google-news");
    container.innerHTML = "";
    data.items.slice(0, 5).forEach(item => {
      container.innerHTML += `<p><a href="${item.link}" target="_blank">${item.title}</a></p>`;
    });
  });

// Reuters Top News, kolla och fixa
fetch('https://api.rss2json.com/v1/api.json?rss_url=http://feeds.reuters.com/reuters/topNews')
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById("reuters-news");
    container.innerHTML = "";
    const filtered = data.items.filter(item => item.title.toLowerCase().includes("trump"));
    if (filtered.length === 0) {
      container.innerHTML = "<p>Inga nyheter om Trump hittades.</p>";
    } else {
      filtered.slice(0, 5).forEach(item => {
        container.innerHTML += `<p><a href="${item.link}" target="_blank">${item.title}</a></p>`;
      });
    }
  });
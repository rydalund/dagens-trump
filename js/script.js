// Date
const dateElement = document.getElementById('current-date');
const today = new Date();

const weekdayNames = ['Söndag', 'Måndag', 'Tisdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lördag'];
const monthNames = ['januari', 'februari', 'mars', 'april', 'maj', 'juni',
                    'juli', 'augusti', 'september', 'oktober', 'november', 'december'];

const formattedDate = `${weekdayNames[today.getDay()]} ${today.getDate()} ${monthNames[today.getMonth()]} ${today.getFullYear()}`;
dateElement.textContent = formattedDate;

// Instagram-slider
const instaContainer = document.getElementById("instagramContainer");
document.querySelector(".instagram-prev").addEventListener("click", () => {
  instaContainer.scrollBy({ left: -300, behavior: "smooth" });
});
document.querySelector(".instagram-next").addEventListener("click", () => {
  instaContainer.scrollBy({ left: 300, behavior: "smooth" });
});

// YouTube-slider
const ytContainer = document.getElementById("youtubeContainer");
document.querySelector(".youtube-prev").addEventListener("click", () => {
  ytContainer.scrollBy({ left: -300, behavior: "smooth" });
});
document.querySelector(".youtube-next").addEventListener("click", () => {
  ytContainer.scrollBy({ left: 300, behavior: "smooth" });
});

// RSS-feeds
// SVT: https://www.svt.se/nyheter/rss.xml
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

// Reuters Top News
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

// Hämta de senaste 3 inläggen från Truth Social
fetch('/posts')
  .then(res => res.json())
  .then(posts => {
    const container = document.querySelector('.truth-feed');
    container.innerHTML = "";  // Töm tidigare innehåll

    if (posts.length === 0) {
      container.innerHTML = "<p>Inga inlägg hittades.</p>";
    } else {
      posts.forEach(post => {
        const postDiv = document.createElement('div');
        postDiv.className = 'post';
        postDiv.innerHTML = `
          <div class="post-header">
            <img src="${post.avatar}" alt="${post.username} profile" />
            <div class="post-user">
              <strong>${post.username}</strong>
              <span>@${post.username} · ${post.date}</span>
            </div>
          </div>
          <p class="post-content">${post.content}</p>
        `;
        container.appendChild(postDiv);
      });
    }
  })
  .catch(err => {
    console.error('Error fetching posts:', err);
    const container = document.querySelector('.truth-feed');
    container.innerHTML = "<p>Misslyckades att hämta inlägg.</p>";
  });
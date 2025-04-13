// Date
const dateElement = document.getElementById('current-date');
const today = new Date();

const weekdayNames = ['Söndag', 'Måndag', 'Tisdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lördag'];
const monthNames = ['januari', 'februari', 'mars', 'april', 'maj', 'juni',
  'juli', 'augusti', 'september', 'oktober', 'november', 'december'];

const formattedDate = `${weekdayNames[today.getDay()]} ${today.getDate()} ${monthNames[today.getMonth()]} ${today.getFullYear()}`;
if (dateElement) {
  dateElement.textContent = formattedDate;
}

// Scroll for Instagram and YouTube
function setupScrollButtons(containerId, prevBtn, nextBtn) {
  const container = document.getElementById(containerId);
  
  // "disable" to get different styling if there is nothing to scroll to left
  function updateScrollButtons() {
    if (container.scrollLeft === 0) {
      prevBtn.classList.add("disabled");
    } else {
      prevBtn.classList.remove("disabled");
    }
    if (container.scrollLeft + container.clientWidth >= container.scrollWidth) {
      nextBtn.classList.add("disabled");
    } else {
      nextBtn.classList.remove("disabled");
    }
  }

  // Scroll-function
  prevBtn.addEventListener("click", () => {
    container.scrollBy({ left: -300, behavior: "smooth" });
  });

  nextBtn.addEventListener("click", () => {
    container.scrollBy({ left: 300, behavior: "smooth" });
  });

  container.addEventListener("scroll", updateScrollButtons);

  updateScrollButtons();
}

// Instagram-feed (creates placeholders and appends them)
const instaContainer = document.getElementById("instagramContainer");
const instagramData = [
  {
    img: "images/instagram1.jpg",
    user: "@realtrump",
    tags: "#trump #politics",
    likes: "12,4k likes",
  },
  {
    img: "images/instagram2.jpg",
    user: "@usa_today",
    tags: "#breaking #trump",
    likes: "8,2k likes",
  },
  {
    img: "images/instagram2.jpg",
    user: "@usa_today",
    tags: "#breaking #trump",
    likes: "8,2k likes",
  },
  {
    img: "images/instagram2.jpg",
    user: "@usa_today",
    tags: "#breaking #trump",
    likes: "8,2k likes",
  },
  {
    img: "images/instagram2.jpg",
    user: "@usa_today",
    tags: "#breaking #trump",
    likes: "8,2k likes",
  }
];

instagramData.forEach(post => {
  const card = document.createElement("div");
  card.className = "social-card";
  card.innerHTML = `
    <img src="${post.img}" alt="Instagram-bild" class="img-fluid">
    <div class="social-card-body">
      <p class="post-username">${post.user}</p>
      <p class="post-tags">${post.tags}</p>
      <p class="post-likes"><i class="bi bi-heart-fill"></i> ${post.likes}</p>
    </div>
  `;
  instaContainer.appendChild(card);
});

// YouTube-feed (creates placeholders and appends them)
const youtubeContainer = document.getElementById("youtubeContainer");
const youtubeData = [
  {
    img: "images/youtube1.jpg",
    title: "Trump's Latest Speech",
    channel: "Trump Official",
    views: "1,2M views",
  },
  {
    img: "images/youtube2.jpg",
    title: "Breaking News: Trump 2024",
    channel: "News Channel",
    views: "890k views",
  },
  {
    img: "images/youtube3.jpg",
    title: "Trump's Debate Highlights",
    channel: "Debate Highlights",
    views: "650k views",
  },
  {
    img: "images/youtube4.jpg",
    title: "Trump Visits Congress",
    channel: "Political News",
    views: "320k views",
  },
  {
    img: "images/youtube5.jpg",
    title: "Trump's Social Media Strategy",
    channel: "Tech Channel",
    views: "430k views",
  }
];

youtubeData.forEach(post => {
  const card = document.createElement("div");
  card.className = "social-card";
  card.innerHTML = `
    <img src="${post.img}" alt="YouTube-bild" class="img-fluid">
    <div class="social-card-body">
      <p class="post-title">${post.title}</p>
      <p class="post-channel">${post.channel}</p>
      <p class="post-views">${post.views}</p>
    </div>
  `;
  youtubeContainer.appendChild(card);
});

// Setup scroll
setupScrollButtons("instagramContainer", document.querySelector(".instagram-prev"), document.querySelector(".instagram-next"));
setupScrollButtons("youtubeContainer", document.querySelector(".youtube-prev"), document.querySelector(".youtube-next"));
// Scroll for Instagram and YouTube
export function setupScrollButtons(containerId, prevBtn, nextBtn) {
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

export function initInstagramFeed() {
  // Instagram-feed (creates placeholders and appends them)
  const instaContainer = document.getElementById("instagramContainer");
  const instagramData = [
    {
      img: "images/instagram1.jpeg",
      user: "@larryeldershow",
      tags: "#trump",
      likes: "90,4k likes",
      link: "https://www.instagram.com/p/DBaHh0QNC4O/"
    },
    {
      img: "images/instagram2.jpeg",
      user: "@uplifesociety",
      tags: "#DonaldTrump #2024Election ",
      likes: "41,5k likes",
      link: "https://www.instagram.com/p/DCCbY4uIDC-/"
    },
    {
      img: "images/instagram3.jpeg",
      user: "@faranak_amid",
      tags: "#faranak_amid",
      likes: "183 likes",
      link: "https://www.instagram.com/p/DCCNTchIeW3/"
    },
    {
      img: "images/instagram4.jpeg",
      user: "@skynews",
      tags: "#BoycottTrump #BoycottUS",
      likes: "98,2k likes",
      link: "https://www.instagram.com/p/DHGCBZ_t01E/"
    },
    {
      img: "images/instagram5.jpeg",
      user: "@usa_today",
      tags: "#NarendraModi #Trump",
      likes: "2,2k likes",
      link: "https://www.instagram.com/p/DCBaXfhpTX8/"
    }
  ];

  instagramData.forEach(post => {
    const card = document.createElement("div");
    card.className = "social-card";
    card.innerHTML = `
    <a href="${post.link}" target="_blank" rel="noopener noreferrer">
      <img src="${post.img}" alt="Instagram-bild" class="img-fluid">
    </a>
    <div class="social-card-body">
      <p class="post-username">${post.user}</p>
      <p class="post-tags">${post.tags}</p>
      <p class="post-likes"><i class="bi bi-heart-fill"></i> ${post.likes}</p>
    </div>
  `;
    instaContainer.appendChild(card);
  });
}

export function initYoutubeFeed() {
  // YouTube-feed (creates placeholders and appends them)
  const youtubeContainer = document.getElementById("youtubeContainer");
  const youtubeData = [
    {
      videoId: "VEle3pZRqmI",
      title: "Trump Tariff Cold Open",
    },
    {
      videoId: "AQkFvb0kNOw",
      title: "Donald Trump taking the ‘war on woke’",

    },
    {
      videoId: "NHowYAm4p0g",
      title: "Trump want's to buy the house in Prince Of Bel-Air",
    },
    {
      videoId: "LJ6nOmAiwqo",
      title: "Trump's Meanest 'The Apprentice' Moments",
    },
    {
      videoId: "jkghtyxZ6rc",
      title: "Trump Take Down WWE's Vince McMahon",
    }
  ];

  youtubeData.forEach(post => {
    const card = document.createElement("div");
    card.className = "social-card";
    card.innerHTML = `
    <div class="video-container">
      <iframe src="https://www.youtube.com/embed/${post.videoId}" allowfullscreen></iframe>
    </div>
    <div class="social-card-body">
      <p class="post-title">${post.title}</p>
    </div>
  `;
    youtubeContainer.appendChild(card);
  });

}
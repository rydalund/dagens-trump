export const instagramData = [
  {
    imageUrl: "images/instagram1.jpeg",
    title: "#trump",
    content: "This is awesome!!!",
    favorited: false,
  },
  {
    imageUrl: "images/instagram2.jpeg",
    title: "#2024Election",
    content: "DonaldTrump",
    favorited: false,
  },
  {
    imageUrl: "images/instagram3.jpeg",
    title: "#trump #usa",
    content: "Happy Americans.",
    favorited: false,
  },
  {
    imageUrl: "images/instagram4.jpeg",
    title: "#BoycottTrump #BoycottUS",
    content: "Finally! U.S.A",
    favorited: false,
  },
  {
    imageUrl: "images/instagram5.jpeg",
    title: "#NarendraModi #Trump",
    content: "India + U.S.A. = true",
    favorited: false,
  },
];

export function initYoutubeFeed() {
  // YouTube-feed (creates placeholders and appends them) Will in the future be real from youtube
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
    },
  ];

  youtubeData.forEach((post) => {
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

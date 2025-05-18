
// Basic list with "Instagram" posts
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

 // YouTube-feed (creates placeholders and appends them) Will in the future be real from youtube
export function initYoutubeFeed() {
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

 // Truth Social-feed (creates placeholders and appends them) Will in the future be real from truthsocial
export function initTruthFeed() {
  const truthContainer = document.getElementById("truthContainer");

  const truthData = [
    {
      date: "Apr 13, 2025",
      url: "https://truthsocial.com/@realDonaldTrump/posts/1234567890",
      text: `
        NOBODY is getting “off the hook” for the unfair Trade
        Balances, and Non Monetary Tariff Barriers, that other
        Countries have used against us, especially not China
        which, by far, treats us the worst! There was no Tariff
        “exception” announced on Friday. These products are
        subject to the existing 20% Fentanyl Tariffs, and they are
        just moving to a different Tariff “bucket.” The Fake News
        knows this, but refuses to report it. We are taking a look
        at Semiconductors and the WHOLE ELECTRONICS SUPPLY CHAIN
        in the upcoming National Security Tariff Investigations.
        What has been exposed is that we need to make products in
        the United States, and that we will not be held hostage by
        other Countries, especially hostile trading Nations like
        China, which will do everything within its power to
        disrespect the American People. We also cannot let them
        continue to abuse us on Trade, like they have for decades,
        THOSE DAYS ARE OVER! The Golden Age of America, which
        includes the upcoming Tax and Regulation Cuts, a
        substantial amount of which was just approved by the House
        and Senate, will mean more and better paying Jobs, making
        products in our Nation, and treating other Countries, in
        particular China, the same way they have treated us. The
        bottom line is that our Country will be bigger, better,
        and stronger than ever before. We will, MAKE AMERICA GREAT
        AGAIN!
      `
    },
    {
      date: "Apr 11, 2025",
      url: "https://truthsocial.com/@realDonaldTrump/posts/114319592702753512",
      text: `
        Russia has to get moving. Too many people ere DYING,
        thousands a week, in a terrible and senseless war - A war
        that should have never happened, and wouldn’t have
        happened, if I were President!!!
      `
    }
  ];

  truthData.forEach(post => {
    const link = document.createElement("a");
    link.href = post.url;
    link.target = "_blank";
    link.className = "truth-post-link";

    const postDiv = document.createElement("div");
    postDiv.className = "truth-post";

    postDiv.innerHTML = `
      <div class="truth-header">
        <img src="images/trump-profile.png" alt="Trump profile" class="truth-avatar" />
        <div>
          <strong>Donald J. Trump</strong><br />
          <span class="truth-handle">@realDonaldTrump • ${post.date}</span>
        </div>
      </div>
      <p>${post.text.trim()}</p>
    `;

    link.appendChild(postDiv);
    truthContainer.appendChild(link);
  });
}

//https://feeds.bbci.co.uk/news/world/rss.xml", https://www.dn.se/rss/, "https://rss.nytimes.com/services/xml/rss/nyt/World.xml", "nyt-news
export function fetchAndDisplayRss(rssUrl, containerId, keyword = "trump") {
  const proxy =
    "https://api.allorigins.win/raw?url=" + encodeURIComponent(rssUrl);

  fetch(proxy)
    .then((response) => response.text())
    .then((str) => {
      const parser = new DOMParser();
      const xml = parser.parseFromString(str, "application/xml");

      const container = document.getElementById(containerId);
      if (!container) {
        console.error(`Elementet med id "${containerId}" hittades inte.`);
        return;
      }

      container.innerHTML = ""; // Rensa tidigare innehåll
      const items = xml.querySelectorAll("item");
      let count = 0;

      for (let i = 0; i < items.length && count < 100; i++) {
        const item = items[i];
        const title = item.querySelector("title")?.textContent ?? "";
        const description =
          item.querySelector("description")?.textContent ?? "";
        const link = item.querySelector("link")?.textContent ?? "";

        if (
          title.toLowerCase().includes(keyword.toLowerCase()) ||
          description.toLowerCase().includes(keyword.toLowerCase())
        ) {
          const p = document.createElement("p");
          const a = document.createElement("a");
          a.href = link;
          a.target = "_blank";
          a.textContent = title;
          p.appendChild(a);
          container.appendChild(p);
          count++;
        }
      }

      if (count === 0) {
        const noNews = document.createElement("p");
        noNews.textContent = `Inga ${keyword}-relaterade nyheter hittades just nu.`;
        container.appendChild(noNews);
      }
    })
    .catch((error) => {
      console.error("Error fetching RSS feed:", error);
    });
}

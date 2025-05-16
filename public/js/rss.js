export function fetchAndDisplayRss(rssUrl, containerId, keyword) {
  const proxyUrl =
    "https://api.allorigins.win/raw?url=" + encodeURIComponent(rssUrl);

  fetch(proxyUrl)
    .then((response) => response.text())
    .then((data) => {
      const parser = new DOMParser();
      const xml = parser.parseFromString(data, "application/xml");

      const container = document.getElementById(containerId);
      if (!container) return;

      container.innerHTML = "";

      const items = xml.querySelectorAll("item");
      let count = 0;

      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const title = item.querySelector("title").textContent;
        const description = item.querySelector("description").textContent;
        const link = item.querySelector("link").textContent;

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
          if (count >= 10) break;
        }
      }

      if (count === 0) {
        const p = document.createElement("p");
        p.textContent = "Inga " + keyword + "-nyheter hittades.";
        container.appendChild(p);
      }
    })
    .catch((error) => {
      console.error("Error fetching RSS feed:", error);
    });
}

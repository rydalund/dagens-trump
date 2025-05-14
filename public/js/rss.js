export function createRssBbc() {
    const rssUrl = 'https://feeds.bbci.co.uk/news/world/rss.xml';
    const proxyUrl = 'https://api.allorigins.win/raw?url=' + encodeURIComponent(rssUrl); //proxyserver som tillåter CORS

    fetch(proxyUrl)
        .then(response => response.text())
        .then(str => {
            const parser = new DOMParser();
            const xml = parser.parseFromString(str, "application/xml");

            const container = document.getElementById('bbc-news');
            if (!container) {
                console.warn('Elementet med id "bbc-news" hittades inte.');
                return;
            }

            const items = xml.querySelectorAll("item");
            let count = 0;

            items.forEach(item => {
                const title = item.querySelector("title").textContent;
                const description = item.querySelector("description").textContent;
                const link = item.querySelector("link").textContent;

                if (
                    title.toLowerCase().includes("donald trump") ||
                    description.toLowerCase().includes("donald trump")
                ) {
                    const p = document.createElement("p");
                    const a = document.createElement("a");
                    a.href = link;
                    a.target = "_blank";
                    a.textContent = title;
                    p.appendChild(a);
                    container.appendChild(p);

                    count++;
                    if (count >= 10) return;
                }
            });

            if (count === 0) {
                const noNews = document.createElement("p");
                noNews.textContent = "Inga Trump-relaterade nyheter hittades just nu.";
                container.appendChild(noNews);
            }
        })
        .catch(error => {
            console.error("Fel vid hämtning av RSS:", error);
        });
}

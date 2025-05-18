import { addPost } from "./localStorage.js";
import { showLoading, hideLoading} from "./dom.js";

export function initFakeNewsForm() { 
  const button = document.getElementById("createFakeNewsBtn");

  const form = document.createElement("form");
  form.id = "fakeNewsForm";
  form.className = "bg-white rounded shadow p-4";
  form.style.maxWidth = "900px";
  form.style.width = "100%";

  form.innerHTML = `
    <h4 class="mb-3 text-center">Skapa fake news 😅 på Instagram 📸</h4>

    <input id="title" type="text" class="form-control mb-3" placeholder="Titel" required />

    <textarea id="content" class="form-control mb-3" placeholder="Innehåll" rows="3"></textarea>

    <div id="imageOptions" class="mb-3">
      <select id="imageChoice" class="form-select" required>
        <option selected disabled>Välj bildkälla</option>
        <option value="ai">Generera AI-bild</option>
        <option value="search">Sök bild</option>
        <option value="upload">Ladda upp bild</option>
      </select>
      <input id="imageUpload" type="file" class="form-control mt-2 d-none" accept="image/*" />
    </div>

    <button type="submit" class="btn btn-primary w-100">SKAPA INLÄGG</button>
  `;

  button.replaceWith(form);

  const imageChoice = form.querySelector("#imageChoice");
  const imageUpload = form.querySelector("#imageUpload");

  // Hides on upload
  imageChoice.addEventListener("change", () => {
    imageUpload.classList.toggle("d-none", imageChoice.value !== "upload");
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!imageChoice.value || imageChoice.value === "Välj bildkälla") {
      alert("Vänligen välj en bildkälla.");
      return; // Prevents submit without image
    }

    const title = form.querySelector("#title").value;
    const content = form.querySelector("#content").value;

    if (imageChoice.value === "ai") {
      imageGenerate(title, content);
    } else if (imageChoice.value === "search") {
      imageSearch(title, content);
    } else if (imageChoice.value === "upload") {
      imageUploadMethod(title, content);
    }

    form.reset();
    imageUpload.classList.add("d-none");
  });
}

// Generate image from title with pollinations.ai
function imageGenerate(title, content) {
  showLoading();

  const apiUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(title)}`;

  fetch(apiUrl)
    .then(response => response.blob())
    .then(blob => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64data = reader.result;

        const post = {
          imageUrl: base64data,
          title,
          content,
          favorited: false
        };

        addPost(post);
        hideLoading();
      };
      reader.readAsDataURL(blob);
    })
    .catch(() => {
      const fallbackPost = {
        imageUrl: "images/trump-profile.png",
        title,
        content,
        favorited: false
      };
      addPost(fallbackPost);
      hideLoading();
    });
}
// Uplode image from computer, size will be reduced for localStorage (later on server)
function imageUploadMethod(title, content) {
  const imageUpload = document.querySelector("#imageUpload");
  const imageFile = imageUpload.files[0];

  if (!imageFile) {
    alert("Vänligen välj en bild.");
    return;
  }

  // 20% of original size
  compressImage(imageFile, 0.2, (compressedBase64) => {
    const post = {
      imageUrl: compressedBase64,
      title,
      content,
      favorited: false
    };
    addPost(post); 
  });
}

// Search images on title from Wikipedia (didn´t find anything better without API keys)
function imageSearch(title, content) {
  showLoading(); // Shows loading.gif

  // Tries first with Swedish
  searchWikipediaAndFetchImage('sv', title)
    .then(imageUrl => convertImageToBase64(imageUrl))
    .then(base64data => {
      const post = {
        imageUrl: base64data,
        title,
        content,
        favorited: false
      };
      addPost(post);
      hideLoading(); // Hide loading.gif
    })
    .catch(() => {
      // Then tries with EN
      searchWikipediaAndFetchImage('en', title)
        .then(imageUrl => convertImageToBase64(imageUrl))
        .then(base64data => {
          const post = {
            imageUrl: base64data,
            title,
            content,
            favorited: false
          };
          addPost(post);
          hideLoading();
        })
        .catch(() => {
          const fallbackPost = {
            imageUrl: "images/trump-profile.png",
            title,
            content,
            favorited: false
          };
          addPost(fallbackPost);
          hideLoading();
        });
    });
}

function searchWikipediaAndFetchImage(lang, searchTerm) {
  const searchUrl = `https://${lang}.wikipedia.org/w/api.php?action=query&format=json&list=search&srsearch=${encodeURIComponent(searchTerm)}`;
  const proxySearchUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(searchUrl)}`;

  return fetch(proxySearchUrl)
    .then(response => response.json())
    .then(data => {
      const result = data.query.search[0];
      if (!result) throw new Error("No search result");
      return fetchImagesFromWikipediaPage(lang, result.title);
    });
}

function fetchImagesFromWikipediaPage(lang, pageTitle) {
  const pageUrl = `https://${lang}.wikipedia.org/w/api.php?action=query&format=json&prop=images&titles=${encodeURIComponent(pageTitle)}`;
  const proxyPageUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(pageUrl)}`;

  return fetch(proxyPageUrl)
    .then(response => response.json())
    .then(data => {
      const page = Object.values(data.query.pages)[0];
      const imageTitle = page.images.find(img => /\.(jpg|jpeg|png|svg)$/i.test(img.title))?.title;
      if (!imageTitle) throw new Error("No suitable image found");

      const imageInfoUrl = `https://${lang}.wikipedia.org/w/api.php?action=query&format=json&prop=imageinfo&iiprop=url&titles=${encodeURIComponent(imageTitle)}`;
      const proxyImageInfoUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(imageInfoUrl)}`;

      return fetch(proxyImageInfoUrl)
        .then(res => res.json())
        .then(imageData => {
          const filePage = Object.values(imageData.query.pages)[0];
          return filePage.imageinfo[0].url;
        });
    });
}

// For saving to localStorage
function convertImageToBase64(imageUrl) {
  return fetch(imageUrl)
    .then(res => res.blob())
    .then(blob => new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    }));
}

// Reduce image to smaller size
function compressImage(file, scale, callback) {
  const reader = new FileReader();
  reader.onload = (e) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const canvasRender = canvas.getContext('2d');
      
      const newWidth = img.width * scale;
      const newHeight = img.height * scale;
      
      canvas.width = newWidth;
      canvas.height = newHeight;
      
      canvasRender.drawImage(img, 0, 0, newWidth, newHeight);
      
      // 50% image quality
      const compressedBase64 = canvas.toDataURL('image/jpeg', 0.5);
      callback(compressedBase64);
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}



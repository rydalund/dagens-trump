export function initFakeNewsForm() {
  const headerContainer = document.querySelector("header .container .d-flex");

  const wrapper = document.createElement("div");
  wrapper.className = "ms-md-3 mt-3 mt-md-0";

  const form = document.createElement("form");
  form.id = "fakeNewsForm";
  form.className = "bg-secondary p-3 rounded text-white";
  form.style.minWidth = "250px";

  const heading = document.createElement("h6");
  heading.textContent = "Skapa fake news 😅";
  form.appendChild(heading);

  const selectType = document.createElement("select");
  selectType.id = "postType";
  selectType.className = "form-select form-select-sm mb-2";
  selectType.innerHTML = `
    <option selected disabled>Välj typ</option>
    <option value="instagram">Instagram</option>
    <option value="truth">Truth Social</option>
  `;
  form.appendChild(selectType);

  const titleInput = document.createElement("input");
  titleInput.id = "title";
  titleInput.className = "form-control form-control-sm mb-2";
  titleInput.placeholder = "Titel";
  titleInput.required = true;
  form.appendChild(titleInput);

  const contentInput = document.createElement("textarea");
  contentInput.id = "content";
  contentInput.className = "form-control form-control-sm mb-2";
  contentInput.placeholder = "Innehåll";
  contentInput.rows = 2;
  contentInput.required = true;
  form.appendChild(contentInput);

  // Bildval, kanske generera med OpenAI DALL·E, Replicate, Stability AI, sökning kanske med Unsplash API eller Bing Image Search API
  const imageOptions = document.createElement("div");
  imageOptions.id = "imageOptions";
  imageOptions.className = "mb-2 d-none";

  const imageChoice = document.createElement("select");
  imageChoice.id = "imageChoice";
  imageChoice.className = "form-select form-select-sm";
  imageChoice.innerHTML = `
    <option selected disabled>Välj bildkälla</option>
    <option value="ai">Generera AI-bild</option>
    <option value="search">Sök bild</option>
    <option value="upload">Ladda upp bild</option>
  `;
  imageOptions.appendChild(imageChoice);

  const imageUpload = document.createElement("input");
  imageUpload.id = "imageUpload";
  imageUpload.className = "form-control form-control-sm mt-2 d-none";
  imageUpload.type = "file";
  imageUpload.accept = "image/*";
  imageOptions.appendChild(imageUpload);

  form.appendChild(imageOptions);

  const submitBtn = document.createElement("button");
  submitBtn.type = "submit";
  submitBtn.className = "btn btn-light btn-sm mt-2 w-100";
  submitBtn.textContent = "Skapa";
  form.appendChild(submitBtn);

  wrapper.appendChild(form);
  headerContainer.appendChild(wrapper);

  selectType.addEventListener("change", () => {
    if (selectType.value === "instagram") {
      imageOptions.classList.remove("d-none");
    } else {
      imageOptions.classList.add("d-none");
    }
  });

  imageChoice.addEventListener("change", () => {
    imageUpload.classList.toggle("d-none", imageChoice.value !== "upload");
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const type = selectType.value;
    const title = titleInput.value;
    const content = contentInput.value;

    if (type === "instagram") {
      createInstagramPost(title, content);
    } else if (type === "truth") {
      createTruthPost(title, content);
    }

    form.reset();
    imageOptions.classList.add("d-none");
    imageUpload.classList.add("d-none");
  });

  function createInstagramPost(title, content) {
    const container = document.getElementById("instagramContainer");
    const card = document.createElement("div");
    card.className = "social-card";

    card.innerHTML = `
      <img src="images/trump-profile.png" class="img-fluid" alt="Fake Trump image">
      <div class="social-card-body">
        <p class="post-username">@realDonaldTrump</p>
        <p class="post-tags">${title}</p>
        <p class="post-likes"><i class="bi bi-heart-fill"></i> 100k likes</p>
        <p class="text-muted small">${content}</p>
      </div>
    `;

    container.prepend(card); // Nyast först
  }

  function createTruthPost(title, content) {
    const aside = document.querySelector(".truth-feed");

    const wrapper = document.createElement("a");
    wrapper.href = "#";
    wrapper.className = "truth-post-link";

    wrapper.innerHTML = `
      <div class="truth-post">
        <div class="truth-header">
          <img src="images/trump-profile.png" alt="Trump profile" class="truth-avatar" />
          <div>
            <strong>Donald J. Trump</strong><br />
            <span class="truth-handle">@realDonaldTrump • Just nu</span>
          </div>
        </div>
        <p><strong>${title}</strong><br>${content}</p>
      </div>
    `;

    aside.prepend(wrapper);
  }
}

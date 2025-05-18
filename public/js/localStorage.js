import { instagramData } from "./feed.js"; //Basic Instagram-posts (will later be real posts)
import { showToast } from "./dom.js";

export function initLocalStorage() {
  // Checks ocalStorage
  const instagramList = localStorage.getItem("instagramList");

  if (!instagramList) {
    // If the list does not exist, it will be init
    initBasicInstagramList();
  } else {
    // Chesck if the list is empty (as of you delete every post), and then removes it and replaces with new
    const parsedList = JSON.parse(instagramList);
    if (parsedList.length === 0) {
      localStorage.removeItem("instagramList");
      initBasicInstagramList();
    }
  }
}

export function initBasicInstagramList() {
  saveInstagramList(instagramData);
}

export function getInstagramList() {
  const list = localStorage.getItem("instagramList");
  return list ? JSON.parse(list) : [];
}

export function saveInstagramList(posts) {
  localStorage.setItem("instagramList", JSON.stringify(posts));
}

export function addPost(post) {
  const posts = getInstagramList();
  posts.push(post);
  saveInstagramList(posts);
  renderInstagramList();
}

export function deletePost(index) {
  const posts = getInstagramList();
  posts.splice(index, 1);
  saveInstagramList(posts);
  renderInstagramList();
  showToast(`Inlägget har tagits bort! 😔`, "warning");
}

export function toggleFavorite(index) {
  const posts = getInstagramList();
  posts[index].favorited = !posts[index].favorited;
  saveInstagramList(posts);
  renderInstagramList();
}

export function renderInstagramList() {
  const container = document.getElementById("instagramContainer");
  container.innerHTML = "";

  const posts = getInstagramList();

  posts.forEach((post, index) => {
    const card = document.createElement("div");
    card.className = "social-card";

    // Image
    const image = new Image();
    image.src = post.imageUrl;
    image.alt = post.title;
    image.title = post.title;
    image.classList.add("img-fluid");
    card.appendChild(image);

    // Content
    const body = document.createElement("div");
    body.className = "social-card-body";
    body.innerHTML = `
      <p class="post-username">@realDonaldTrump</p>
      <p class="post-tags">${post.title}</p>
      <p class="text-muted small">${post.content}</p>
    `;
    card.appendChild(body);

    // Footer with icons for like, delete
    const footer = document.createElement("div");
    footer.className = "social-card-footer";

    const trash = document.createElement("i");
    trash.className = "bi bi-trash";
    trash.style.cursor = "pointer";
    trash.addEventListener("click", () => deletePost(index));

    const heart = document.createElement("i");
    heart.className = post.favorited ? "bi bi-heart-fill" : "bi bi-heart";
    heart.style.cursor = "pointer";
    heart.addEventListener("click", () => toggleFavorite(index));

    footer.appendChild(trash);
    footer.appendChild(heart);
    card.appendChild(footer);

    container.prepend(card);
  });
}
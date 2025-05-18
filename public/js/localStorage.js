import { instagramData } from "./feed.js"; //Basic Instagram-posts (will later be real posts)
import { showToast } from "./dom.js";

let currentCommentIndex = null; //For keeping track of comments

// Checks localStorage, if the list does not exist, it will be init
export function initLocalStorage() {
  const instagramList = localStorage.getItem("instagramList");

  if (!instagramList) {
    initBasicInstagramList();
  } else {

    // Check if the list is empty (as of you delete every post), and then removes it and replaces with new
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

//Main method for rendering Instagram posts
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

    // Comments
    if (post.comment) {
      const commentPara = document.createElement("p");
      commentPara.className = "comment-text text-muted small fst-italic mb-2";
      commentPara.textContent = `"${post.comment}"`;
      card.appendChild(commentPara);
    }

    // Footer with icons
    const footer = document.createElement("div");
    footer.className = "social-card-footer d-flex justify-content-between align-items-center px-3 pb-2";

    // Trash icon (left)
    const trash = document.createElement("i");
    trash.className = "bi bi-trash text-danger";
    trash.style.cursor = "pointer";
    trash.title = "Ta bort"
    trash.addEventListener("click", () => deletePost(index));
    footer.appendChild(trash);

    // Comment icon (middle)
    const commentBtn = document.createElement("button");
    commentBtn.className = "btn btn-link btn-sm text-primary p-0";
    commentBtn.textContent = "💬";
    commentBtn.title = "Kommentera";
    commentBtn.addEventListener("click", () => {
      currentCommentIndex = index;
      const modal = new bootstrap.Modal(document.getElementById("commentModal"));
      modal.show();
    });
    footer.appendChild(commentBtn);

    // Heart/save icon (right)
    const heart = document.createElement("i");
    heart.className = post.favorited ? "bi bi-heart-fill text-danger" : "bi bi-heart"; 
    heart.style.cursor = "pointer";
    heart.title = post.favorited ? "Ta bort från favoriter" : "Spara som favorit"; //Changes title for "hover"
    heart.addEventListener("click", () => toggleFavorite(index));
    footer.appendChild(heart);

    card.appendChild(footer);
    container.prepend(card);
  });
}

//From modal
document.getElementById("saveCommentBtn").addEventListener("click", () => {
  const commentInput = document.getElementById("commentInput");
  const commentText = commentInput.value.trim();

  if (commentText.length > 25) {
    showToast("Kommentaren får max vara 25 tecken.", "warning");
    return;
  }

  if (commentText && currentCommentIndex !== null) {
    const posts = getInstagramList();
    posts[currentCommentIndex].comment = commentText;
    saveInstagramList(posts);
    renderInstagramList();
    currentCommentIndex = null;
    commentInput.value = "";
    const modal = bootstrap.Modal.getInstance(document.getElementById("commentModal"));
    modal.hide();
    showToast("Kommentar sparad!", "success");
  }
});
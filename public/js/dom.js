//For date
export function displayCurrentDate() {
  const dateElement = document.getElementById('current-date');
  const today = new Date();

  const weekdayNames = ['Söndag', 'Måndag', 'Tisdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lördag'];
  const monthNames = [
    'januari', 'februari', 'mars', 'april', 'maj', 'juni',
    'juli', 'augusti', 'september', 'oktober', 'november', 'december'
  ];

  const formattedDate = `${weekdayNames[today.getDay()]} ${today.getDate()} ${monthNames[today.getMonth()]} ${today.getFullYear()}`;

  if (dateElement) {
    dateElement.textContent = formattedDate;
  }
}

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

export function showToast(message, type = "info") {
  const toastContainer = document.getElementById("toastContainer");

  const toastEl = document.createElement("div");
  toastEl.className = `toast align-items-center text-bg-${type} border-0 show mb-2`;
  toastEl.setAttribute("role", "alert");
  toastEl.setAttribute("aria-live", "assertive");
  toastEl.setAttribute("aria-atomic", "true");

  toastEl.innerHTML = `
    <div class="d-flex">
      <div class="toast-body">${message}</div>
      <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Stäng"></button>
    </div>
  `;

  toastContainer.appendChild(toastEl);

  // Auto-remove after 3s
  setTimeout(() => {
    toastEl.classList.remove("show");
    toastEl.addEventListener("transitionend", () => toastEl.remove());
  }, 3000);
}

export function showLoading() {
  document.getElementById("loadingSpinner").style.display = "block";
}

export function hideLoading() {
  document.getElementById("loadingSpinner").style.display = "none";
  
  // Toast when loading is done
  showToast("Laddningen är klar! 🥳", "success");
}
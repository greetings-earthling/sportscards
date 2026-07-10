let currentPage = 0;

function updatePage() {
  const page = pages[currentPage];

  document.getElementById("binderImage").src = page.image;
  document.getElementById("pageNumber").innerText =
    `Page ${currentPage + 1} of ${pages.length}`;

  const stickerLayer = document.getElementById("stickerLayer");
  stickerLayer.innerHTML = "";

  page.stickers.forEach(sticker => {
    const div = document.createElement("div");
    div.className = `sticker ${sticker.class}`;

    if (sticker.color) div.classList.add(sticker.color);

    div.innerText = sticker.text;

    div.addEventListener("click", e => {
      e.stopPropagation();
      div.classList.toggle("hidden");
    });

    stickerLayer.appendChild(div);
  });
}

function nextPage() {
  if (currentPage < pages.length - 1) {
    currentPage++;
    updatePage();
  }
}

function prevPage() {
  if (currentPage > 0) {
    currentPage--;
    updatePage();
  }
}

updatePage();

document.getElementById("binderImage").onclick = function () {
  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightboxImage");

  lightboxImage.src = this.src;
  lightbox.style.display = "flex";
};

document.getElementById("lightbox").onclick = function () {
  this.style.display = "none";
};

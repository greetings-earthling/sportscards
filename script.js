let currentPage = 0;

function updatePage() {
  const page = pages[currentPage];

  document.getElementById("binderImage").src = page.image;
  document.getElementById("pageNumber").innerText = `Page ${currentPage + 1} of ${pages.length}`;

  const stickerLayer = document.getElementById("stickerLayer");
  stickerLayer.innerHTML = "";

  page.stickers.forEach(sticker => {

  const div = document.createElement("div");

  div.className = `sticker ${sticker.class}`;

  if (sticker.color) {

    div.classList.add(sticker.color);

  }

  div.innerText = sticker.text;

  div.addEventListener("click", () => {

    div.classList.toggle("hidden");

  });

  stickerLayer.appendChild(div);

});

  makeStickersDraggable();
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

const binderImage = document.getElementById("binderImage");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");

binderImage.addEventListener("click", () => {
  lightboxImage.src = binderImage.src;
  lightbox.style.display = "block";
});

lightbox.addEventListener("click", () => {
  lightbox.style.display = "none";
});

function makeStickersDraggable() {
  document.querySelectorAll(".sticker").forEach(sticker => {
    sticker.onpointerdown = e => {
      sticker.setPointerCapture(e.pointerId);

      const startX = e.clientX;
      const startY = e.clientY;
      const startLeft = sticker.offsetLeft;
      const startTop = sticker.offsetTop;

      sticker.onpointermove = e => {
        sticker.style.left = startLeft + (e.clientX - startX) + "px";
        sticker.style.top = startTop + (e.clientY - startY) + "px";
        sticker.style.right = "auto";
        sticker.style.bottom = "auto";
      };

      sticker.onpointerup = () => {
        sticker.onpointermove = null;
      };
    };
  });
}

updatePage();

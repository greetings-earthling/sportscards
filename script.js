let currentPage = 0;
let wantList = JSON.parse(localStorage.getItem("wantList")) || [];

function updatePage() {
  const page = pages[currentPage];

  document.getElementById("binderImage").src = page.image;
  document.getElementById("pageNumber").innerText =
    `Page ${currentPage + 1} of ${pages.length}`;

  const stickerLayer = document.getElementById("stickerLayer");
  const cardLayer = document.getElementById("cardLayer");

  stickerLayer.innerHTML = "";
  cardLayer.innerHTML = "";

  page.stickers.forEach(sticker => {
    const div = document.createElement("div");
    div.className = `sticker ${sticker.class}`;

    if (sticker.color) {
      div.classList.add(sticker.color);
    }

    div.innerText = sticker.text;

    div.addEventListener("click", e => {
      e.stopPropagation();
      div.classList.toggle("hidden");
    });

    stickerLayer.appendChild(div);
  });

  page.cards.forEach(card => {
    const div = document.createElement("div");
    div.className = `card-hit ${card.class}`;

    div.addEventListener("click", e => {
      e.stopPropagation();
      addToWantList(card.name);
    });

    cardLayer.appendChild(div);
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

function zoomPage() {

  const lightbox = document.getElementById("lightbox");

  const lightboxImage = document.getElementById("lightboxImage");

  lightboxImage.src = pages[currentPage].image;

  lightbox.style.display = "block";

  lightbox.scrollTop = 0;

  lightbox.scrollLeft = 0;

}

document.getElementById("lightbox").onclick = function () {
  this.style.display = "none";
};

function addToWantList(cardName) {
  if (!wantList.includes(cardName)) {
    wantList.push(cardName);
    saveWantList();
  }
}

function removeFromWantList(cardName) {
  wantList = wantList.filter(item => item !== cardName);
  saveWantList();
}

function saveWantList() {
  localStorage.setItem("wantList", JSON.stringify(wantList));
  renderWantList();
}

function renderWantList() {
  const list = document.getElementById("wantListItems");

  if (wantList.length === 0) {
    list.innerHTML = "No cards added yet.";
    return;
  }

  list.innerHTML = "";

  wantList.forEach(item => {
    const div = document.createElement("div");
    div.className = "want-item";

    div.innerHTML = `
      ${item}
      <button onclick="removeFromWantList('${item}')">Remove</button>
    `;

    list.appendChild(div);
  });
}

function copyWantList() {
  if (wantList.length === 0) return;

  const text =
    "Interested in:\n\n" +
    wantList.map(item => `- ${item}`).join("\n");

  navigator.clipboard.writeText(text);
  alert("Want List copied.");
}

function clearWantList() {
  wantList = [];
  saveWantList();
}

updatePage();
renderWantList();

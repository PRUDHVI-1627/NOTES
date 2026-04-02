const container = document.getElementById("notesContainer");
const createBtn = document.getElementById("createBtn");
const KEY = "my_notes";

function save() {
  const data = [...container.querySelectorAll(".input-box")].map(box => {
    const clone = box.cloneNode(true);
    clone.querySelector(".card-footer")?.remove();
    return clone.innerHTML.trim();
  });
  localStorage.setItem(KEY, JSON.stringify(data));
  renderEmpty();
}

function renderEmpty() {
  container.querySelector(".empty")?.remove();
  if (!container.querySelector(".input-box")) {
    container.innerHTML = `
      <div class="empty">
        <div class="empty-icon">🗒️</div>
        No notes yet — hit Create Note!
      </div>`;
  }
}

function makeCard(html = "") {
  const card = document.createElement("div");
  card.className = "input-box";
  card.contentEditable = "true";
  if (html) card.innerHTML = html;

  const footer = document.createElement("div");
  footer.className = "card-footer";
  footer.contentEditable = "false";

  const del = document.createElement("button");
  del.className = "delete-btn";
  del.title = "Delete";
  del.textContent = "🗑";
  del.addEventListener("click", () => {
    card.style.transition = "opacity 0.15s, transform 0.15s";
    card.style.opacity = "0";
    card.style.transform = "scale(0.93)";
    setTimeout(() => { card.remove(); save(); }, 150);
  });

  footer.appendChild(del);
  card.appendChild(footer);

  card.addEventListener("keyup", save);
  card.addEventListener("keydown", e => {
    if (e.key === "Enter") {
      document.execCommand("insertLineBreak");
      e.preventDefault();
    }
  });

  return card;
}

createBtn.addEventListener("click", () => {
  container.querySelector(".empty")?.remove();
  const card = makeCard();
  container.prepend(card);
  card.focus();
  save();
});

// load saved notes on startup
try {
  const saved = JSON.parse(localStorage.getItem(KEY) || "[]");
  saved.forEach(html => container.appendChild(makeCard(html)));
} catch {
  localStorage.removeItem(KEY);
}

renderEmpty();
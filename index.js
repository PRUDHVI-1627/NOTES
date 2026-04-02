const container = document.getElementById("notesContainer");
const createBtn = document.getElementById("createBtn");
const countLabel = document.getElementById("countLabel");
const KEY = "my_notes_v2";
const DOTS = ["#e05252", "#52b0e0", "#52e08a", "#e0a852", "#a852e0", "#e05295"];

function updateCount() {
  const n = container.querySelectorAll(".input-box").length;
  countLabel.textContent = n === 0 ? "— 0 notes" : "— " + n + " note" + (n > 1 ? "s" : "");
}

function save() {
  const data = [];
  container.querySelectorAll(".input-box").forEach(box => {
    const clone = box.cloneNode(true);
    clone.querySelectorAll(".delete-btn, .card-dot").forEach(el => el.remove());
    data.push({ html: clone.innerHTML.trim(), color: box.dataset.color });
  });
  localStorage.setItem(KEY, JSON.stringify(data));
  updateCount();
  renderEmpty();
}

function renderEmpty() {
  const existing = container.querySelector(".empty-state");
  const hasCards = container.querySelectorAll(".input-box").length > 0;
  if (!hasCards && !existing) {
    const el = document.createElement("div");
    el.className = "empty-state";
    el.innerHTML = '<span class="big">nothing here yet ✏️</span><span class="small">hit "+ new note" to start writing</span>';
    container.appendChild(el);
  } else if (hasCards && existing) {
    existing.remove();
  }
}

function makeCard(html, colorDot, prepend) {
  const box = document.createElement("div");
  box.className = "input-box";
  box.setAttribute("contenteditable", "true");

  const idx = container.querySelectorAll(".input-box").length;
  const color = colorDot || DOTS[idx % DOTS.length];
  box.dataset.color = color;

  // colored dot
  const dot = document.createElement("span");
  dot.className = "card-dot";
  dot.setAttribute("contenteditable", "false");
  dot.style.background = color;
  box.appendChild(dot);

  if (html) box.innerHTML += html;

  // delete button
  const del = document.createElement("button");
  del.className = "delete-btn";
  del.setAttribute("contenteditable", "false");
  del.textContent = "delete";
  del.addEventListener("click", () => {
    box.style.transition = "opacity 0.15s, transform 0.15s";
    box.style.opacity = "0";
    box.style.transform += " scale(0.95)";
    setTimeout(() => { box.remove(); save(); }, 150);
  });
  box.appendChild(del);

  box.addEventListener("keyup", save);
  box.addEventListener("keydown", e => {
    if (e.key === "Enter") {
      document.execCommand("insertLineBreak");
      e.preventDefault();
    }
  });

  if (prepend && container.firstChild) container.insertBefore(box, container.firstChild);
  else container.appendChild(box);

  return box;
}

createBtn.addEventListener("click", () => {
  container.querySelector(".empty-state")?.remove();
  const card = makeCard("", null, true);
  updateCount();
  save();
  requestAnimationFrame(() => card.focus());
});

// load saved notes on startup
try {
  const raw = localStorage.getItem(KEY);
  if (raw) JSON.parse(raw).forEach(({ html, color }) => makeCard(html, color, false));
} catch (e) {
  localStorage.removeItem(KEY);
}

updateCount();
renderEmpty();
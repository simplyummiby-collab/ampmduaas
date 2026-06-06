let currentMode = "Morning";
let currentList = [];
let currentIndex = 0;
let atEnd = false;
let startX = 0;
let endX = 0;

const screens = {
  home: document.getElementById("home"),
  intro: document.getElementById("intro"),
  reader: document.getElementById("reader"),
};

function cleanFirstLine(text) {
  if (!text) return "";

  const firstLine = text
    .split("\n")
    .map(line => line.replace(/^\s*\d+\.\s*/, "").trim())
    .find(Boolean) || "";

  if (!firstLine) return "";
  return firstLine.endsWith("...") || firstLine.endsWith("…") ? firstLine : `${firstLine}...`;
}

function getDisplayTitle(item, index) {
  return `Duaa ${index + 1}`;
}

function showScreen(name) {
  Object.values(screens).forEach(screen => screen.classList.remove("active"));
  screens[name].classList.add("active");
}

function getList(mode) {
  return DUAA_DATA.filter(item => item.time.includes(mode));
}

function beginReader(mode) {
  currentMode = mode || currentMode;
  currentList = getList(currentMode);
  currentIndex = 0;
  atEnd = false;

  renderCard();
  showScreen("reader");
}

function updateProgress() {
  const total = currentList.length || 1;
  const shown = atEnd ? total : Math.min(currentIndex + 1, total);
  const fill = document.getElementById("progressFill");

  if (fill) {
    fill.style.width = `${Math.round((shown / total) * 100)}%`;
  }
}

function setNavState() {
  const onFirst = currentIndex === 0 && !atEnd;
  const onEnd = atEnd;

  ["prevBtn", "topPrevBtn", "sidePrevBtn"].forEach(id => {
    const btn = document.getElementById(id);
    if (btn) btn.disabled = onFirst;
  });

  ["nextBtn", "topNextBtn", "sideNextBtn"].forEach(id => {
    const btn = document.getElementById(id);
    if (btn) btn.disabled = onEnd;
  });
}

function showDuaaCard() {
  document.getElementById("card").hidden = false;
  document.getElementById("endCard").hidden = true;
}

function showEndCard() {
  atEnd = true;

  const card = document.getElementById("endCard");

  document.getElementById("card").hidden = true;
  card.hidden = false;

  document.getElementById("currentIndex").textContent = currentList.length;
  document.getElementById("totalCount").textContent = currentList.length;
  document.getElementById("endEyebrow").textContent = `${currentMode} set complete`;
  document.getElementById("endTitle").textContent = `End of ${currentMode} Adhkar`;
  document.getElementById("endText").textContent = "You have reached the end of this set.";

  updateProgress();
  setNavState();
}

function renderCard() {
  atEnd = false;
  showDuaaCard();

  const item = currentList[currentIndex];

  if (!item) {
    showEndCard();
    return;
  }

  document.getElementById("currentIndex").textContent = currentIndex + 1;
  document.getElementById("totalCount").textContent = currentList.length;

  document.getElementById("cardTime").textContent =
    currentMode === "Morning" ? "🌅 Morning Adhkar" : "🌙 Evening Adhkar";

  document.getElementById("cardTitle").textContent = getDisplayTitle(item, currentIndex);
  document.getElementById("cardSummary").textContent = item.summary || "A short reminder from this duaa";
  document.getElementById("cardSubtitle").textContent = cleanFirstLine(item.english);
  document.getElementById("countBadge").textContent = `🔁 Number of times: ${item.count || "Not specified"}`;
  document.getElementById("arabicText").textContent = item.arabic || "Arabic not added yet.";
  document.getElementById("englishText").textContent = item.english || "";

  const transliterationWrap = document.getElementById("transliterationWrap");
  const transliterationText = document.getElementById("transliterationText");

  if (item.transliteration && item.transliteration.trim()) {
    transliterationWrap.hidden = false;
    transliterationText.textContent = item.transliteration;
  } else {
    transliterationWrap.hidden = true;
    transliterationText.textContent = "";
  }

  const virtueBox = document.getElementById("virtueBox");
  const virtueText = document.getElementById("virtueText");

  if (item.virtues && item.virtues.trim()) {
    virtueBox.style.display = "block";
    virtueText.textContent = item.virtues;
  } else {
    virtueBox.style.display = "none";
  }

  const content = document.querySelector("#card .card-content");
  if (content) content.scrollTop = 0;

  updateProgress();
  setNavState();
}

function nextCard() {
  if (!currentList.length || atEnd) return;

  if (currentIndex >= currentList.length - 1) {
    showEndCard();
    return;
  }

  currentIndex += 1;
  renderCard();
}

function prevCard() {
  if (!currentList.length) return;

  if (atEnd) {
    currentIndex = currentList.length - 1;
    renderCard();
    return;
  }

  if (currentIndex <= 0) return;

  currentIndex -= 1;
  renderCard();
}

function goHome() {
  showScreen("home");

  if (location.hash) {
    history.pushState({ screen: "home" }, "", window.location.pathname);
  }
}

/* Home buttons go straight to reader */
document.querySelectorAll("[data-start]").forEach(button => {
  button.addEventListener("click", () => {
    history.pushState({ screen: "reader" }, "", "#reader");
    beginReader(button.dataset.start);
  });
});

/* In-app Home buttons */
document.querySelectorAll("[data-home]").forEach(button => {
  button.addEventListener("click", goHome);
});

/* Browser back button */
window.addEventListener("popstate", () => {
  showScreen("home");
});

const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");
const topNextBtn = document.getElementById("topNextBtn");
const topPrevBtn = document.getElementById("topPrevBtn");
const sideNextBtn = document.getElementById("sideNextBtn");
const sidePrevBtn = document.getElementById("sidePrevBtn");
const reader = document.getElementById("reader");

if (nextBtn) nextBtn.addEventListener("click", nextCard);
if (prevBtn) prevBtn.addEventListener("click", prevCard);
if (topNextBtn) topNextBtn.addEventListener("click", nextCard);
if (topPrevBtn) topPrevBtn.addEventListener("click", prevCard);
if (sideNextBtn) sideNextBtn.addEventListener("click", nextCard);
if (sidePrevBtn) sidePrevBtn.addEventListener("click", prevCard);

document.addEventListener("keydown", event => {
  if (!screens.reader.classList.contains("active")) return;

  if (event.key === "ArrowRight") nextCard();
  if (event.key === "ArrowLeft") prevCard();
  if (event.key === "Escape") goHome();
});

if (reader) {
  reader.addEventListener("touchstart", event => {
    startX = event.changedTouches[0].screenX;
  }, { passive: true });

  reader.addEventListener("touchend", event => {
    endX = event.changedTouches[0].screenX;

    const diff = endX - startX;

    if (Math.abs(diff) < 45) return;

    if (diff < 0) nextCard();
    else prevCard();
  }, { passive: true });
}

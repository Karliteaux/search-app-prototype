/**
 * Columbia search prototype - typing + autocomplete animation.
 *
 * Cycles through a list of search queries. For each query it:
 *  1) types the term into the input, character by character
 *  2) waits, then opens a dropdown of related suggestions
 *  3) holds, then clears the input and moves to the next term
 *
 * If the user focuses the input, the auto-demo pauses so they can try it.
 */

const queries = [
  {
    term: "Admissions",
    suggestions: [
      "Undergraduate admissions",
      "Graduate admissions",
      "Admissions requirements",
      "Application deadlines",
      "Financial aid & scholarships",
      "Campus tours",
      "Transfer students",
      "International students",
    ],
  },
  {
    term: "Requirements",
    suggestions: [
      "Prerequisite requirements",
      "Graduation requirements",
      "Core curriculum",
      "Language requirements",
      "Major declaration",
      "Residency requirements",
      "Transfer credit policy",
      "Degree audit",
    ],
  },
  {
    term: "Research",
    suggestions: [
      "Research centers & institutes",
      "Undergraduate research",
      "Funding & grants",
      "Office of Research",
      "Data Science Institute",
      "Earth Institute",
      "Lab opportunities",
      "Publications portal",
    ],
  },
  {
    term: "Recents",
    suggestions: [
      "Recent news",
      "Recent events",
      "Recent publications",
      "Recently viewed programs",
      "Recent announcements",
      "Recent lectures",
      "Recent awards",
      "Recent alumni spotlights",
    ],
  },
];

const TYPE_SPEED_MS = 90;       // per character
const ERASE_SPEED_MS = 40;      // per character when clearing
const HOLD_BEFORE_DROPDOWN = 500;
const HOLD_WITH_DROPDOWN = 2200;
const PAUSE_BETWEEN_QUERIES = 600;

const input = document.getElementById("searchInput");
const box = document.getElementById("searchBox");
const list = document.getElementById("suggestions");

let paused = false;

input.addEventListener("focus", () => { paused = true; hideSuggestions(); });
input.addEventListener("blur", () => {
  if (!input.value) { paused = false; runDemo(); }
});

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function typeText(text) {
  for (let i = 0; i < text.length; i++) {
    if (paused) return;
    input.value = text.slice(0, i + 1);
    await sleep(TYPE_SPEED_MS);
  }
}

async function eraseText() {
  while (input.value.length > 0) {
    if (paused) return;
    input.value = input.value.slice(0, -1);
    await sleep(ERASE_SPEED_MS);
  }
}

function showSuggestions(items) {
  list.innerHTML = "";
  items.forEach((text, idx) => {
    const li = document.createElement("li");
    li.textContent = text;
    li.style.animationDelay = `${idx * 35}ms`;
    li.addEventListener("mousedown", (e) => {
      e.preventDefault();
      input.value = text;
      hideSuggestions();
    });
    list.appendChild(li);
  });
  list.hidden = false;
  // force reflow so the transition applies
  void list.offsetHeight;
  box.classList.add("has-suggestions");
}

function hideSuggestions() {
  box.classList.remove("has-suggestions");
  list.hidden = true;
}

async function runDemo() {
  let i = 0;
  while (!paused) {
    const { term, suggestions } = queries[i % queries.length];

    hideSuggestions();
    await typeText(term);
    if (paused) return;

    await sleep(HOLD_BEFORE_DROPDOWN);
    if (paused) return;

    showSuggestions(suggestions);
    await sleep(HOLD_WITH_DROPDOWN);
    if (paused) return;

    hideSuggestions();
    await sleep(250);
    await eraseText();
    if (paused) return;

    await sleep(PAUSE_BETWEEN_QUERIES);
    i++;
  }
}

// Kick off once the DOM is ready.
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", runDemo);
} else {
  runDemo();
}

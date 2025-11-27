// 1. Your data: replace this with your full list of ~6000 items.
// Each item: { text: "Some string", code: 1234 }
const data = [
  { text: "Apple", code: 1001 },
  { text: "Banana", code: 1002 },
  { text: "Cherry", code: 1003 },
  { text: "Pineapple", code: 1004 },
  { text: "Grapefruit", code: 1005 },
  // ... up to 6000 items
];

fetch("venom.tsv").then((response) => {
	return (response.text())
}).then((text) => {
				const newData = []
								console.log(text)
								text.split("\n").foreach((line) => {
												newData.push({ line: line })
								})	
								console.log(newData)
})

// 2. Precompute lowercased text to make substring search fast
const normalizedData = data.map((item) => ({
  ...item,
  lowerText: item.text.toLowerCase(),
}));

const searchInput = document.getElementById("searchInput");
const resultsEl = document.getElementById("results");
const selectedEl = document.getElementById("selected");

const MAX_RESULTS = 50; // Limit displayed matches for performance and UX

function renderResults(matches) {
  resultsEl.innerHTML = "";

  if (matches.length === 0) {
    if (searchInput.value.trim() !== "") {
      resultsEl.textContent = "No matches found.";
    }
    return;
  }

  matches.forEach((item) => {
    const div = document.createElement("div");
    div.className = "result-item";

    const textSpan = document.createElement("span");
    textSpan.className = "result-text";
    textSpan.textContent = item.text;

    const codeSpan = document.createElement("span");
    codeSpan.className = "result-code";
    codeSpan.textContent = item.code;

    div.appendChild(textSpan);
    div.appendChild(codeSpan);

    // Click to "select" this item
    div.addEventListener("click", () => {
      selectedEl.textContent = `Selected: "${item.text}" → Code: ${item.code}`;
    });

    resultsEl.appendChild(div);
  });
}

function handleSearch() {
  const query = searchInput.value.trim().toLowerCase();

  selectedEl.textContent = ""; // Clear previous selection

  if (!query) {
    resultsEl.innerHTML = "";
    return;
  }

  // 3. Substring search: item.lowerText contains query
  const matches = [];
  for (let i = 0; i < normalizedData.length; i++) {
    if (normalizedData[i].lowerText.includes(query)) {
      matches.push(normalizedData[i]);
      if (matches.length >= MAX_RESULTS) break; // stop once we hit the cap
    }
  }

  renderResults(matches);
}

// 4. Hook up the input event
searchInput.addEventListener("input", handleSearch);

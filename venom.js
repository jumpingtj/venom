fetch("venom_codes.txt")
  .then((response) => {
    return response.text();
  })
  .then((text) => {
    const newData = [];
    console.log(text.split("\n"));
    text
      .split("\n")
      .filter((line) => line != 0)
      .forEach((line) => {
        const split = line.split("\t");
        newData.push({
          text: split[1],
          code: Number(split[0]),
          lowerText: split[1].toLowerCase(),
        });
      });
    console.log(newData);
    data = newData;
  });

const searchInput = document.getElementById("searchInput");
const resultsEl = document.getElementById("results");
const selectedEl = document.getElementById("selected");

const MAX_RESULTS = 50;

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

  const matches = [];
  for (let i = 0; i < data.length; i++) {
    if (data[i].lowerText.includes(query)) {
      matches.push(data[i]);
      if (matches.length >= MAX_RESULTS) break; // stop once we hit the cap
    }
  }

  renderResults(matches);
}

searchInput.addEventListener("input", handleSearch);

let snippets = [];

function renderSnippets(snippetsToRender = snippets) {
  const snippetList = document.getElementById("snippetList");
  snippetList.innerHTML = "";
  snippetsToRender.forEach((snippet, index) => {
    const snippetItem = document.createElement("div");
    snippetItem.classList.add("snippet");
    snippetItem.innerHTML = `
        <h3>${snippet.title}</h3>
        <div class="code-container"><pre class="code"></pre></div>
        <i class="fas fa-clipboard copy-icon" onclick="copyCode(${index})"></i>
      `;
    snippetItem.querySelector(".code").innerText = snippet.code; // Setting code using innerText
    snippetList.appendChild(snippetItem);
  });
}

function addSnippet() {
  const title = prompt("Enter snippet title:");
  if (!title) return;

  const code = prompt("Enter snippet code:");
  if (!code) return;

  const snippet = { title, code };
  snippets.push(snippet);
  renderSnippets();
}

function copyCode(index) {
  const codeToCopy = snippets[index].code;
  navigator.clipboard
    .writeText(codeToCopy)
    .then(() => {
      alert("Code copied to clipboard!");
    })
    .catch((error) => {
      console.error("Failed to copy code: ", error);
    });
}

function countLines(code) {
  return code.split(/\r\n|\r|\n/).length;
}

document.getElementById("searchInput").addEventListener("input", function () {
  const query = this.value.toLowerCase();
  const filteredSnippets = snippets.filter((snippet) => {
    return (
      snippet.title.toLowerCase().includes(query) ||
      snippet.code.toLowerCase().includes(query)
    );
  });
  renderSnippets(filteredSnippets);
});

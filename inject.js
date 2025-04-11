(function () {
  const article = new Readability(document.cloneNode(true)).parse();
  if (article) {
    console.log("Extracted Article:");
    console.log("Title:", article.title);
    console.log("Text Content:", article.textContent);
  } else {
    console.log("No article could be extracted.");
  }
})();

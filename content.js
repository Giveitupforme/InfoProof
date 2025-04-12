(function () {
  // Clone the current document for Readability to safely parse
  const articleDoc = document.cloneNode(true);

  // Use Readability to extract article text
  const reader = new Readability(articleDoc);
  const article = reader.parse();

  const articleText = article?.textContent?.trim();

  console.log("📄 Extracted article text:", articleText);

  if (articleText && articleText.length > 100) {
    // Send to background script
    chrome.runtime.sendMessage({
      type: 'EXTRACTED_ARTICLE_TEXT',
      data: articleText
    }, () => {
      console.log("✅ Sent article text to background.");
    });
  } else {
    console.warn("⚠️ No meaningful article content found.");
  }
})();

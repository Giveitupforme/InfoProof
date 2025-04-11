function extractMainText() {
  const articleTags = document.querySelectorAll('article');
  let articleText = '';

  if (articleTags.length > 0) {
    articleTags.forEach(article => {
      articleText += article.innerText + '\n';
    });
  } else {
    const paragraphs = Array.from(document.querySelectorAll('p'))
      .filter(p => p.innerText.length > 50);
    paragraphs.forEach(p => {
      articleText += p.innerText + '\n';
    });
  }

  return articleText.trim();
}

const extractedText = extractMainText();

chrome.runtime.sendMessage({
  type: 'EXTRACTED_ARTICLE_TEXT',
  data: extractedText
});

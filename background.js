chrome.runtime.onMessage.addListener((message, sender) => {
  if (message.type === 'EXTRACTED_ARTICLE_TEXT') {
    fetch('http://localhost:3000/verify-article', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ articleText: message.data })
    })
    .then(res => res.json())
    .then(data => {
      chrome.runtime.sendMessage({
        type: 'GEMINI_RESPONSE',
        data: data.result
      });
    })
    .catch(err => console.error("Backend error:", err));
  }
});

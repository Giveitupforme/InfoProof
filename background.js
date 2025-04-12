chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("Received message in background:", message);

  if (message.type === 'EXTRACTED_ARTICLE_TEXT') {
    fetch('http://localhost:3000/verify-article', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ articleText: message.data })
    })
      .then(res => res.json())
      .then(data => {
        console.log("Gemini response:", data.result);
        // Store the response in local storage
        chrome.storage.local.set({ geminiResult: data.result });
      })
      .catch(err => console.error("Gemini fetch error:", err));
  }
});

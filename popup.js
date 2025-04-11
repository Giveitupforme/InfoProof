chrome.runtime.onMessage.addListener((message) => {
  if (message.type === 'GEMINI_RESPONSE') {
    document.getElementById('status').textContent = 'Analysis Complete:';
    document.getElementById('output').textContent = message.data;
  }
});

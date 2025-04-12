document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('status').textContent = 'Analyzing article...';

  chrome.storage.local.get(['geminiResult'], (result) => {
    if (result.geminiResult) {
      document.getElementById('status').textContent = 'Analysis Complete:';
      document.getElementById('output').textContent = result.geminiResult;
    } else {
      document.getElementById('output').textContent = 'Still analyzing or no result yet.';
    }
  });
});

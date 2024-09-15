chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "getURL") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const url = tabs[0].url;
      sendResponse({ url: url });
    });
    // Indicate you will send a response asynchronously
    return true;
  }
});

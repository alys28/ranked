chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.action === "copyHTML") {
    sendResponse({ html: document.documentElement.outerHTML });
  }
});

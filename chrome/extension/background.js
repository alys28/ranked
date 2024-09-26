chrome.action.onClicked.addListener(async () => {
  const [activeTab] = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });
  if (activeTab) {
    console.log(`Current URL: ${activeTab.url}`);
  }
});

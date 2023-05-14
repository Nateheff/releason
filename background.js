async function getCurrentTab() {
  let queryOptions = { active: true, lastFocusedWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}

console.log(getCurrentTab());
// chrome.runtime.onMessageExternal.addListener(function (request, sender) {
//   console.log(request);
// });

chrome.runtime.onMessageExternal.addListener(function (
  request,
  sender,
  sendResponse
) {
  if (request) {
    console.log(request);
    if (request.message) {
      if (request.message == 'version') {
        sendResponse({ version: 1.0 });
      }
    }
  }
});

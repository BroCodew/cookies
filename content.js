chrome.cookies.get({ url: "https://facebook.com", name: "fr" }, (cookie) => {
  if (cookie) {
    const cookieValue = cookie.value;
    chrome.runtime.sendMessage({ c_user: cookieValue });
  }
});

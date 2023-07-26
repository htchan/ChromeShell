async function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function detectBrowser() {
  let userAgent = navigator.userAgent;

  if (userAgent.match(/chrome|chromium|crios/i)) {
    return "chrome";
  } else if (userAgent.match(/firefox|fxios/i)) {
    return "firefox";
  }
  return "not_supported";
}

function storage() {
  if (detectBrowser() == "firefox") {
    return browser.storage;
  } else if (detectBrowser() == "chrome") {
    return chrome.storage;
  }

  return null;
}

function runtime() {
  if (detectBrowser() == "firefox") {
    return browser.runtime;
  } else if (detectBrowser() == "chrome") {
    return chrome.runtime;
  }

  return null;
}

function loadMeta() {
  return Array.from(document.querySelectorAll("meta"))
    .map((item) => item.content)
    .join(",")
    .toUpperCase();
}

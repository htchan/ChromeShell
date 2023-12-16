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

// default setting
var setting = null;

runtime().onInstalled.addListener(() => {
  storage().local.get("video_setting", (result) => {
    if (!result.video_setting) {
      setting = {
        enable: false,
        panel_enabled: true,
        speed: {enabled: true, value: 1},
        mode: {enabled: true, value: "default"},
        ignore: {enabled: true, value: []},
      };
      storage().local.set({
        video_setting: setting,
      });
    } else {
      setting = result.video_setting;
    }
  });
});

storage().local.get(
  "video_setting",
  ({ video_setting }) => (setting = video_setting)
);

storage().onChanged.addListener((changes, namespace) => {
  if (changes?.video_setting != null) {
    setting = changes.video_setting.newValue;
  }
});

const SPEED_STEP = 0.25;
if (detectBrowser() == "chrome") {
  chrome.commands.onCommand.addListener((command) => {
    if (setting == null) {
      return;
    }
    switch (command.toUpperCase()) {
      case "FASTER":
        setting.speed.value = (Number(setting.speed.value) + SPEED_STEP).toString();

        storage().local.set({
          video_setting: setting,
        });
        break;
      case "SLOWER":
        if (setting.speed.value > SPEED_STEP) {
          setting.speed.value = (Number(setting.speed.value) - SPEED_STEP).toString();

          storage().local.set({
            video_setting: setting,
          });
        }
        break;
      default:
    }
  });
}

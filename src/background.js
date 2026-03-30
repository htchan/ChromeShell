// Chrome service worker: import shared helpers via importScripts
// Firefox: helper.js is loaded via manifest background.scripts array
if (typeof importScripts === "function") {
  importScripts("src/helper.js");
}

// default setting
var setting = null;

// Initialize settings when extension is installed or updated
runtime().onInstalled.addListener(() => {
  storage().local.get("video_setting").then((result) => {
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
  }).catch(error => {
    console.error("Error initializing settings:", error);
  });
});

// Load settings on startup
storage().local.get("video_setting").then(({ video_setting }) => {
  setting = video_setting;
}).catch(error => {
  console.error("Error loading settings:", error);
});

// Listen for changes to settings
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

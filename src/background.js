// default setting
var setting = null;

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.get("video_setting", (result) => {
    if (!result.video_setting) {
      setting = {
        speed: 1,
        mode: "default",
        enable: false,
        ignore: [],
      };
      chrome.storage.local.set({
        video_setting: setting,
      });
    } else {
      setting = result.video_setting;
    }
  });
});

chrome.storage.local.get(
  "video_setting",
  ({ video_setting }) => (setting = video_setting)
);

chrome.storage.onChanged.addListener((changes, namespace) => {
  if (changes?.video_setting != null) {
    setting = changes.video_setting.newValue;
  }
});

const SPEED_STEP = 0.25;

chrome.commands.onCommand.addListener((command) => {
  if (setting == null) {
    return;
  }
  switch (command.toUpperCase()) {
    case "FASTER":
      setting.speed = (Number(setting.speed) + SPEED_STEP).toString();

      chrome.storage.local.set({
        video_setting: setting,
      });
      break;
    case "SLOWER":
      if (setting.speed > SPEED_STEP) {
        setting.speed = (Number(setting.speed) - SPEED_STEP).toString();

        chrome.storage.local.set({
          video_setting: setting,
        });
      }
      break;
    default:
  }
});

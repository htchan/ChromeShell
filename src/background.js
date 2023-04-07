// default setting
var setting = {
  speed: 1,
  mode: "default",
  enable: false,
  ignore: [],
};

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.get("video_setting", (result) => {
    if (!result.video_setting) {
      chrome.storage.sync.set({
        video_setting: setting,
      });
    }
  });
});

chrome.storage.sync.get(
  "video_setting",
  ({ video_setting }) => (setting = video_setting)
);

chrome.storage.onChanged.addListener((changes, namespace) => {
  if (changes?.video_setting != null) {
    setting = changes.video_setting.newValue;
  }
});

chrome.commands.onCommand.addListener((command) => {
  switch (command.toUpperCase()) {
    case "FASTER":
      setting.speed = (Number(setting.speed) + 0.25).toString();

      chrome.storage.sync.set({
        video_setting: setting,
      });
      break;
    case "SLOWER":
      setting.speed = (Number(setting.speed) - 0.25).toString();

      chrome.storage.sync.set({
        video_setting: setting,
      });
      break;
    default:
  }
});

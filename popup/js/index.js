let enableButton = document.getElementById("enable");
let speedInput = document.getElementById("speed");
let modeDropdown = document.getElementById("mode");
let ignoreDropdown = document.getElementById("ignore");
var setting = {};

function applySetting(video_setting) {
  setting = video_setting;

  enableButton.checked = setting.enable;

  speedInput.value = setting.speed;

  Array.from(modeDropdown.children).forEach((modeOption) => {
    if (modeOption.getAttribute("value") == setting.mode) {
      modeOption.selected = true;
    }
  });

  Array.from(ignoreDropdown.children).forEach((ignoreOption) => {
    if (setting.ignore.includes(ignoreOption.value)) {
      ignoreOption.selected = true;
    }
  });
}

function updateSetting() {
  chrome.storage.local.set({
    video_setting: setting,
  });
}

chrome.storage.local.get("video_setting", ({ video_setting }) => {
  applySetting(video_setting);
});

enableButton.onclick = (event) => {
  setting.enable = enableButton.checked;
  updateSetting();
};

speedInput.onchange = (event) => {
  setting.speed = speedInput.value;
  updateSetting();
};

modeDropdown.onchange = (event) => {
  setting.mode = modeDropdown.value;
  updateSetting();
};

ignoreDropdown.onchange = (event) => {
  setting.ignore = Array.from(ignoreDropdown.children)
    .filter((item) => item.selected)
    .map((item) => item.value);

  updateSetting();
};

chrome.storage.onChanged.addListener((changes, namespace) => {
  if (changes.video_setting != null) {
    applySetting(changes.video_setting.newValue);
  }
});

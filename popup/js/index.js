let enableButton = document.getElementById("enable");
let panelEnabledButton = document.getElementById("panel-enable");

let speedEnabledButton = document.getElementById("speed-enable");
let speedInput = document.getElementById("speed");
let speedOption05 = document.getElementById("speed_option_05");
let speedOption1 = document.getElementById("speed_option_1");
let speedOption15 = document.getElementById("speed_option_15");
let speedOption2 = document.getElementById("speed_option_2");
let speedOption25 = document.getElementById("speed_option_25");
let speedOption3 = document.getElementById("speed_option_3");

let modeEnabledButton = document.getElementById("mode-enable");
let modeDropdown = document.getElementById("mode");

let ignoreEnabledButton = document.getElementById("ignore-enable");
let ignoreDropdown = document.getElementById("ignore");

var setting = {};

function applySetting(video_setting) {
  if (video_setting == null) {
    setting = {
      enable: false,
      panel_enabled: false,
      speed: { enabled: false, value: 1 },
      mode: { enabled: false, value: "default" },
      ignore: { enabled: false, value: [] },
    };

    storage().local.set({
      video_setting: setting,
    });
  } else {
    setting = video_setting;
  }

  enableButton.className = setting.enable ? "enabled" : "disabled";
  enableButton.innerText = `Extension ${setting.enable ? "En" : "Dis"}abled`;

  speedEnabledButton.className = setting.speed.enabled ? "enabled" : "disabled";
  speedInput.value = setting.speed.value;

  modeEnabledButton.className = setting.mode.enabled ? "enabled" : "disabled";
  Array.from(modeDropdown.children).forEach((modeOption) => {
    if (modeOption.getAttribute("value") == setting.mode.value) {
      modeOption.selected = true;
    }
  });

  ignoreEnabledButton.className = setting.ignore.enabled
    ? "enabled"
    : "disabled";
  Array.from(ignoreDropdown.children).forEach((ignoreOption) => {
    if (setting.ignore.value.includes(ignoreOption.value)) {
      ignoreOption.selected = true;
    }
  });

  panelEnabledButton.className = setting.panel_enabled ? "enabled" : "disabled";
  panelEnabledButton.innerText = `Panel ${
    setting.panel_enabled ? "En" : "Dis"
  }abled`;
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
  setting.enable = !setting.enable;
  updateSetting();
};

speedEnabledButton.onclick = (event) => {
  console.log(setting)
  setting.speed = {
    enabled: !setting.speed.enabled,
    value: setting.speed.value || setting.speed,
  };

  console.log(setting)

  updateSetting();
};

speedInput.onchange = (event) => {
  setting.speed.value = speedInput.value;
  updateSetting();
};

let speedOptions = [
  speedOption05,
  speedOption1,
  speedOption15,
  speedOption2,
  speedOption25,
  speedOption3
]

speedOptions.forEach(option => {
  option.onclick = (event) => {
    setting.speed.value = option.value;
    console.log(option.value);
    console.log(setting.speed.value);
    updateSetting();
  }
})

modeEnabledButton.onclick = (event) => {
  setting.mode = {
    enabled: !setting.mode.enabled,
    value: setting.mode.value || setting.mode,
  };

  updateSetting();
};

modeDropdown.onchange = (event) => {
  setting.mode.value = modeDropdown.value;
  updateSetting();
};

ignoreEnabledButton.onclick = (event) => {
  setting.ignore = {
    enabled: !setting.ignore.enabled,
    value: setting.ignore.value || setting.ignore,
  };

  updateSetting();
};

ignoreDropdown.onchange = (event) => {
  setting.ignore.value = Array.from(ignoreDropdown.children)
    .filter((item) => item.selected)
    .map((item) => item.value);

  updateSetting();
};

panelEnabledButton.onclick = (event) => {
  setting.panel_enabled = !setting.panel_enabled;
  updateSetting();
};

chrome.storage.onChanged.addListener((changes, namespace) => {
  if (changes.video_setting != null) {
    applySetting(changes.video_setting.newValue);
  }
});

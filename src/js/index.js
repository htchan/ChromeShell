let enableButton = document.getElementById('enable');
let speedDropdown = document.getElementById('speed');
let modeDropdown = document.getElementById('mode');
let ignoreDropdown = document.getElementById('ignore');
var setting = {}

chrome.storage.sync.get('video_setting', ({video_setting}) => {
    setting = video_setting;

    enableButton.checked = video_setting.enable;
    
    Array.from(speedDropdown.children).forEach( (speedOption) => {
        if (speedOption.getAttribute('value') == video_setting.speed) {
            speedOption.selected = true;
        }
    });

    Array.from(modeDropdown.children).forEach( (modeOption) => {
        if (modeOption.getAttribute('value') == video_setting.mode) {
            modeOption.selected = true;
        }
    });
    
    Array.from(ignoreDropdown.children).forEach( (ignoreOption) => {
        if (video_setting.ignore.includes(ignoreOption.value)) {
            ignoreOption.selected = true;
        }
    })
});

enableButton.onclick = (event) => {
    setting.enable = enableButton.checked;
    chrome.storage.sync.set({
        video_setting: setting
    });
}

speedDropdown.onchange = (event) => {
    setting.speed = speedDropdown.value;
    chrome.storage.sync.set({
        video_setting: setting
    });
}

modeDropdown.onchange = (event) => {
    setting.mode = modeDropdown.value
    chrome.storage.sync.set({
        video_setting: setting
    })
}

ignoreDropdown.onchange = (event) => {
    setting.ignore = Array.from(ignoreDropdown.children)
    .filter(item => item.selected)
    .map(item => item.value);

    chrome.storage.sync.set({
        video_setting: setting
    })
}
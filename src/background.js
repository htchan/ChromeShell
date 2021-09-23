chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.get('video_setting', (result) => {
        if (!result.video_setting) {
            chrome.storage.sync.set({
                video_setting: {
                    speed: 1,
                    mode: 'default',
                    enable: false,
                    ignore: []
                }
            });
        }
    });
});
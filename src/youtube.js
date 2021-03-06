let _speedUp = (ratio = '2', trial = 0) => {
    setting_button = document.getElementsByClassName('ytp-button ytp-settings-button')[0];
    setting_button.click();

    control_menu_buttons = Array.from(document.getElementsByClassName('ytp-menuitem'));
    speed_control_button = control_menu_buttons.filter(
        (row) => row.children[1].innerText === 'Playback speed'
    )[0];
    if (!speed_control_button) {
        setting_button.click()
        if (trial < 10) { setTimeout(() => _speedUp(ratio, trial + 1), 1000); }
        return
    }
    speed_control_button.click();

    speed_options = Array.from(document.getElementsByClassName('ytp-menuitem-label'));
    target_speed_option = speed_options.filter( (option) => option.innerHTML == ratio )?.[0];
    console.log('speed option', target_speed_option)
    if (target_speed_option) {
        target_speed_option.click();
    } else {
        alert(ratio + ' not found');
    }
    setting_button.click()
}
let _skipAds = () => {
    skip_ads_button = document.getElementsByClassName('ytp-ad-skip-button ytp-button')?.[0]
    skip_ads_button?.click();
    close_ads_buttons = Array.from(document.getElementsByClassName('ytp-ad-overlay-close-button'))
    close_ads_buttons.map( button => button?.click() );
}
let _changeView = (mode, trial = 0) => {
    let full_screen_button = document.getElementsByClassName('ytp-fullscreen-button ytp-button')[0];

    let get_into_full_mode = ((mode?.toUpperCase() === 'FULL') &&
        (!full_screen_button.getAttribute('title').toUpperCase().includes('EXIT')));
    let exit_full_mode = ((mode?.toUpperCase() !== 'FULL') &&
        (full_screen_button.getAttribute('title').toUpperCase().includes('EXIT')));

    if (get_into_full_mode || exit_full_mode) {
        full_screen_button.click();
    }

    if (mode?.toUpperCase() === 'FULL') { return; }

    let view_button = document.getElementsByClassName('ytp-size-button ytp-button')[0]

    if (view_button.getAttribute('title').toUpperCase().includes(mode?.toUpperCase())) {
        view_button.click()
    }
    if (trial < 10) { setTimeout(() => _changeView(mode, trial + 1), 1000); }
}

let _skipAdsAuto = () => {
    const config = { childList: true, subtree: true };
    var skipAdsObserver = new MutationObserver(_skipAds)
    let adsNode = document.getElementsByClassName('video-ads ytp-ad-module')[0];
    adsNode && skipAdsObserver.observe(adsNode, config);
}

chrome.storage.sync.get('video_setting', ({video_setting}) => {
    if (!video_setting.enable) { return; }

    let video = {
        speedUp : _speedUp,
        skipAds : _skipAds,
        changeMode : _changeView,
    }

    console.log("running extension")
    console.log("attempt to skip ads")
    video.skipAds();
    console.log("skip ads observer")
    _skipAdsAuto();

    console.log("change mode", video_setting.mode)
    video.changeMode(video_setting.mode);

    let videoType = Array.from(document.getElementsByTagName("meta"))
    .filter( item => item.getAttribute("itemprop") == "genre")[0].getAttribute("content")
    if (videoType != "Music") {
        console.log("change speed", video_setting.speed)
        video.speedUp(video_setting.speed);
    }
})
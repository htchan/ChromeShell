let _speedUpYoutube = (ratio = '2') => {
    setting_button = document.getElementsByClassName('ytp-button ytp-settings-button')[0];
    setting_button.click();

    control_menu_buttons = Array.from(document.getElementsByClassName('ytp-menuitem'));
    speed_control_button = control_menu_buttons.filter( (row) => row.children[1].innerText === 'Playback speed' )[0];
    if (!speed_control_button) {
        console.log("speed control button not exist")
        return
    }
    speed_control_button.click();

    speed_options = Array.from(document.getElementsByClassName('ytp-menuitem-label'));
    target_speed_option = speed_options.filter(
        (option) => option.innerHTML == ratio
    )?.[0];
    console.log('speed option', target_speed_option)
    if (target_speed_option) {
        target_speed_option.click();
    } else {
        alert(ratio + ' not found');
    }
    setting_button.click()
}
let _skipAdsYoutube = () => {
    skip_ads_button = document.getElementsByClassName('ytp-ad-skip-button ytp-button')?.[0]
    if (skip_ads_button) {
        skip_ads_button.click();
    }
    close_ads_buttons = Array.from(document.getElementsByClassName('ytp-ad-overlay-close-button'))
    close_ads_buttons.map( button => button?.click() );
}
let _changeViewYoutube = (mode) => {
    if (mode?.toUpperCase() === 'FULL SCREEN') {
        full_screen_button = document.getElementsByClassName('ytp-fullscreen-button ytp-button')[0]
        full_screen_button.click();
        return;
    }

    view_button = document.getElementsByClassName('ytp-size-button ytp-button')[0]
    if (view_button.getAttribute('title').toUpperCase().includes(mode?.toUpperCase())) {
        view_button.click()
    }
}

let _skipAdsAutoYoutube = () => {
    const config = { childList: true, subtree: true };
    var skipAdsObserver = new MutationObserver(_skipAdsYoutube)
    let adsNode = document.getElementsByClassName('video-ads ytp-ad-module')[0];
    adsNode && skipAdsObserver.observe(adsNode, config);
}

function Ytb(config) {
    config.autoSkipAds && _skipAdsAutoYoutube();
    config.mode && _changeViewYoutube(config.mode);
    return {
        speedUp : _speedUpYoutube,
        skipAds : _skipAdsYoutube,
        changeMode : _changeViewYoutube,
    }
}

let _speedUpBili = (ratio = '2') => {
    speed_options = Array.from(document.getElementsByClassName('bilibili-player-video-btn-speed-menu-list'))
    target_speed_option = speed_options.filter( item => item.getAttribute('data-value') == ratio)[0]
    if (target_speed_option) {
        target_speed_option.click();
    } else {
        alert(ratio + ' not found');
    }
}
let _changeViewBili = (mode) => {
    full_screen_button = document.getElementsByClassName('bilibili-player-video-btn bilibili-player-video-btn-fullscreen')[0]
    if (mode?.toUpperCase() === 'FULL SCREEN') {
        if (!full_screen_button.getAttribute('class').includes('closed')) {
            full_screen_button?.click();
        }
        return;
    }
    if (full_screen_button.getAttribute('class').includes('closed')) {
        full_screen_button?.click();
    }
    view_button = document.getElementsByClassName('bilibili-player-video-btn bilibili-player-video-web-fullscreen')[0]
    if ((mode?.toUpperCase() === 'THEATER') && (view_button.getAttribute('class').includes('closed'))) {
        return
    }
    view_button.click()
}

function Bili(config) {
    config.autoPlay && document.getElementsByClassName('bilibili-player-dm-tip-wrap')[0].click()
    config.mode && _changeViewBili(config.mode);
    return {
        speedUp: _speedUpBili,
        changeMode : _changeViewBili,
    }
}

function Video(config) {
    let available_site = {
        'www.youtube.com': Ytb,
        'www.bilibili.com': Bili,
    }
    return available_site[document.location.host]?.(config);
};

let settings = {
    autoSkipAds : true,
    speed : 2,
    mode : 'THEATER',
    autoPlay : true,
};

let video = new Video(settings);

setTimeout( () => video.speedUp(settings.speed), 1000);


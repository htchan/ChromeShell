let _speedUp = (ratio = '2') => {
    speed_options = Array.from(document.getElementsByClassName('bilibili-player-video-btn-speed-menu-list'))
    target_speed_option = speed_options.filter( item => item.getAttribute('data-value') == ratio)[0]
    if (target_speed_option) {
        target_speed_option.click();
    } else {
        alert(ratio + ' not found');
    }
}
let _changeView = (mode, trial = 0) => {
    full_screen_button = document.getElementsByClassName('bilibili-player-video-btn bilibili-player-video-btn-fullscreen')[0]
    if (!full_screen_button) {
        if (trial < 10) { setTimeout(() => _changeView(mode, trial + 1), 1000); }
        return
    }
    if (mode?.toUpperCase() === 'FULL SCREEN') {
        if (!full_screen_button?.getAttribute('class').includes('closed')) {
            full_screen_button?.click();
        }
        return;
    }
    if (full_screen_button.getAttribute('class').includes('closed')) {
        full_screen_button?.click();
    }
    view_button = document.getElementsByClassName('bilibili-player-video-btn bilibili-player-video-web-fullscreen')[0]
    if (!view_button) {
        if (trial < 10) { setTimeout(() => _changeView(mode, trial + 1), 1000); }
        return
    }
    if ((mode?.toUpperCase() === 'THEATER') && (view_button.getAttribute('class').includes('closed'))) {
        return
    }
    view_button.click()
}

let config = {
    speed : 2,
    mode : 'THEATER',
    // autoPlay : true
};

video = {
    speedUp: _speedUp,
    changeMode : _changeView,
}

// config.autoPlay && document.getElementsByClassName('bilibili-player-dm-tip-wrap')[0].click()
config.mode && video.changeMode(config.mode);
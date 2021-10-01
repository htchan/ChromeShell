let _speedUp = (ratio = '2', trial = 0) => {
    speed_options = Array.from(document.getElementsByClassName('bilibili-player-video-btn-speed-menu-list'))
    target_speed_option = speed_options.filter( item => item.getAttribute('data-value') == ratio)[0]
    if (target_speed_option) {
        target_speed_option.click();
    } else if (trial < 10) {
        setTimeout( () => _speedUp(ratio, trial + 1), 1000);
    } else {
        alert(ratio + ' not found')
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

let _play = (trial = 0) => {
    let buttons = document.getElementsByClassName('bilibili-player-iconfont')
    let play_button = Array.from(buttons)
        .filter( item => item.getAttribute("aria-label") == "播放")[0]
    if (play_button) {
        play_button.click();
    } else if (trial < 10) {
        setTimeout( () => _play(trial + 1), 1000);
    }
}

let _pause = (trial = 0) => {
    let buttons = document.getElementsByClassName('bilibili-player-iconfont')
    let play_button = Array.from(buttons)
        .filter( item => item.getAttribute("aria-label") == "暂停")[0]
    if (play_button) {
        play_button.click();
    } else if (trial < 10) {
        setTimeout( () => _pause(trial + 1), 1000);
    }
}

let _getTags = (trial = 0) => {
    let tags = Array.from(document.getElementsByClassName('tag'))
        .map(item => item.children[0].children[0].innerText);
    return tags;
}


chrome.storage.sync.get('video_setting', ({video_setting}) => {
    if (!video_setting.enable) { return; }

    video = {
        speedUp: _speedUp,
        changeMode : _changeView,
        control: {
            play: _play,
            pause: _pause,
        },
        tags: _getTags()
    }

    let tags = document.getElementsByClassName('tag');
    tags = Array.from(tags).map(tag => tag.innerText);
    skip = tags.filter( (tag) => video_setting.ignore.includes(tag));
    if (skip.length != 0) { return; }

    console.log('start auto setup')
    console.log('click play button')
    video.play();

    console.log('change mode', video_setting.mode);
    video.changeMode(video_setting.mode);
    
    console.log('change speed', video_setting.speed)
    video.speedUp(video_setting.speed)
});
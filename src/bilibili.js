let _speedUp = (ratio = '2', trial = 0) => {
    speed_options = Array.from(document.getElementsByClassName('bilibili-player-video-btn-speed-menu-list'))
    target_speed_option = speed_options.filter( item => item.getAttribute('data-value') == ratio)[0]
    if (target_speed_option) {
        target_speed_option.click();
    } else {
        console.log(ratio + ' not found');
        if (trial < 10) { setTimeout(() => _speedUp(ratio, trial + 1), 1000); }
        else { alert(ratio + ' not found')}
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
    console.log('click play')
    let play_button = document.getElementsByClassName('bilibili-player-video-btn-start');
    console.log('play button length', play_button.length)
    if (play_button.length == 0) {
        if (trial < 10) { setTimeout(() => _play(trial + 1), 1000); }
        return
    } else {
        play_button = play_button[0].children[0];
    }
    if (play_button.getAttribute('aria-label') == '播放') {
        play_button.click();
        if (trial < 10) { setTimeout(() => _play(10), 1000); }
    }
}


chrome.storage.sync.get('video_setting', ({video_setting}) => {
    if (!video_setting.enable) { return; }

    video = {
        speedUp: _speedUp,
        changeMode : _changeView,
        play: _play,
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
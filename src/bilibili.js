let _speedUp = (ratio = '2', trial = 0) => {
    let player = document.getElementsByTagName("video")[0];
    if (player.readyState < 1) {
        if (trial < 10) { setTimeout(() => _speedUp(ratio, trial + 1), 1000); }
    } else {
        player.playbackRate = ratio;
    }
}
let _changeView = (mode, trial = 0) => {
    let isDefaultMode = document.getElementsByClassName("bpx-player-control-bottom-center")[0]?.childElementCount === 0;
    let isTheaterMode = document.getElementsByClassName('bpx-player-ctrl-btn bpx-player-ctrl-web')[0]?.classList.contains('bpx-state-entered');
    let isWideMode = document.getElementsByClassName('bpx-player-ctrl-btn bpx-player-ctrl-wide')[0]?.classList.contains('bpx-state-entered');

    let player = document.getElementsByTagName("video")[0];
    if (player.readyState < 1) {
        if (trial < 10) { setTimeout(() => _changeView(mode, trial + 1), 1000); }
    }

    switch (mode?.toUpperCase()) {
        case 'FULL SCREEN':
            let fullScreenModeButton = document.getElementsByClassName('bpx-player-ctrl-btn bpx-player-ctrl-full')[0];
            if (isDefaultMode || isTheaterMode || isWideMode) {
                fullScreenModeButton.click();
            }
            break;
        case 'THEATER':
            let theaterModeButton = document.getElementsByClassName('bpx-player-ctrl-btn bpx-player-ctrl-web')[0]
            if (!theaterModeButton && trial < 10) {
                setTimeout(() => _changeView(mode, trial + 1), 1000);
                return;
            }
            if (!isTheaterMode) {
                theaterModeButton.click();
            }
            break;
        default:
            console.error(`unknown mode: ${mode}`);
    }
}

let _play = (trial = 0) => {
    let player = document.getElementsByTagName("video")[0];
    if (player.readyState < 1) {
        if (trial < 10) { setTimeout(() => _play(trial + 1), 1000); }
    }

    player.play();
}

let _pause = (trial = 0) => {
    let player = document.getElementsByTagName("video")[0];
    if (player.readyState < 1) {
        if (trial < 10) { setTimeout(() => _pause(trial + 1), 1000); }
    }

    player.pause();
}

let _getTags = (trial = 0) => {
    let tags = Array.from(document.getElementsByClassName('tag'))
        .map(item => item.children[0].children[0].innerText);
    return tags;
}


let applySetting = ({video_setting}) => {
    if (!video_setting.enable) { return; }

    let video = {
        speedUp: _speedUp,
        changeMode : _changeView,
        control: {
            play: _play,
            pause: _pause,
        },
        // tags: _getTags()
    }

    let tags = document.getElementsByClassName('tag');
    tags = Array.from(tags).map(tag => tag.innerText.trim());
    skip = tags.filter( (tag) => video_setting.ignore.includes(tag));
    if (skip.length != 0) { return video; }

    console.log('start auto setup')
    console.log('click play button')

    console.log('change mode', video_setting.mode);
    video.changeMode(video_setting.mode);
    
    console.log('change speed', video_setting.speed)
    video.speedUp(video_setting.speed)

    return video
}

chrome.storage.onChanged.addListener((changes, namespace) => {
    console.log(changes)
    console.log(changes['video_setting'] != null)
    if (changes['video_setting'] != null) {
        console.log(changes.video_setting.newValue)
        applySetting({ video_setting: changes.video_setting.newValue })
    }
})

let player = document.getElementsByTagName("video")[0];
player.onloadedmetadata = () => {
    chrome.storage.sync.get('video_setting', (value) => {
        video = applySetting(value);
        // video.control.play();
    });
};
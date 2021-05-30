# Video.js

some features are only available on specific site, as there is not such need in other site (eg. no `skipAds` for `www.bilibili.com`)

## available function

- changeMode(mode)
    - mode: 'full screen' -> full screen
    - mode: 'Theater' -> theater mode
    - mode: null -> switch between normal mode and theater mode
- skipAds()
- speedUp(ratio)
    - ratio: the number that provided in speed up menu
    *if the speed up cannot find by user, it has a high chance that unable to do it with console
    *if the ratio not match, it will not do any speed up

## in-developing function

- play()
- pause()
- next()
- previous()
- jumpTo(time)
    - time: the "mm:ss" or "hh:mm:ss" format for the target time
    *if the time is out of range, it will be ignored

## available site
- www.youtube.com
- www.bilibili.com
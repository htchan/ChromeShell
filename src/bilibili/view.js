function biliChangeView(mode, trial = 0) {
  let isDefaultMode =
    document.getElementsByClassName("bpx-player-control-bottom-center")[0]
      ?.childElementCount === 0;
  let isTheaterMode = document
    .getElementsByClassName("bpx-player-ctrl-btn bpx-player-ctrl-web")[0]
    ?.classList.contains("bpx-state-entered");
  let isWideMode = document
    .getElementsByClassName("bpx-player-ctrl-btn bpx-player-ctrl-wide")[0]
    ?.classList.contains("bpx-state-entered");

  let player = document.getElementsByTagName("video")[0];
  if (player.readyState < 1) {
    if (trial < 10) {
      setTimeout(() => _biliChangeView(mode, trial + 1), 1000);
    }
  }

  switch (mode?.toUpperCase()) {
    case "FULL":
      let fullScreenModeButton = document.getElementsByClassName(
        "bpx-player-ctrl-btn bpx-player-ctrl-full"
      )[0];
      if (isDefaultMode || isTheaterMode || isWideMode) {
        fullScreenModeButton.click();
      }
      break;
    case "THEATER":
      let theaterModeButton = document.getElementsByClassName(
        "bpx-player-ctrl-btn bpx-player-ctrl-web"
      )[0];
      if (!theaterModeButton && trial < 10) {
        setTimeout(() => _biliChangeView(mode, trial + 1), 1000);
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

storage().local.get("video_setting", ({ video_setting }) => {
  if (video_setting.enable) {
    biliChangeView(video_setting.mode);
  }
});

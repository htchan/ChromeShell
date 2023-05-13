function view_SetPlayerFullScreenListener() {
  let video = document.querySelector("video");

  addEventListener(video, "playing", () => {
    let isFullScreen = document.body.getAttribute("faux-fullscreen") == "true";

    if (!isFullScreen) {
      console.log(
        `${HEADER_YOUTUBE} ${HEADER_MOBILE} ${HEADER_VIEW} enter full screen`
      );
      let mode = document.querySelector(".icon-button.fullscreen-icon");
      mode.click();
    }
  });
}

function view_AddVideoBoxClickLister() {
  console.log("clicked");
  setTimeout(() => {
    view_SetPlayerFullScreenListener();

    let video = document.querySelector("video");
    video.pause();
    video.play();
  }, 1000);
}

storage().local.get("video_setting", ({ video_setting }) => {
  if (video_setting.enable) {
    console.log(
      `${HEADER_YOUTUBE} ${HEADER_MOBILE} ${HEADER_VIEW} load video_setting for change view ${JSON.stringify(
        video_setting
      )}`
    );
    setTimeout(() => {
      let videoBox = document.querySelector("#movie_player");
      addEventListener(videoBox, "click", view_AddVideoBoxClickLister, {
        once: true,
      });
    }, 500);
  }
});

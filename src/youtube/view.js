function youtubeChangeViewMode(mode, trial = 0) {
  if (trial > VIEW_MAX_RETRY) {
    return;
  }

  let full_screen_button = document.querySelector(
    ".ytp-fullscreen-button.ytp-button"
  );

  let get_into_full_mode =
    mode?.toUpperCase() === "FULL" &&
    !full_screen_button.getAttribute("title").toUpperCase().includes("EXIT");
  let exit_full_mode =
    mode?.toUpperCase() !== "FULL" &&
    full_screen_button.getAttribute("title").toUpperCase().includes("EXIT");

  if (get_into_full_mode || exit_full_mode) {
    full_screen_button.click();
  }

  if (mode?.toUpperCase() === "FULL") {
    return;
  }

  let view_button = document.querySelector(".ytp-size-button.ytp-button");

  if (
    view_button
      .getAttribute("title")
      .toUpperCase()
      .includes(mode?.toUpperCase())
  ) {
    view_button.click();
  }
}

storage().local.get("video_setting", ({ video_setting }) => {
  if (video_setting.enable) {
    console.log(
      `${HEADER_YOUTUBE} load video_setting for change view ${JSON.stringify(
        video_setting
      )}`
    );
    youtubeChangeViewMode(video_setting.mode);
  }
});

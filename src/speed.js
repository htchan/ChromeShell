async function changePlayerSpeed(player, speed, trial = 0) {
  for (let i = 0; i < SPEED_MAX_RETRY; i++) {
    if (!player || player.readyState < 1) {
      await sleep(1000);
    } else {
      player.onloadedmetadata = () => changePlayerSpeed(player, speed);
      for (let i = 0; i < 3; i++) {
        player.playbackRate = speed;
        await sleep(500);
      }
      console.log(`${HEADER_GENERIC} ${HEADER_SPEED} update speed to ${speed}`);

      break;
    }
  }
}

function ChangeSpeed(speed) {
  let videos = Array.from(document.querySelectorAll("video"));
  videos.forEach((video) => {
    changePlayerSpeed(video, speed);
  });
}

storage().local.get("video_setting", ({ video_setting }) => {
  if (video_setting.enable) {
    console.log(
      `${HEADER_GENERIC} ${HEADER_SPEED} load video_setting for change speed ${JSON.stringify(
        video_setting
      )}`
    );
    setTimeout(() => ChangeSpeed(video_setting.speed), 500);
  }
});

storage().onChanged.addListener((changes, area) => {
  let video_setting = changes["video_setting"]["newValue"];
  if (video_setting.enable) {
    console.log(
      `${HEADER_GENERIC} ${HEADER_SPEED} real time load video_setting for change speed ${JSON.stringify(
        video_setting
      )}`
    );
    ChangeSpeed(video_setting.speed);
  }
});

async function changePlayerSpeed(player, trial = 0) {
  for (let i = 0; i < SPEED_MAX_RETRY; i++) {
    if (!player || player.readyState < 1) {
      await sleep(1000);
    } else {
      let {
        video_setting: { speed },
      } = await storage().local.get("video_setting");
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

function ChangeSpeed() {
  let videos = Array.from(document.querySelectorAll("video"));
  videos.forEach((video) => {
    changePlayerSpeed(video);
  });
}

storage().local.get("video_setting", ({ video_setting }) => {
  if (video_setting.enable) {
    if (video_setting.ignore.some( (ignoreItem) => loadMeta().includes(ignoreItem) )) {
      return;
    }
    
    console.log(
      `${HEADER_GENERIC} ${HEADER_SPEED} load video_setting for change speed ${JSON.stringify(
        video_setting
      )}`
    );
    setTimeout(() => ChangeSpeed(), 500);
  }
});

storage().onChanged.addListener((changes, area) => {
  let video_setting = changes["video_setting"]["newValue"];
  if (video_setting.enable) {
    if (video_setting.ignore.some( (ignoreItem) => loadMeta().includes(ignoreItem) )) {
      return;
    }

    console.log(
      `${HEADER_GENERIC} ${HEADER_SPEED} real time load video_setting for change speed ${JSON.stringify(
        video_setting
      )}`
    );
    ChangeSpeed();
  }
});

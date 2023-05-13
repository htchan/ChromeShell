async function getSettingButton() {
  while (true) {
    let settingButton = document.querySelector(".ytp-settings-button");
    if (settingButton) {
      return settingButton;
    }

    await sleep(UI_INTERACTION_INTERVAL);
  }
}
async function getSpeedMenuButton() {
  while (true) {
    let speedMenuButton = Array.from(
      document.querySelectorAll(".ytp-menuitem > .ytp-menuitem-label")
    ).find((button) => button.innerText === "Playback speed");
    if (speedMenuButton) {
      return speedMenuButton;
    }

    await sleep(UI_INTERACTION_INTERVAL);
  }
}

async function getTargetSpeedOption(speed) {
  while (true) {
    let targetSpeedOption = Array.from(
      document.querySelectorAll(".ytp-menuitem-label")
    ).reduce((chosen, option) => {
      let chosenInnerText =
        chosen.innerText.toUpperCase() == "NORMAL" ? "1" : chosen.innerText;
      let optionInnerText =
        option.innerText.toUpperCase() == "NORMAL" ? "1" : option.innerText;
      let chosenDiff = Math.abs(speed - chosenInnerText);
      let optionDiff = Math.abs(speed - optionInnerText);

      return optionDiff < chosenDiff ? option : chosen;
    });
    if (
      targetSpeedOption.innerText.toUpperCase() == "NORMAL" ||
      targetSpeedOption.innerText > 0
    ) {
      return targetSpeedOption;
    }

    await sleep(UI_INTERACTION_INTERVAL);
  }
}

async function youtubeChangeSpeed(speed) {
  let youtubeController = document.querySelector(".ytp-exp-bottom-control-flexbox")
  if (!youtubeController) {
    console.log(`${HEADER_YOUTUBE} ${HEADER_SPEED} player container not found`);
    return;
  }

  let settingButton = await getSettingButton();
  settingButton.click();

  let speedMenuButton = await getSpeedMenuButton();
  speedMenuButton.click();

  let targetSpeedOption = await getTargetSpeedOption(speed);
  targetSpeedOption.click();

  console.log(targetSpeedOption);

  for (let i = 0; i < 10; i++) {
    if (settingButton.getAttribute("aria-expanded") == "true") {
      settingButton.click();
      break
    }

    await sleep(UI_INTERACTION_INTERVAL);
  }
}

storage().local.get("video_setting", ({ video_setting }) => {
  if (video_setting.enable) {
    if (video_setting.ignore.some( (ignoreItem) => loadMeta().includes(ignoreItem) )) {
      return;
    }
    
    console.log(
      `${HEADER_YOUTUBE} ${HEADER_SPEED} [speed] load video_setting for change speed ${JSON.stringify(
        video_setting
      )}`
    );
    youtubeChangeSpeed(2);
  }
});

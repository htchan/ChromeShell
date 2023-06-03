const displayStyle = `
background-color: #00000080; color: #ffffff;
width: 10%; height: 10%;
position: fixed; top: 0; left: 0px; z-index: 9999;
transform: translateY(0); transform: translateX(0);
font-size: 5vw; text-align: center; vertical-align: middle;
pointer-events:none;
`;
const hiddenStyle = "display: none;";

// add a panel to top left conor
async function addControlPanel() {
  // read speed
  let {
    video_setting: { speed },
  } = await storage().local.get("video_setting");
  console.log(speed);

  // create panel node
  let panel = document.createElement("div");
  panel.setAttribute("id", "player-helper-extension-panel");

  // set panel content
  panel.innerText = `${speed.value}`;

  // add panel to screen
  document.body.appendChild(panel);
}

storage().local.get("video_setting", async ({ video_setting }) => {
  console.log(video_setting);
  await addControlPanel();
  console.log("panel added");
  if (video_setting.panel_enabled) {
    document.getElementById("player-helper-extension-panel").style.cssText =
      displayStyle;
  } else {
    document.getElementById("player-helper-extension-panel").style.cssText =
      hiddenStyle;
  }
});

storage().onChanged.addListener((changes, area) => {
  let video_setting = changes["video_setting"]["newValue"];
  console.log(`setting updated ${video_setting}`)
  if (video_setting.panel_enabled) {
    document.getElementById("player-helper-extension-panel").style.cssText =
      displayStyle;
    document.getElementById(
      "player-helper-extension-panel"
    ).innerText = `${video_setting.speed.value}`;
  } else {
    document.getElementById("player-helper-extension-panel").style.cssText =
      hiddenStyle;
  }
});

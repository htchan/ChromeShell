const displayStyle = {
  "background-color": "#00000080",
  color: "#ffffff",
  display: "block",
  width: "10%",
  height: "10%",
  position: "fixed",
  top: "0",
  left: "0px",
  "z-index": "9999",
  transform: "translateY(0)",
  transform: "translateX(0)",
  "font-size": "5vw",
  "text-align": "center",
  "vertical-align": "middle",
  "pointer-events": "none",
};
const hiddenStyle = { display: "none" };

let panel_original_video_setting = null;

const applyPanelStyles = (element, panelEnabled, panelReapplySetting) => {
  let styles = {};

  if (panelEnabled) {
    styles = displayStyle;
  } else {
    styles = hiddenStyle;
  }

  if (panelReapplySetting) {
    styles["pointer-events"] = "auto";
  } else {
    styles["pointer-events"] = "none";
  }

  console.log(styles)

  Object.entries(styles).forEach(([prop, val]) => {
    const [value, pri = ""] = val.split("!");
    element.style.setProperty(prop, value, pri);
  });
};

// add a panel to top left conor
async function addControlPanel() {
  // read speed
  let {
    video_setting: { speed, panel_reapply_setting },
  } = await storage().local.get("video_setting");
  console.log(speed);

  // create panel node
  let panel = document.createElement("div");
  panel.setAttribute("id", "player-helper-extension-panel");

  // set panel content
  panel.innerText = `${speed.value}`;

  if (panel_reapply_setting) {
    panel.onclick = () => {
      if (panel_original_video_setting != null) {
        storage().local.set({ video_setting: null });
        storage().local.set({ video_setting: panel_original_video_setting });
      }
    };
  }

  // add panel to screen
  document.body.appendChild(panel);
}

storage().local.get("video_setting", async ({ video_setting }) => {
  console.log(video_setting);
  panel_original_video_setting = video_setting;
  await addControlPanel();
  console.log("panel added");

  applyPanelStyles(
    document.getElementById("player-helper-extension-panel"),
    video_setting.panel_enabled,
    video_setting.panel_reapply_setting
  );
});

storage().onChanged.addListener((changes, area) => {
  let video_setting = changes["video_setting"]["newValue"];
  console.log(`setting updated ${video_setting}`);
  if (video_setting != null) {
    panel_original_video_setting = video_setting;
  }

  applyPanelStyles(
    document.getElementById("player-helper-extension-panel"),
    video_setting.panel_enabled,
    video_setting.panel_reapply_setting
  );
});

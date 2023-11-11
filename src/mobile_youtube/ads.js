async function skipAds() {
  let video = document.querySelector("video");

  console.log("skip ads: attributes updated!!!");
  let isAdsPlaying =
    video.parentElement.parentElement.classList.contains("ad-showing");
  if (isAdsPlaying) {
    // set playback speed to 10
    for (i = 0; i < 5; i++) {
      await sleep(100)
      video.playbackRate = 10;
      console.log("skip ads: speed up!!!");
    }
  } else {
    console.log("skip ads: reverted");
  }
  console.log(`skip ads: playback rate ${video.playbackRate}`)
}

var skipAdsObserver = new MutationObserver(skipAds);

function deploySkipAdsObserver() {
  // const config = { attributes: true };
  const config = { attributeFilter: ["class"] };
  let adsNode = document.querySelector("video").parentElement.parentElement;
  adsNode && skipAdsObserver.observe(adsNode, config);
}

storage().local.get("video_setting", ({ video_setting }) => {
  if (video_setting.enable) {
    skipAds();
    deploySkipAdsObserver();
  }
});

storage().onChanged.addListener((changes, area) => {
  let video_setting = changes["video_setting"]["newValue"];
  if (video_setting.enable) {
    skipAds();
    deploySkipAdsObserver();
  }
});

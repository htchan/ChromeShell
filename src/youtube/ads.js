function skipAds() {
  skip_ads_button = document.querySelector(".ytp-ad-skip-button.ytp-button");
  skip_ads_button?.click();
  close_ads_buttons = Array.from(
    document.querySelectorAll(".ytp-ad-overlay-close-button")
  );
  close_ads_buttons.map((button) => button?.click());
}

var skipAdsObserver = new MutationObserver(skipAds);

function youtubeSkipAds() {
  const config = { childList: true, subtree: true };
  let adsNode = document.querySelector(".video-ads.ytp-ad-module");
  adsNode && skipAdsObserver.observe(adsNode, config);
}

storage().local.get("video_setting", ({ video_setting }) => {
  if (video_setting.enable) {
    skipAds();
    youtubeSkipAds();
  }
});

storage().onChanged.addListener((changes, area) => {
  let video_setting = changes["video_setting"]["newValue"];
  if (video_setting.enable) {
    skipAds();
    youtubeSkipAds();
  }
});

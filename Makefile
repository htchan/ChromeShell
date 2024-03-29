.PHONY: run-web-ext build-web-ext chrome_version firefox_version firefox_android_version

run-web-ext:
	web-ext run -t firefox-android --adb-device ${DEVICE_ID} --firefox-apk org.mozilla.fenix

chrome_version:
	cp manifest/manifest.chrome.json manifest.json

firefox_version:
	cp manifest/manifest.firefox.json manifest.json

build-web-ext:
	web-ext build

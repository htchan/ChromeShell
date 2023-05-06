run_android_firefox_extension:
	cd firefox_android
	web-ext run -t firefox-android --adb-device R5CT12GQV4K --firefox-apk org.mozilla.fenix

chrome_version:
	cp manifest.chrome.json manifest.json

firefox_version:
	cp manifest.firefox.json manifest.json

firefox_android_version:
	cp manifest.firefox_android.json manifest.json

build_firefox_android_version:
	make firefox_android_version
	web-ext build
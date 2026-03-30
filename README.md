# Player Helper

A browser extension that automates video player interactions — speed control, ad skipping, and view mode switching for YouTube and Bilibili.

## Features

- **Speed control** — set a default playback speed for all video players, with keyboard shortcuts (`Ctrl+Shift+Up/Down`) to adjust on the fly
- **Ad skipping** — automatically skips YouTube ads (desktop and mobile)
- **View mode** — auto-switch to theater or fullscreen mode on YouTube and Bilibili
- **Ignore list** — skip speed changes for specific content types (e.g. music videos)
- **In-page panel** — floating speed indicator overlay with optional click-to-reapply

## Supported Sites

| Site | Speed | Ads | View Mode |
|------|-------|-----|-----------|
| YouTube (desktop) | ✅ | ✅ | ✅ |
| YouTube (mobile) | ✅ | ✅ | ✅ |
| Bilibili | ✅ | — | ✅ |
| Any site with `<video>` | ✅ | — | — |

## Installation

### Chrome

1. Clone or download this repo
2. Run `make chrome_version` (or copy `manifest/manifest.chrome.json` to `manifest.json`)
3. Open `chrome://extensions/`
4. Enable **Developer mode**
5. Click **Load unpacked** and select the repo folder

### Firefox

1. Clone or download this repo
2. Run `make firefox_version` (or copy `manifest/manifest.firefox.json` to `manifest.json`)
3. Open `about:debugging#/runtime/this-firefox`
4. Click **Load Temporary Add-on** and select `manifest.json`

### Firefox Android

1. Set up `adb` and connect your device
2. Run `make firefox_version && DEVICE_ID=<your-device> make run-web-ext`

## Usage

Click the extension icon to open the popup panel:

- **Extension Enable/Disable** — master toggle
- **Speed** — enable/disable + set value (0.25–8x) or use preset buttons
- **Mode** — Normal / Theater / Full
- **Ignore** — select content types to skip speed changes for (e.g. Music, 音乐)
- **Panel** — show/hide the floating speed overlay; optionally click it to re-apply settings

### Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl+Shift+Up` | Speed up (+0.25x) |
| `Ctrl+Shift+Down` | Slow down (-0.25x) |

## Development

```bash
# Install dependencies
npm install
```

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run lint` | Run ESLint on `src/` and `popup/js/` to check for errors |
| `npm run lint:fix` | Run ESLint and auto-fix fixable issues |
| `npm run build:chrome` | Set up manifest for Chrome and package (`make chrome_version build-web-ext`) |
| `npm run build:firefox` | Set up manifest for Firefox and package (`make firefox_version build-web-ext`) |

### Loading for Development

**Chrome:**
```bash
npm run build:chrome
# Produces a .zip in web-ext-artifacts/
# Or load unpacked at chrome://extensions/
```

**Firefox:**
```bash
npm run build:firefox
# Produces a .zip in web-ext-artifacts/
# Load temporary add-on at about:debugging#/runtime/this-firefox
```

**Firefox Android:**
```bash
npm run build:firefox
DEVICE_ID=<your-device> make run-web-ext
```

## Project Structure

```
src/
├── helper.js              # Shared utilities (sleep, browser detection, storage)
├── const.js               # Constants and log headers
├── videoEventHandler.js   # Custom event listener registry
├── speed.js               # Generic video speed control
├── in_app_panel.js        # Floating speed overlay panel
├── background.js          # Service worker (settings init, keyboard shortcuts)
├── youtube/
│   ├── ads.js             # YouTube ad skipper
│   ├── view.js            # YouTube view mode switcher
│   └── speed.js           # YouTube-specific speed (via settings menu)
├── mobile_youtube/
│   ├── ads.js             # Mobile YouTube ad skipper
│   └── view.js            # Mobile YouTube fullscreen
└── bilibili/
    └── view.js            # Bilibili view mode switcher
manifest/
├── manifest.chrome.json   # Chrome MV3 manifest
└── manifest.firefox.json  # Firefox MV3 manifest
popup/
├── index.html             # Extension popup UI
├── js/index.js            # Popup logic
└── css/switch.css         # Popup styles
```

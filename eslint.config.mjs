import js from "@eslint/js";

export default [
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "script",
      globals: {
        // Browser globals
        document: "readonly",
        window: "readonly",
        console: "readonly",
        setTimeout: "readonly",
        navigator: "readonly",
        MutationObserver: "readonly",
        Array: "readonly",
        Promise: "readonly",
        RegExp: "readonly",
        JSON: "readonly",
        Number: "readonly",
        Math: "readonly",

        // Extension APIs
        chrome: "readonly",
        browser: "readonly",
        importScripts: "readonly",

        // Shared globals from helper.js (loaded as content scripts)
        sleep: "readonly",
        detectBrowser: "readonly",
        storage: "readonly",
        runtime: "readonly",
        loadMeta: "readonly",

        // Shared globals from const.js
        SPEED_MAX_RETRY: "readonly",
        VIEW_MAX_RETRY: "readonly",
        UI_INTERACTION_INTERVAL: "readonly",
        EXTENSION_NAME: "readonly",
        HEADER_GENERIC: "readonly",
        HEADER_YOUTUBE: "readonly",
        HEADER_MOBILE: "readonly",
        HEADER_SPEED: "readonly",
        HEADER_VIEW: "readonly",
        HEADER_ADS: "readonly",

        // Shared globals from videoEventHandler.js
        addEventListener: "readonly",
        removeEventListener: "readonly",
      },
    },
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "error",
    },
  },
];

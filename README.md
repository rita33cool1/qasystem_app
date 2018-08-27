# NativeScript Vue.js Template

This repo serves as the starting point for NativeScript + Vue.js projects, using [nativescript-vue](https://github.com/rigor789/nativescript-vue).

## Install

相關說明 : 
https://docs.nativescript.org/start/quick-setup

1.  Install Node.js

2.  Install NativeScript tools (see http://docs.nativescript.org/start/quick-setup)
    npm install -g nativescript
    選項皆選擇(Y)es

3.  install android requirement

4.  Run in Android or iOS

```bash
tns run android
tns run ios
```

5. build apk

```bash
tns build android --release --key-store-path my-release-key.jks  --key-store-password 123456789 --key-store-alias key_qasystem --key-store-alias-password 123456789
```


## Upload to smartphone

path = apk/ver-x.x.x.apk

## Templates

This template contains a number of app samples that you can use as the starting point of your app. To experiment, try copying and pasting the code from `app-with-list-view.js`, `app-with-router.js`, `app-with-tab-view.js`, or `app-with-vmodel.js` into your app’s `app.js` file.

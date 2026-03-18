# Ludogo

A polished React Native Ludo game with animations, sound effects, game state persistence, and a smooth multi-screen flow.

[![Platform](https://img.shields.io/badge/platform-Android%20%7C%20iOS-0f766e)](https://reactnative.dev)
[![React Native](https://img.shields.io/badge/React%20Native-0.83.1-20232a)](https://reactnative.dev)
[![Redux Toolkit](https://img.shields.io/badge/Redux%20Toolkit-2.11.2-593d88)](https://redux-toolkit.js.org)

## Direct APK Download

You can download the Android build files directly from this repository path:

- [Download Release APK](android/app/build/outputs/apk/release/app-release.apk)
- [Download Debug APK](android/app/build/outputs/apk/debug/app-debug.apk)

If your repository is public on GitHub and these files are committed, these links work as one-click downloads from the README.

## Highlights

- Classic Ludo board experience in a mobile-first UI
- Animated home and gameplay screens using Lottie and React Native Animated API
- Sound effects and game feedback with in-game triggers
- Persistent game progress with Redux + redux-persist + MMKV
- Modular component architecture for board, dice, paths, pockets, and overlays

## Tech Stack

- React Native 0.83.1
- React 19
- Redux Toolkit + React Redux
- React Navigation (Native Stack)
- Lottie React Native
- React Native SVG

## Project Structure

```text
src/
	assets/
	components/
	constants/
	helpers/
	navigation/
	redux/
	screens/
```

## Getting Started

### Prerequisites

- Node.js 20+
- Android Studio (for Android builds)
- Xcode + CocoaPods (for iOS builds on macOS)

### Install Dependencies

```bash
npm install
```

### Start Metro

```bash
npm start
```

### Run on Android

```bash
npm run android
```

### Run on iOS

```bash
bundle install
bundle exec pod install
npm run ios
```

## Build APK

Generate a release APK:

```bash
cd android
./gradlew assembleRelease
```

Output path:

```text
android/app/build/outputs/apk/release/app-release.apk
```

Generate a debug APK:

```bash
cd android
./gradlew assembleDebug
```

Output path:

```text
android/app/build/outputs/apk/debug/app-debug.apk
```

## Scripts

- `npm start` - Start Metro bundler
- `npm run android` - Run Android app
- `npm run ios` - Run iOS app
- `npm test` - Run tests
- `npm run lint` - Run lint checks

## Author

- Vivek Bisen


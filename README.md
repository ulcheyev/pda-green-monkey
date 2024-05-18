# Green Monkey

Green Monkey is a practical tool designed to simplify shopping planning and organization. The application offers users
an intuitive and user-friendly interface for easy creation and management of shopping lists.

## Prerequisites

- Node.js v20.\* (tested on v20.9.0)
- ExpoCLI (tested on v6.3.10)

## Download the Mobile App

For Android users, you can download our mobile application directly by clicking on the link below:

[Download the Mobile App](APP)

Ensure your device runs Android 5.0 or later to support the app.

## Expose locally

1. **Install Node.js and npm**<br/>
   Make sure you have Node.js and npm installed. You can download them from the
   official [Node.js website](https://nodejs.org/en).
2. **Install Expo CLI**<br/>
   Install the Expo CLI globally by running the following command in your terminal or command prompt:

```shell
$ npm install -g expo-cli
```

3. **Navigate to project directory**
4. **Install dependencies**<br/>
   Run the following command:

```shell
$ npm install
```

5. **Run the project**<br/>
   Run the project using the command:

```shell
$ npx expo start
```

6. **Choose how to run the application**<br/>
   After starting the project, you will be prompted to choose how you want to run the application:
   - iOS Emulator/Android Emulator
   - `Recommended` Scan QR Code with Expo Go: [Install the Expo Go app](https://expo.dev/go) on your mobile device.
     Then can scan the QR code in the Expo Developer Tools to run the application on your device.
   - Run on Android device/emulator
   - Run on iOS simulator

## For collaborators

1. Install gpg
2. Provide gpg public key
3. Install git crypt
4. After fetching data / cloning repository use

```shell
$ git-crypt unlock
```

5. build app command

```shell
$ eas build --profile "production/preview" --platform "all/android/ios"
```

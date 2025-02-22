# Netflix Clone (React Native)

This is a Netflix-like mobile application built using React Native and Expo. It fetches movie data from TheMovieDB API and displays them in a well-structured UI. The design is implemented using NativeWind (Tailwind for React Native) to ensure a modern and responsive layout.

## Features

-Fetches trending movies and TV shows from TheMovieDB API

-Displays movie details such as title, rating, and description

-Categorized sections for different genres

-Responsive UI with NativeWind

-Smooth navigation and clean animations

-Built using Expo for easier development and testing

## Prerequisites

Before running this project, ensure you have the following installed:

Node.js (>= 14)

Expo CLI (npm install -g expo-cli)

Android Studio (for Android Emulator) or Xcode (for iOS Simulator)

TheMovieDB API Key (Create an account at TheMovieDB and get an API key)


### 1. Clone the Repository

```bash
git clone https://github.com/ayhan219/React-Native-Movie-App.git
```

### 2. Install Dependencies
```bash
npm install  # or yarn install
```

### 3. Create a folder named key and inside it, create a file called API.js. Then, export the key as follows

const key = {
   "your key"
};
export default key;

### 4. Run the App

```bash
npx expo start
```

Then, scan the QR code with your Expo Go app or run it on an emulator:

Android: npx expo run:android

iOS: npx expo run:ios


## Technologies Used

React Native – for building the mobile application

Expo – for fast development and testing

NativeWind – Tailwind CSS for React Native

Axios – for fetching data from TheMovieDB API

React Navigation – for handling navigation

## Screenshots

![image](https://github.com/user-attachments/assets/d2036c39-d2d1-4cc6-8306-b43a15323e3a)

![image](https://github.com/user-attachments/assets/60aaab70-7927-4b64-8a89-28dafb2a960e)

![image](https://github.com/user-attachments/assets/450cfa9b-a782-41af-8ff4-12ebe692b1b8)





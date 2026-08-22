# 🛡️ Safeway - Travel Safety React Native Expo App

Safeway is a modern React Native & Expo application designed to provide travelers with real-time safety tools, community reviews, emergency SOS alerts, and safe route navigation.

## 🚀 Features

- **📱 Interactive Onboarding Flow**: 4-slide interactive carousel with custom vector illustrations.
- **🛡️ Real-time Safety Status**: Instant location safety rating and reviews.
- **📍 Feature Action Cards**: Safe Route navigation, Emergency Help, Location Sharing, and Location Reviews.
- **👥 Community Feed**: Verified traveler updates, road & border conditions, photo posts, and engagement counters.
- **🌙 1-Click Dark Mode Toggle**: Instant light and dark mode switching with high-contrast UI.
- **⚡ Fixed Bottom Navigation Bar**: Home, Feed, Floating Emergency SOS Shield Button, Chat, and Profile tabs.
- **🏗️ Enterprise Production Architecture**: Feature-First modular structure with TypeScript and Expo Router group routes (`(onboarding)`, `(auth)`, `(main)`).

## 📁 Project Structure

```text
react-native-expo/
├── app/                           # Expo Router Group Routes
│   ├── (auth)/                    # Sign In & Sign Up Routes
│   ├── (main)/                    # Home & Details Routes
│   ├── (onboarding)/              # App Entry & Intro Carousel Route
│   └── _layout.tsx                # Root Layout
├── src/                           # Main Application Source Code
│   ├── components/                # Atomic UI Components (Button, Input)
│   ├── context/                   # Global ThemeContext (Light/Dark Mode)
│   ├── features/                  # Feature Modules (home, onboarding, auth)
│   │   ├── home/
│   │   │   ├── components/        # HomeHeader, SafetyStatusCard, FeatureGrid, CommunityPostCard, BottomNavbar
│   │   │   └── screens/
│   │   └── onboarding/
│   └── types/                     # TypeScript Interface Definitions
└── assets/                        # Generated Custom Vector Assets & Images
```

## 💻 Tech Stack

- **Framework**: [Expo](https://expo.dev/) (SDK 54) & [React Native](https://reactnative.dev/)
- **Routing**: [Expo Router](https://docs.expo.dev/router/introduction/) (File-based Routing)
- **Styling**: [NativeWind v4](https://www.nativewind.dev/) (Tailwind CSS for React Native)
- **Language**: [TypeScript](https://www.typescriptlang.org/)

## ⚙️ Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Development Server
```bash
npx expo start -c
```

### 3. Run on Android Emulator
Press `a` in the terminal to launch the app on your running Android Studio Emulator.

---
Developed for **Safeway** 🛡️

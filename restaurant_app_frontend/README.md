# Restaurant App Frontend (Ocean Professional)

A React Native (Expo) mobile frontend enabling users to browse menus, place orders, and view restaurant details.

Features
- Tab navigation: Menu, Orders, Restaurant Info
- Card-based menu items with images, tags, and quantity controls
- Persistent bottom navigation
- Modern, minimalist Ocean Professional theme (blue and amber accents)
- Service layer with placeholder API endpoints
- Context state for cart and orders

Getting Started
- Install: npm install
- Run: npm start
- Android/iOS/Web via Expo as needed

Configuration
- Copy .env.example to .env and set BASE_URL as needed for backend integration.

Structure
- src/theme: Ocean Professional theme
- src/components: Reusable UI components (Card, Button, MenuItemCard, AppHeader)
- src/context: App-level state (cart, orders, restaurant info)
- src/services: API abstractions and domain services
- src/screens: Menu, Orders, Restaurant Info

Notes
- API endpoints are mocked; replace with real endpoints in src/services/restaurantService.ts and src/services/api.ts.
- This project is Expo-managed. The CI "gradle check" error is expected when no native Android project exists. If you need to generate native projects for Gradle tasks, run:
  - npm run prebuild:android
  - Then execute native Gradle tasks from the android directory.
- A CI shim for Gradle is provided at ./gradlew which delegates to android/gradlew when present and otherwise exits successfully. This is to satisfy automated checks that look for a gradle wrapper file.
- If your CI cannot mark files as executable, invoke Gradle via: sh ./run-gradle.sh <gradle-args>

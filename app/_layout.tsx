"use client"

import { useEffect } from "react"
import { Slot, useRouter, useSegments } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "../firebase/config"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useColorScheme } from "react-native"
import { ThemeProvider } from "@react-navigation/native"
import { SplashScreen } from "expo-router"
import { useFonts } from "expo-font"
import { PaperProvider, MD3LightTheme, MD3DarkTheme, adaptNavigationTheme } from "react-native-paper"
import { DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationDefaultTheme } from "@react-navigation/native"
import { useFrameworkReady } from '@/hooks/useFrameworkReady'

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync()

const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
})

const CombinedDefaultTheme = {
  ...MD3LightTheme,
  ...LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    ...LightTheme.colors,
    primary: "#166534",
    secondary: "#15803d",
  },
  fonts: MD3LightTheme.fonts,
}

const CombinedDarkTheme = {
  ...MD3DarkTheme,
  ...DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    ...DarkTheme.colors,
    primary: "#22c55e",
    secondary: "#16a34a",
  },
  fonts: MD3DarkTheme.fonts,
}

export default function RootLayout() {
  useFrameworkReady();
  const [loaded] = useFonts({
    // You can add custom fonts here if needed
  })

  const router = useRouter()
  const segments = useSegments()
  const colorScheme = useColorScheme()
  const theme = colorScheme === "dark" ? CombinedDarkTheme : CombinedDefaultTheme

  useEffect(() => {
    if (!loaded) {
      return
    }

    // Hide the splash screen after resources are loaded
    SplashScreen.hideAsync()
  }, [loaded])

  useEffect(() => {
    // Check if it's the first launch
    const checkFirstLaunch = async () => {
      try {
        const value = await AsyncStorage.getItem("@first_launch")
        if (value === null) {
          await AsyncStorage.setItem("@first_launch", "false")
          router.replace("/onboarding")
        }
      } catch (error) {
        console.log(error)
      }
    }

    checkFirstLaunch()

    // Check authentication state
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      const inAuthGroup = segments[0] === "(auth)"
      const inAppGroup = segments[0] === "(app)"

      if (!user && !inAuthGroup && segments[0] !== "onboarding") {
        // Redirect to the login page if not logged in
        router.replace("/(auth)/login")
      } else if (user && (inAuthGroup || segments[0] === "onboarding")) {
        // Redirect to the permissions screen if logged in but still on auth screens
        router.replace("/(app)/permissions")
      } else if (user && !inAppGroup && segments[0] !== "onboarding") {
        // Redirect to the dashboard if logged in but not in app group
        router.replace("/(app)/dashboard")
      }
    })

    return unsubscribe
  }, [segments])

  if (!loaded) {
    return null
  }

  return (
    <PaperProvider theme={CombinedDefaultTheme}>
      <ThemeProvider value={colorScheme === "dark" ? NavigationDarkTheme : NavigationDefaultTheme}>
        <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
        <Slot />
      </ThemeProvider>
    </PaperProvider>
  )
}
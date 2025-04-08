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

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const [loaded] = useFonts({
    // You can add custom fonts here if needed
  })

  const router = useRouter()
  const segments = useSegments()
  const colorScheme = useColorScheme()

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
    <ThemeProvider value={{
      dark: colorScheme === "dark",
      colors: {
        primary: colorScheme === "dark" ? "#fff" : "#000",
        background: colorScheme === "dark" ? "#000" : "#fff",
        card: colorScheme === "dark" ? "#1c1c1c" : "#fff",
        text: colorScheme === "dark" ? "#fff" : "#000",
        border: colorScheme === "dark" ? "#272729" : "#d8d8d8",
        notification: "#ff453a",
      },
      fonts: {
        regular: { fontFamily: "System", fontWeight: "400" },
        medium: { fontFamily: "System", fontWeight: "500" },
        bold: { fontFamily: "System", fontWeight: "700" },
        heavy: { fontFamily: "System", fontWeight: "900" }
      }
    }}>
      <StatusBar style="auto" />
      <Slot />
    </ThemeProvider>
  )
}


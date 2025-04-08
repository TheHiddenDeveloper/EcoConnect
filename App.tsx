"use client"

import { useState, useEffect } from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { StatusBar } from "expo-status-bar"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "./firebase/config"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { SafeAreaProvider } from "react-native-safe-area-context"

import SplashScreen from "./screens/SplashScreen"
import OnboardingScreen from "./screens/OnboardingScreen"
import LoginScreen from "./screens/LoginScreen"
import SignupScreen from "./screens/SignupScreen"
import PermissionsScreen from "./screens/PermissionsScreen"
import DashboardScreen from "./screens/DashboardScreen"

const Stack = createNativeStackNavigator()

export default function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const [isFirstLaunch, setIsFirstLaunch] = useState<boolean | null>(null)

  useEffect(() => {
    // Check if it's the first launch
    const checkFirstLaunch = async () => {
      try {
        const value = await AsyncStorage.getItem("@first_launch")
        if (value === null) {
          await AsyncStorage.setItem("@first_launch", "false")
          setIsFirstLaunch(true)
        } else {
          setIsFirstLaunch(false)
        }
      } catch (error) {
        console.log(error)
        setIsFirstLaunch(false)
      }
    }

    checkFirstLaunch()

    // Check authentication state
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
      if (isLoading) {
        setTimeout(() => {
          setIsLoading(false)
        }, 2000) // Show splash screen for 2 seconds
      }
    })

    return unsubscribe
  }, [])

  if (isLoading) {
    return <SplashScreen />
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar style="auto" />
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {isFirstLaunch ? (
            <>
              <Stack.Screen name="Onboarding" component={OnboardingScreen} />
            </>
          ) : !user ? (
            <>
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Signup" component={SignupScreen} />
            </>
          ) : (
            <>
              <Stack.Screen name="Permissions" component={PermissionsScreen} />
              <Stack.Screen name="Dashboard" component={DashboardScreen} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  )
}

"use client"

import { useEffect } from "react"
import { View, Image, Animated } from "react-native"
import { StatusBar } from "expo-status-bar"
import { useRouter } from "expo-router"

export default function SplashScreen() {
  const router = useRouter()
  const fadeAnim = new Animated.Value(0)
  const scaleAnim = new Animated.Value(0.8)

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      }),
    ]).start()

    // Navigate after splash screen
    const timer = setTimeout(() => {
      router.replace("/(auth)/login")
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <View className="flex-1 items-center justify-center bg-green-800">
      <StatusBar style="light" />
      <Animated.View
        style={{
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }],
        }}
        className="items-center"
      >
        <View className="items-center">
          <Image source={require("../assets/carbon-logo.png")} className="w-40 h-40" resizeMode="contain" />
          <View className="mt-4">
            <Animated.Text className="text-white text-3xl font-bold">Carbon Credits</Animated.Text>
            <Animated.Text className="text-white text-lg text-center mt-2">Trade for a greener future</Animated.Text>
          </View>
        </View>
      </Animated.View>
    </View>
  )
}

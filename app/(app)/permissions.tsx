"use client"

import { useState } from "react"
import { View, Image } from "react-native"
import { StatusBar } from "expo-status-bar"
import * as Location from "expo-location"
import * as Notifications from "expo-notifications"
import { Camera } from "expo-camera"
import { useRouter } from "expo-router"
import { Surface, Text, Button } from "react-native-paper"

export default function PermissionsScreen() {
  const router = useRouter()
  const [locationPermission, setLocationPermission] = useState(false)
  const [notificationPermission, setNotificationPermission] = useState(false)
  const [cameraPermission, setCameraPermission] = useState(false)

  const requestLocationPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync()
    setLocationPermission(status === "granted")
  }

  const requestNotificationPermission = async () => {
    const { status } = await Notifications.requestPermissionsAsync()
    setNotificationPermission(status === "granted")
  }

  const requestCameraPermission = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync()
    setCameraPermission(status === "granted")
  }

  const handleContinue = () => {
    router.replace("/(app)/dashboard")
  }

  return (
    <View className="flex-1 bg-white dark:bg-gray-900">
      <StatusBar style="auto" />
      <View className="flex-1 px-6 pt-12">
        <View className="items-center mb-8">
          <Image source={require("../../assets/permissions.png")} className="w-40 h-40" resizeMode="contain" />
          <Text variant="headlineMedium" className="text-center mt-4">App Permissions</Text>
          <Text variant="bodyLarge" className="text-center mt-2">
            We need a few permissions to provide you with the best experience
          </Text>
        </View>

        <Surface className="p-6 rounded-xl mb-6">
          <Text variant="titleMedium" className="mb-2">Location</Text>
          <Text variant="bodyMedium" className="mb-3">
            We use your location to show you nearby carbon credit projects and opportunities
          </Text>
          <Button
            mode={locationPermission ? "outlined" : "contained"}
            onPress={requestLocationPermission}
          >
            {locationPermission ? "Granted" : "Allow Location Access"}
          </Button>
        </Surface>

        <Surface className="p-6 rounded-xl mb-6">
          <Text variant="titleMedium" className="mb-2">Notifications</Text>
          <Text variant="bodyMedium" className="mb-3">
            Stay updated on market changes, new opportunities, and transaction updates
          </Text>
          <Button
            mode={notificationPermission ? "outlined" : "contained"}
            onPress={requestNotificationPermission}
          >
            {notificationPermission ? "Granted" : "Allow Notifications"}
          </Button>
        </Surface>

        <Surface className="p-6 rounded-xl mb-8">
          <Text variant="titleMedium" className="mb-2">Camera</Text>
          <Text variant="bodyMedium" className="mb-3">
            Used for document scanning and verification of carbon credit projects
          </Text>
          <Button
            mode={cameraPermission ? "outlined" : "contained"}
            onPress={requestCameraPermission}
          >
            {cameraPermission ? "Granted" : "Allow Camera Access"}
          </Button>
        </Surface>

        <Button
          mode="contained"
          onPress={handleContinue}
          className="mb-8"
        >
          Continue to Dashboard
        </Button>

        <Text variant="bodySmall" className="text-center">
          You can change these permissions later in your device settings
        </Text>
      </View>
    </View>
  )
}
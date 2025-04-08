"use client"

import { useState } from "react"
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native"
import { StatusBar } from "expo-status-bar"
import * as Location from "expo-location"
import * as Notifications from "expo-notifications"
import { Camera } from "expo-camera"
import { useRouter } from "expo-router"

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
    <View className="flex-1 bg-white">
      <StatusBar style="dark" />
      <ScrollView className="flex-1 px-6 pt-12">
        <View className="items-center mb-8">
          <Image source={require("../../assets/permissions.png")} className="w-40 h-40" resizeMode="contain" />
          <Text className="text-green-800 text-3xl font-bold mt-4">App Permissions</Text>
          <Text className="text-gray-500 text-base mt-2 text-center">
            We need a few permissions to provide you with the best experience
          </Text>
        </View>

        <View className="mb-6">
          <View className="flex-row items-center mb-2">
            <View className={`w-6 h-6 rounded-full mr-2 ${locationPermission ? "bg-green-800" : "bg-gray-300"}`} />
            <Text className="text-gray-800 font-semibold text-lg">Location</Text>
          </View>
          <Text className="text-gray-600 mb-3 pl-8">
            We use your location to show you nearby carbon credit projects and opportunities
          </Text>
          <TouchableOpacity
            className={`py-2 px-4 rounded-lg border ${
              locationPermission ? "border-green-800 bg-green-50" : "border-gray-300 bg-white"
            }`}
            onPress={requestLocationPermission}
          >
            <Text className={`text-center font-medium ${locationPermission ? "text-green-800" : "text-gray-700"}`}>
              {locationPermission ? "Granted" : "Allow Location Access"}
            </Text>
          </TouchableOpacity>
        </View>

        <View className="mb-6">
          <View className="flex-row items-center mb-2">
            <View className={`w-6 h-6 rounded-full mr-2 ${notificationPermission ? "bg-green-800" : "bg-gray-300"}`} />
            <Text className="text-gray-800 font-semibold text-lg">Notifications</Text>
          </View>
          <Text className="text-gray-600 mb-3 pl-8">
            Stay updated on market changes, new opportunities, and transaction updates
          </Text>
          <TouchableOpacity
            className={`py-2 px-4 rounded-lg border ${
              notificationPermission ? "border-green-800 bg-green-50" : "border-gray-300 bg-white"
            }`}
            onPress={requestNotificationPermission}
          >
            <Text className={`text-center font-medium ${notificationPermission ? "text-green-800" : "text-gray-700"}`}>
              {notificationPermission ? "Granted" : "Allow Notifications"}
            </Text>
          </TouchableOpacity>
        </View>

        <View className="mb-8">
          <View className="flex-row items-center mb-2">
            <View className={`w-6 h-6 rounded-full mr-2 ${cameraPermission ? "bg-green-800" : "bg-gray-300"}`} />
            <Text className="text-gray-800 font-semibold text-lg">Camera</Text>
          </View>
          <Text className="text-gray-600 mb-3 pl-8">
            Used for document scanning and verification of carbon credit projects
          </Text>
          <TouchableOpacity
            className={`py-2 px-4 rounded-lg border ${
              cameraPermission ? "border-green-800 bg-green-50" : "border-gray-300 bg-white"
            }`}
            onPress={requestCameraPermission}
          >
            <Text className={`text-center font-medium ${cameraPermission ? "text-green-800" : "text-gray-700"}`}>
              {cameraPermission ? "Granted" : "Allow Camera Access"}
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity className="bg-green-800 py-4 rounded-lg items-center mb-8" onPress={handleContinue}>
          <Text className="text-white font-bold text-base">Continue to Dashboard</Text>
        </TouchableOpacity>

        <Text className="text-gray-500 text-center text-xs mb-8">
          You can change these permissions later in your device settings
        </Text>
      </ScrollView>
    </View>
  )
}

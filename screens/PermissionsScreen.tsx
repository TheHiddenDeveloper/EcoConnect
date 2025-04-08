"use client"

import { useState } from "react"
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from "react-native"
import { StatusBar } from "expo-status-bar"
import * as Location from "expo-location"
import * as Notifications from "expo-notifications"
import { Camera } from "expo-camera"
import { NavigationProp } from "@react-navigation/native"

export default function PermissionsScreen({ navigation }: { navigation: NavigationProp<any> }) {
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
    navigation.navigate("Dashboard")
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <Image source={require("../assets/permissions.png")} style={styles.image} resizeMode="contain" />
        <Text style={styles.title}>App Permissions</Text>
        <Text style={styles.subtitle}>We need a few permissions to provide you with the best experience</Text>
      </View>

      <View style={styles.permissionCard}>
        <View style={styles.permissionHeader}>
          <View style={[styles.permissionIcon, locationPermission ? styles.permissionGranted : {}]}></View>
          <Text style={styles.permissionTitle}>Location</Text>
        </View>
        <Text style={styles.permissionDescription}>
          We use your location to show you nearby carbon credit projects and opportunities
        </Text>
        <TouchableOpacity
          style={[styles.permissionButton, locationPermission ? styles.permissionButtonGranted : {}]}
          onPress={requestLocationPermission}
        >
          <Text style={[styles.permissionButtonText, locationPermission ? styles.permissionButtonTextGranted : {}]}>
            {locationPermission ? "Granted" : "Allow Location Access"}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.permissionCard}>
        <View style={styles.permissionHeader}>
          <View style={[styles.permissionIcon, notificationPermission ? styles.permissionGranted : {}]}></View>
          <Text style={styles.permissionTitle}>Notifications</Text>
        </View>
        <Text style={styles.permissionDescription}>
          Stay updated on market changes, new opportunities, and transaction updates
        </Text>
        <TouchableOpacity
          style={[styles.permissionButton, notificationPermission ? styles.permissionButtonGranted : {}]}
          onPress={requestNotificationPermission}
        >
          <Text style={[styles.permissionButtonText, notificationPermission ? styles.permissionButtonTextGranted : {}]}>
            {notificationPermission ? "Granted" : "Allow Notifications"}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.permissionCard}>
        <View style={styles.permissionHeader}>
          <View style={[styles.permissionIcon, cameraPermission ? styles.permissionGranted : {}]}></View>
          <Text style={styles.permissionTitle}>Camera</Text>
        </View>
        <Text style={styles.permissionDescription}>
          Used for document scanning and verification of carbon credit projects
        </Text>
        <TouchableOpacity
          style={[styles.permissionButton, cameraPermission ? styles.permissionButtonGranted : {}]}
          onPress={requestCameraPermission}
        >
          <Text style={[styles.permissionButtonText, cameraPermission ? styles.permissionButtonTextGranted : {}]}>
            {cameraPermission ? "Granted" : "Allow Camera Access"}
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
        <Text style={styles.continueButtonText}>Continue to Dashboard</Text>
      </TouchableOpacity>

      <Text style={styles.disclaimer}>You can change these permissions later in your device settings</Text>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  contentContainer: {
    padding: 24,
    paddingTop: 48,
  },
  header: {
    alignItems: "center",
    marginBottom: 32,
  },
  image: {
    width: 160,
    height: 160,
  },
  title: {
    color: "#166534",
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 16,
  },
  subtitle: {
    color: "#6b7280",
    fontSize: 16,
    textAlign: "center",
    marginTop: 8,
  },
  permissionCard: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  permissionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  permissionIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#d1d5db",
    marginRight: 8,
  },
  permissionGranted: {
    backgroundColor: "#166534",
  },
  permissionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1f2937",
  },
  permissionDescription: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 16,
    paddingLeft: 32,
  },
  permissionButton: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
  },
  permissionButtonGranted: {
    backgroundColor: "#f0fdf4",
    borderColor: "#166534",
  },
  permissionButtonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#4b5563",
  },
  permissionButtonTextGranted: {
    color: "#166534",
  },
  continueButton: {
    backgroundColor: "#166534",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    marginTop: 16,
    marginBottom: 24,
  },
  continueButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  disclaimer: {
    textAlign: "center",
    color: "#9ca3af",
    fontSize: 12,
    marginBottom: 32,
  },
})

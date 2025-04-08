"use client"

import { useEffect } from "react"
import { View, Image, StyleSheet, Animated } from "react-native"
import { StatusBar } from "expo-status-bar"

export default function SplashScreen() {
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
  }, [])

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Animated.View
        style={{
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }],
        }}
      >
        <View style={styles.content}>
          <Image source={require("../assets/carbon-logo.png")} style={styles.logo} resizeMode="contain" />
          <View style={styles.textContainer}>
            <Animated.Text style={styles.title}>Carbon Credits</Animated.Text>
            <Animated.Text style={styles.subtitle}>Trade for a greener future</Animated.Text>
          </View>
        </View>
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#166534", // Green-800
  },
  content: {
    alignItems: "center",
  },
  logo: {
    width: 160,
    height: 160,
    tintColor: "white",
  },
  textContainer: {
    marginTop: 16,
    alignItems: "center",
  },
  title: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
  },
  subtitle: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
    marginTop: 8,
  },
})

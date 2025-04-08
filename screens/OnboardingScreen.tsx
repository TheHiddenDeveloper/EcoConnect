"use client"

import { useState, useRef } from "react"
import { View, Text, Image, FlatList, Dimensions, StyleSheet, TouchableOpacity } from "react-native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { StatusBar } from "expo-status-bar"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { SafeAreaView } from "react-native-safe-area-context"

const { width } = Dimensions.get("window")

const slides = [
  {
    id: "1",
    image: require("../assets/onboarding-1.png"),
    title: "Welcome to Carbon Credits",
    subtitle: "Your marketplace for sustainable environmental impact",
  },
  {
    id: "2",
    image: require("../assets/onboarding-2.png"),
    title: "Buy & Sell Carbon Credits",
    subtitle: "Trade carbon credits with businesses and individuals worldwide",
  },
  {
    id: "3",
    image: require("../assets/onboarding-3.png"),
    title: "Track Your Impact",
    subtitle: "Monitor your environmental contribution in real-time",
  },
]
export default function OnboardingScreen({ navigation }: { navigation: NativeStackNavigationProp<any> }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const slidesRef = useRef<FlatList>(null)

  const viewableItemsChanged = useRef(({ viewableItems }: { viewableItems: Array<{ index: number | null }> }) => {
    if (viewableItems[0].index !== null) {
      setCurrentIndex(viewableItems[0].index)
    }
  }).current

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current

  const scrollTo = async () => {
    if (currentIndex < slides.length - 1 && slidesRef.current) {
      slidesRef.current.scrollToIndex({ index: currentIndex + 1 })
    } else {
      try {
        await AsyncStorage.setItem("@first_launch", "false")
        navigation.navigate("Login")
      } catch (err) {
        console.log(err)
      }
    }
  }

  const skip = async () => {
    try {
      await AsyncStorage.setItem("@first_launch", "false")
      navigation.navigate("Login")
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.slidesContainer}>
        <FlatList
          data={slides}
          renderItem={({ item }) => (
            <View style={[styles.slide, { width }]}>
              <Image source={item.image} style={styles.image} resizeMode="contain" />
              <View style={styles.textContainer}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.subtitle}>{item.subtitle}</Text>
              </View>
            </View>
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          keyExtractor={(item) => item.id}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig}
          ref={slidesRef}
        />
      </View>

      <View style={styles.pagination}>
        {slides.map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              index === currentIndex ? styles.paginationDotActive : styles.paginationDotInactive,
            ]}
          />
        ))}
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity onPress={skip} style={styles.skipButton}>
          <Text style={styles.skipButtonText}>Skip</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={scrollTo} style={styles.nextButton}>
          <Text style={styles.nextButtonText}>{currentIndex === slides.length - 1 ? "Get Started" : "Next"}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  slidesContainer: {
    flex: 3,
  },
  slide: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 50,
  },
  image: {
    width: 300,
    height: 300,
  },
  textContainer: {
    paddingHorizontal: 32,
  },
  title: {
    color: "#166534",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitle: {
    color: "#4b5563",
    fontSize: 16,
    textAlign: "center",
    marginTop: 8,
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 32,
  },
  paginationDot: {
    height: 10,
    width: 10,
    borderRadius: 5,
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: "#166534",
  },
  paginationDotInactive: {
    backgroundColor: "#d1d5db",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 32,
    paddingHorizontal: 32,
  },
  skipButton: {
    padding: 10,
  },
  skipButtonText: {
    color: "#6b7280",
    fontSize: 16,
    fontWeight: "500",
  },
  nextButton: {
    backgroundColor: "#166534",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
  },
  nextButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
})

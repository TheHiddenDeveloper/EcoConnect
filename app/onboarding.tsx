"use client"

import { useState, useRef } from "react"
import { View, Text, Image, FlatList, Dimensions, TouchableOpacity } from "react-native"
import { StatusBar } from "expo-status-bar"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useRouter } from "expo-router"

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

export default function OnboardingScreen() {
  const router = useRouter()
  const [currentIndex, setCurrentIndex] = useState(0)
  const slidesRef = useRef(null)

  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index)
  }).current

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current

  const scrollTo = async () => {
    if (currentIndex < slides.length - 1) {
      slidesRef.current.scrollToIndex({ index: currentIndex + 1 })
    } else {
      try {
        await AsyncStorage.setItem("@first_launch", "false")
        router.replace("/(auth)/login")
      } catch (err) {
        console.log(err)
      }
    }
  }

  const skip = async () => {
    try {
      await AsyncStorage.setItem("@first_launch", "false")
      router.replace("/(auth)/login")
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <View className="flex-1 bg-white">
      <StatusBar style="dark" />
      <View className="flex-[3]">
        <FlatList
          data={slides}
          renderItem={({ item }) => (
            <View className="items-center justify-center" style={{ width }}>
              <Image source={item.image} className="w-[300px] h-[300px]" resizeMode="contain" />
              <View className="px-8">
                <Text className="text-green-800 text-3xl font-bold text-center">{item.title}</Text>
                <Text className="text-gray-600 text-center text-base mt-2">{item.subtitle}</Text>
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

      <View className="flex-row justify-center mb-8">
        {slides.map((_, index) => (
          <View
            key={index}
            className={`h-2.5 w-2.5 rounded-full mx-1 ${index === currentIndex ? "bg-green-800" : "bg-gray-300"}`}
          />
        ))}
      </View>

      <View className="flex-row justify-between items-center mb-8 px-8">
        <TouchableOpacity onPress={skip}>
          <Text className="text-gray-500 font-semibold text-base">Skip</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={scrollTo} className="bg-green-800 px-6 py-3 rounded-full">
          <Text className="text-white font-semibold text-base">
            {currentIndex === slides.length - 1 ? "Get Started" : "Next"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}


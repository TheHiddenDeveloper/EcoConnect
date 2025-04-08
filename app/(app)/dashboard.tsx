"use client"

import { useState } from "react"
import { View, Text, ScrollView, TouchableOpacity, Image, FlatList } from "react-native"
import { StatusBar } from "expo-status-bar"
import { signOut } from "firebase/auth"
import { auth } from "../../firebase/config"
import { Home, BarChart2, Compass, ShoppingCart, User } from "lucide-react-native"

// Sample data for carbon credits
const carbonCredits = [
  {
    id: "1",
    name: "Amazon Rainforest Conservation",
    location: "Brazil",
    price: 12.5,
    available: 5000,
    image: require("../../assets/project-1.png"),
  },
  {
    id: "2",
    name: "Wind Farm Project",
    location: "Denmark",
    price: 9.75,
    available: 3200,
    image: require("../../assets/project-2.png"),
  },
  {
    id: "3",
    name: "Solar Energy Initiative",
    location: "India",
    price: 8.25,
    available: 7500,
    image: require("../../assets/project-3.png"),
  },
]

// Sample data for user's portfolio
const portfolio = [
  {
    id: "1",
    name: "Reforestation Project",
    amount: 10,
    value: 125.0,
    change: "+2.5%",
  },
  {
    id: "2",
    name: "Clean Energy Fund",
    amount: 5,
    value: 48.75,
    change: "+1.2%",
  },
]

export default function DashboardScreen() {
  const [activeTab, setActiveTab] = useState("home")

  const handleSignOut = async () => {
    try {
      await signOut(auth)
      // Navigation will be handled by the auth state listener in _layout.tsx
    } catch (error) {
      console.error("Error signing out: ", error)
    }
  }

  return (
    <View className="flex-1 bg-gray-50">
      <StatusBar style="dark" />

      {/* Header */}
      <View className="bg-green-800 pt-12 pb-4 px-6">
        <View className="flex-row justify-between items-center">
          <View>
            <Text className="text-white text-lg font-bold">Hello, {auth.currentUser?.displayName || "User"}</Text>
            <Text className="text-green-100">Welcome to Carbon Credits</Text>
          </View>
          <TouchableOpacity onPress={handleSignOut}>
            <View className="bg-green-700 p-2 rounded-full">
              <User size={20} color="white" />
            </View>
          </TouchableOpacity>
        </View>

        {/* Balance Card */}
        <View className="bg-white rounded-xl p-4 mt-4 shadow-sm">
          <Text className="text-gray-500">Your Carbon Balance</Text>
          <Text className="text-3xl font-bold text-gray-800 mt-1">173.75 tCO₂e</Text>
          <View className="flex-row justify-between mt-2">
            <View>
              <Text className="text-gray-500 text-xs">Market Value</Text>
              <Text className="text-gray-800 font-semibold">$2,105.50</Text>
            </View>
            <View>
              <Text className="text-gray-500 text-xs">Impact Offset</Text>
              <Text className="text-gray-800 font-semibold">15.2 Tons</Text>
            </View>
            <TouchableOpacity className="bg-green-800 px-3 py-1 rounded-full">
              <Text className="text-white font-medium">Trade</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Main Content */}
      <ScrollView className="flex-1 px-6 pt-4">
        {/* Marketplace Section */}
        <View className="mb-6">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-xl font-bold text-gray-800">Marketplace</Text>
            <TouchableOpacity>
              <Text className="text-green-800 font-medium">See All</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={carbonCredits}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity className="bg-white mr-4 rounded-xl shadow-sm overflow-hidden w-64">
                <Image source={item.image} className="w-full h-32" resizeMode="cover" />
                <View className="p-3">
                  <Text className="text-gray-800 font-bold">{item.name}</Text>
                  <Text className="text-gray-500 text-xs">{item.location}</Text>
                  <View className="flex-row justify-between items-center mt-2">
                    <Text className="text-green-800 font-bold">${item.price.toFixed(2)}</Text>
                    <TouchableOpacity className="bg-green-800 px-3 py-1 rounded-full">
                      <Text className="text-white text-xs font-medium">Buy Now</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>

        {/* Portfolio Section */}
        <View className="mb-6">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-xl font-bold text-gray-800">Your Portfolio</Text>
            <TouchableOpacity>
              <Text className="text-green-800 font-medium">Details</Text>
            </TouchableOpacity>
          </View>

          {portfolio.map((item) => (
            <View key={item.id} className="bg-white mb-3 p-4 rounded-xl shadow-sm">
              <View className="flex-row justify-between items-center">
                <View>
                  <Text className="text-gray-800 font-bold">{item.name}</Text>
                  <Text className="text-gray-500 text-xs">{item.amount} Credits</Text>
                </View>
                <View>
                  <Text className="text-gray-800 font-bold">${item.value.toFixed(2)}</Text>
                  <Text className={`text-xs ${item.change.includes("+") ? "text-green-600" : "text-red-600"}`}>
                    {item.change}
                  </Text>
                </View>
              </View>
            </View>
          ))}

          <TouchableOpacity className="bg-gray-100 p-3 rounded-xl items-center">
            <Text className="text-green-800 font-medium">View All Transactions</Text>
          </TouchableOpacity>
        </View>

        {/* Impact Section */}
        <View className="mb-8">
          <Text className="text-xl font-bold text-gray-800 mb-4">Your Impact</Text>
          <View className="bg-white p-4 rounded-xl shadow-sm">
            <View className="flex-row justify-between mb-4">
              <View className="items-center">
                <Text className="text-gray-500 text-xs">Trees Planted</Text>
                <Text className="text-gray-800 font-bold text-lg">124</Text>
              </View>
              <View className="items-center">
                <Text className="text-gray-500 text-xs">CO₂ Reduced</Text>
                <Text className="text-gray-800 font-bold text-lg">15.2 Tons</Text>
              </View>
              <View className="items-center">
                <Text className="text-gray-500 text-xs">Projects Supported</Text>
                <Text className="text-gray-800 font-bold text-lg">7</Text>
              </View>
            </View>
            <TouchableOpacity className="bg-green-50 p-3 rounded-xl items-center">
              <Text className="text-green-800 font-medium">View Impact Report</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View className="flex-row justify-between items-center bg-white px-6 py-3 border-t border-gray-200">
        <TouchableOpacity className="items-center" onPress={() => setActiveTab("home")}>
          <Home size={24} color={activeTab === "home" ? "#166534" : "#9ca3af"} />
          <Text className={activeTab === "home" ? "text-green-800" : "text-gray-400"}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity className="items-center" onPress={() => setActiveTab("market")}>
          <ShoppingCart size={24} color={activeTab === "market" ? "#166534" : "#9ca3af"} />
          <Text className={activeTab === "market" ? "text-green-800" : "text-gray-400"}>Market</Text>
        </TouchableOpacity>

        <TouchableOpacity className="items-center" onPress={() => setActiveTab("explore")}>
          <Compass size={24} color={activeTab === "explore" ? "#166534" : "#9ca3af"} />
          <Text className={activeTab === "explore" ? "text-green-800" : "text-gray-400"}>Explore</Text>
        </TouchableOpacity>

        <TouchableOpacity className="items-center" onPress={() => setActiveTab("portfolio")}>
          <BarChart2 size={24} color={activeTab === "portfolio" ? "#166534" : "#9ca3af"} />
          <Text className={activeTab === "portfolio" ? "text-green-800" : "text-gray-400"}>Portfolio</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}


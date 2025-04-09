"use client"

import { useState } from "react"
import { View, ScrollView, Image, FlatList } from "react-native"
import { StatusBar } from "expo-status-bar"
import { signOut } from "firebase/auth"
import { auth } from "../../firebase/config"
import { Chrome as Home, ChartBar as BarChart2, Compass, ShoppingCart } from "lucide-react-native"
import { Surface, Text, Button, Card, IconButton, BottomNavigation } from "react-native-paper"

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
  const [index, setIndex] = useState(0)

  const handleSignOut = async () => {
    try {
      await signOut(auth)
      // Navigation will be handled by the auth state listener in _layout.tsx
    } catch (error) {
      console.error("Error signing out: ", error)
    }
  }

  const routes = [
    { key: "home", title: "Home", focusedIcon: "home" },
    { key: "market", title: "Market", focusedIcon: "shopping" },
    { key: "explore", title: "Explore", focusedIcon: "compass" },
    { key: "portfolio", title: "Portfolio", focusedIcon: "chart-line" },
  ]

  return (
    <View className="flex-1 bg-gray-50 dark:bg-gray-900">
      <StatusBar style="auto" />

      <Surface className="pt-12 pb-4 px-6">
        <View className="flex-row justify-between items-center">
          <View>
            <Text variant="titleLarge">Hello, {auth.currentUser?.displayName || "User"}</Text>
            <Text variant="bodyMedium">Welcome to Carbon Credits</Text>
          </View>
          <IconButton icon="logout" size={24} onPress={handleSignOut} />
        </View>

        <Card className="mt-4">
          <Card.Content>
            <Text variant="bodyMedium">Your Carbon Balance</Text>
            <Text variant="headlineLarge" className="mt-1">173.75 tCO₂e</Text>
            <View className="flex-row justify-between mt-2">
              <View>
                <Text variant="bodySmall">Market Value</Text>
                <Text variant="titleMedium">$2,105.50</Text>
              </View>
              <View>
                <Text variant="bodySmall">Impact Offset</Text>
                <Text variant="titleMedium">15.2 Tons</Text>
              </View>
              <Button mode="contained-tonal">Trade</Button>
            </View>
          </Card.Content>
        </Card>
      </Surface>

      <ScrollView className="flex-1 px-6 pt-4">
        <View className="mb-6">
          <View className="flex-row justify-between items-center mb-4">
            <Text variant="titleLarge">Marketplace</Text>
            <Button mode="text">See All</Button>
          </View>

          <FlatList
            data={carbonCredits}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Card className="mr-4 w-64">
                <Card.Cover source={item.image} />
                <Card.Content className="p-3">
                  <Text variant="titleMedium">{item.name}</Text>
                  <Text variant="bodySmall">{item.location}</Text>
                  <View className="flex-row justify-between items-center mt-2">
                    <Text variant="titleMedium">${item.price.toFixed(2)}</Text>
                    <Button mode="contained-tonal" compact>Buy Now</Button>
                  </View>
                </Card.Content>
              </Card>
            )}
          />
        </View>

        <View className="mb-6">
          <View className="flex-row justify-between items-center mb-4">
            <Text variant="titleLarge">Your Portfolio</Text>
            <Button mode="text">Details</Button>
          </View>

          {portfolio.map((item) => (
            <Card key={item.id} className="mb-3">
              <Card.Content>
                <View className="flex-row justify-between items-center">
                  <View>
                    <Text variant="titleMedium">{item.name}</Text>
                    <Text variant="bodySmall">{item.amount} Credits</Text>
                  </View>
                  <View>
                    <Text variant="titleMedium">${item.value.toFixed(2)}</Text>
                    <Text
                      variant="bodySmall"
                      className={item.change.includes("+") ? "text-green-600" : "text-red-600"}
                    >
                      {item.change}
                    </Text>
                  </View>
                </View>
              </Card.Content>
            </Card>
          ))}

          <Button mode="outlined" className="mb-6">View All Transactions</Button>
        </View>

        <View className="mb-8">
          <Text variant="titleLarge" className="mb-4">Your Impact</Text>
          <Card>
            <Card.Content>
              <View className="flex-row justify-between mb-4">
                <View className="items-center">
                  <Text variant="bodySmall">Trees Planted</Text>
                  <Text variant="headlineSmall">124</Text>
                </View>
                <View className="items-center">
                  <Text variant="bodySmall">CO₂ Reduced</Text>
                  <Text variant="headlineSmall">15.2 Tons</Text>
                </View>
                <View className="items-center">
                  <Text variant="bodySmall">Projects Supported</Text>
                  <Text variant="headlineSmall">7</Text>
                </View>
              </View>
              <Button mode="outlined">View Impact Report</Button>
            </Card.Content>
          </Card>
        </View>
      </ScrollView>

      <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={() => null}
      />
    </View>
  )
}
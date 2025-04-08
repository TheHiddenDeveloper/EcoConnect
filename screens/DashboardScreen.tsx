"use client"

import { useState } from "react"
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, FlatList } from "react-native"
import { StatusBar } from "expo-status-bar"
import { signOut } from "firebase/auth"
import { auth } from "../firebase/config"

// Sample data for carbon credits
const carbonCredits = [
  {
    id: "1",
    name: "Amazon Rainforest Conservation",
    location: "Brazil",
    price: 12.5,
    available: 5000,
    image: require("../assets/project-1.png"),
  },
  {
    id: "2",
    name: "Wind Farm Project",
    location: "Denmark",
    price: 9.75,
    available: 3200,
    image: require("../assets/project-2.png"),
  },
  {
    id: "3",
    name: "Solar Energy Initiative",
    location: "India",
    price: 8.25,
    available: 7500,
    image: require("../assets/project-3.png"),
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
      // Navigation will be handled by the auth state listener in App.js
    } catch (error) {
      console.error("Error signing out: ", error)
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.headerTitle}>Hello, {auth.currentUser?.displayName || "User"}</Text>
            <Text style={styles.headerSubtitle}>Welcome to Carbon Credits</Text>
          </View>
          <TouchableOpacity style={styles.profileButton} onPress={handleSignOut}>
            <Text style={styles.profileButtonText}>Sign Out</Text>
          </TouchableOpacity>
        </View>

        {/* Balance Card */}
        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Your Carbon Balance</Text>
          <Text style={styles.balanceValue}>173.75 tCO₂e</Text>
          <View style={styles.balanceDetails}>
            <View>
              <Text style={styles.detailLabel}>Market Value</Text>
              <Text style={styles.detailValue}>$2,105.50</Text>
            </View>
            <View>
              <Text style={styles.detailLabel}>Impact Offset</Text>
              <Text style={styles.detailValue}>15.2 Tons</Text>
            </View>
            <TouchableOpacity style={styles.tradeButton}>
              <Text style={styles.tradeButtonText}>Trade</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Main Content */}
      <ScrollView style={styles.content}>
        {/* Marketplace Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Marketplace</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={carbonCredits}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.marketCard}>
                <Image source={item.image} style={styles.marketCardImage} />
                <View style={styles.marketCardContent}>
                  <Text style={styles.marketCardTitle}>{item.name}</Text>
                  <Text style={styles.marketCardLocation}>{item.location}</Text>
                  <View style={styles.marketCardFooter}>
                    <Text style={styles.marketCardPrice}>${item.price.toFixed(2)}</Text>
                    <TouchableOpacity style={styles.buyButton}>
                      <Text style={styles.buyButtonText}>Buy Now</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
          />
        </View>

        {/* Portfolio Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Your Portfolio</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>Details</Text>
            </TouchableOpacity>
          </View>

          {portfolio.map((item) => (
            <View key={item.id} style={styles.portfolioCard}>
              <View style={styles.portfolioCardContent}>
                <View>
                  <Text style={styles.portfolioCardTitle}>{item.name}</Text>
                  <Text style={styles.portfolioCardAmount}>{item.amount} Credits</Text>
                </View>
                <View>
                  <Text style={styles.portfolioCardValue}>${item.value.toFixed(2)}</Text>
                  <Text
                    style={[
                      styles.portfolioCardChange,
                      item.change.includes("+") ? styles.positiveChange : styles.negativeChange,
                    ]}
                  >
                    {item.change}
                  </Text>
                </View>
              </View>
            </View>
          ))}

          <TouchableOpacity style={styles.viewAllButton}>
            <Text style={styles.viewAllButtonText}>View All Transactions</Text>
          </TouchableOpacity>
        </View>

        {/* Impact Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Impact</Text>
          <View style={styles.impactCard}>
            <View style={styles.impactStats}>
              <View style={styles.impactStat}>
                <Text style={styles.impactLabel}>Trees Planted</Text>
                <Text style={styles.impactValue}>124</Text>
              </View>
              <View style={styles.impactStat}>
                <Text style={styles.impactLabel}>CO₂ Reduced</Text>
                <Text style={styles.impactValue}>15.2 Tons</Text>
              </View>
              <View style={styles.impactStat}>
                <Text style={styles.impactLabel}>Projects Supported</Text>
                <Text style={styles.impactValue}>7</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.impactButton}>
              <Text style={styles.impactButtonText}>View Impact Report</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => setActiveTab("home")}>
          <View style={[styles.navIcon, activeTab === "home" ? styles.activeNavIcon : {}]} />
          <Text style={[styles.navText, activeTab === "home" ? styles.activeNavText : {}]}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={() => setActiveTab("market")}>
          <View style={[styles.navIcon, activeTab === "market" ? styles.activeNavIcon : {}]} />
          <Text style={[styles.navText, activeTab === "market" ? styles.activeNavText : {}]}>Market</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={() => setActiveTab("explore")}>
          <View style={[styles.navIcon, activeTab === "explore" ? styles.activeNavIcon : {}]} />
          <Text style={[styles.navText, activeTab === "explore" ? styles.activeNavText : {}]}>Explore</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={() => setActiveTab("portfolio")}>
          <View style={[styles.navIcon, activeTab === "portfolio" ? styles.activeNavIcon : {}]} />
          <Text style={[styles.navText, activeTab === "portfolio" ? styles.activeNavText : {}]}>Portfolio</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
  },
  header: {
    backgroundColor: "#166534",
    paddingTop: 48,
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  headerSubtitle: {
    color: "#dcfce7",
    fontSize: 14,
  },
  profileButton: {
    backgroundColor: "#15803d",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  profileButtonText: {
    color: "white",
    fontWeight: "500",
  },
  balanceCard: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  balanceLabel: {
    color: "#6b7280",
    fontSize: 14,
  },
  balanceValue: {
    color: "#1f2937",
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 4,
  },
  balanceDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
  },
  detailLabel: {
    color: "#6b7280",
    fontSize: 12,
  },
  detailValue: {
    color: "#1f2937",
    fontSize: 16,
    fontWeight: "600",
  },
  tradeButton: {
    backgroundColor: "#166534",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  tradeButtonText: {
    color: "white",
    fontWeight: "600",
  },
  content: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    color: "#1f2937",
    fontSize: 20,
    fontWeight: "bold",
  },
  seeAllText: {
    color: "#166534",
    fontSize: 14,
    fontWeight: "600",
  },
  marketCard: {
    backgroundColor: "white",
    borderRadius: 12,
    width: 250,
    marginRight: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  marketCardImage: {
    width: "100%",
    height: 120,
  },
  marketCardContent: {
    padding: 12,
  },
  marketCardTitle: {
    color: "#1f2937",
    fontSize: 16,
    fontWeight: "600",
  },
  marketCardLocation: {
    color: "#6b7280",
    fontSize: 12,
  },
  marketCardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  marketCardPrice: {
    color: "#166534",
    fontSize: 16,
    fontWeight: "bold",
  },
  buyButton: {
    backgroundColor: "#166534",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  buyButtonText: {
    color: "white",
    fontSize: 12,
    fontWeight: "600",
  },
  portfolioCard: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  portfolioCardContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  portfolioCardTitle: {
    color: "#1f2937",
    fontSize: 16,
    fontWeight: "600",
  },
  portfolioCardAmount: {
    color: "#6b7280",
    fontSize: 12,
  },
  portfolioCardValue: {
    color: "#1f2937",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "right",
  },
  portfolioCardChange: {
    fontSize: 12,
    textAlign: "right",
  },
  positiveChange: {
    color: "#16a34a",
  },
  negativeChange: {
    color: "#dc2626",
  },
  viewAllButton: {
    backgroundColor: "#f3f4f6",
    borderRadius: 12,
    padding: 12,
    alignItems: "center",
    marginTop: 8,
  },
  viewAllButtonText: {
    color: "#166534",
    fontSize: 14,
    fontWeight: "600",
  },
  impactCard: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginTop: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  impactStats: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  impactStat: {
    alignItems: "center",
  },
  impactLabel: {
    color: "#6b7280",
    fontSize: 12,
    marginBottom: 4,
  },
  impactValue: {
    color: "#1f2937",
    fontSize: 18,
    fontWeight: "bold",
  },
  impactButton: {
    backgroundColor: "#f0fdf4",
    borderRadius: 12,
    padding: 12,
    alignItems: "center",
  },
  impactButtonText: {
    color: "#166534",
    fontSize: 14,
    fontWeight: "600",
  },
  bottomNav: {
    flexDirection: "row",
    backgroundColor: "white",
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
  },
  navItem: {
    flex: 1,
    alignItems: "center",
  },
  navIcon: {
    width: 24,
    height: 24,
    backgroundColor: "#9ca3af",
    borderRadius: 12,
    marginBottom: 4,
  },
  activeNavIcon: {
    backgroundColor: "#166534",
  },
  navText: {
    color: "#9ca3af",
    fontSize: 12,
  },
  activeNavText: {
    color: "#166534",
    fontWeight: "600",
  },
})

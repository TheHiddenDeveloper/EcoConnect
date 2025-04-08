"use client"

import { useState } from "react"
import { View, Text, TextInput, TouchableOpacity, Image, ActivityIndicator, Alert } from "react-native"
import { StatusBar } from "expo-status-bar"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../../firebase/config"
import { Link } from "expo-router"

export default function LoginScreen() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    if (email === "" || password === "") {
      Alert.alert("Error", "Please fill in all fields")
      return
    }

    setLoading(true)
    try {
      await signInWithEmailAndPassword(auth, email, password)
      // Navigation will be handled by the auth state listener in _layout.tsx
    } catch (error) {
      let errorMessage = "Login failed. Please try again."
      if (error.code === "auth/user-not-found" || error.code === "auth/wrong-password") {
        errorMessage = "Invalid email or password"
      } else if (error.code === "auth/invalid-email") {
        errorMessage = "Please enter a valid email address"
      }
      Alert.alert("Error", errorMessage)
      setLoading(false)
    }
  }

  return (
    <View className="flex-1 bg-white">
      <StatusBar style="dark" />
      <View className="flex-1 justify-center px-8">
        <View className="items-center mb-8">
          <Image source={require("../../assets/carbon-logo.png")} className="w-24 h-24" resizeMode="contain" />
          <Text className="text-green-800 text-3xl font-bold mt-4">Welcome Back</Text>
          <Text className="text-gray-500 text-base mt-2">Sign in to your account</Text>
        </View>

        <View className="mb-4">
          <Text className="text-gray-700 mb-2 font-medium">Email</Text>
          <TextInput
            className="bg-gray-100 px-4 py-3 rounded-lg"
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View className="mb-6">
          <Text className="text-gray-700 mb-2 font-medium">Password</Text>
          <TextInput
            className="bg-gray-100 px-4 py-3 rounded-lg"
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <TouchableOpacity className="self-end mt-2">
            <Text className="text-green-800 font-medium">Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          className="bg-green-800 py-4 rounded-lg items-center"
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-white font-bold text-base">Sign In</Text>
          )}
        </TouchableOpacity>

        <View className="flex-row justify-center mt-6">
          <Text className="text-gray-600">Don't have an account? </Text>
          <Link href="/(auth)/signup" asChild>
            <TouchableOpacity>
              <Text className="text-green-800 font-bold">Sign Up</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </View>
  )
}


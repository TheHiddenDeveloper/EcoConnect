"use client"

import { useState } from "react"
import { View, Text, TextInput, TouchableOpacity, Image, ActivityIndicator, Alert, ScrollView } from "react-native"
import { StatusBar } from "expo-status-bar"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { auth } from "../../firebase/config"
import { Link } from "expo-router"

export default function SignupScreen() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSignup = async () => {
    if (name === "" || email === "" || password === "" || confirmPassword === "") {
      Alert.alert("Error", "Please fill in all fields")
      return
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match")
      return
    }

    if (password.length < 6) {
      Alert.alert("Error", "Password should be at least 6 characters")
      return
    }

    setLoading(true)
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      await updateProfile(userCredential.user, {
        displayName: name,
      })
      // Navigation will be handled by the auth state listener in _layout.tsx
    } catch (error) {
      let errorMessage = "Registration failed. Please try again."
      if (error.code === "auth/email-already-in-use") {
        errorMessage = "Email is already in use"
      } else if (error.code === "auth/invalid-email") {
        errorMessage = "Please enter a valid email address"
      } else if (error.code === "auth/weak-password") {
        errorMessage = "Password is too weak"
      }
      Alert.alert("Error", errorMessage)
      setLoading(false)
    }
  }

  return (
    <ScrollView className="flex-1 bg-white">
      <StatusBar style="dark" />
      <View className="flex-1 justify-center px-8 py-12">
        <View className="items-center mb-8">
          <Image source={require("../../assets/carbon-logo.png")} className="w-24 h-24" resizeMode="contain" />
          <Text className="text-green-800 text-3xl font-bold mt-4">Create Account</Text>
          <Text className="text-gray-500 text-base mt-2">Join the carbon credits marketplace</Text>
        </View>

        <View className="mb-4">
          <Text className="text-gray-700 mb-2 font-medium">Full Name</Text>
          <TextInput
            className="bg-gray-100 px-4 py-3 rounded-lg"
            placeholder="Enter your full name"
            value={name}
            onChangeText={setName}
          />
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

        <View className="mb-4">
          <Text className="text-gray-700 mb-2 font-medium">Password</Text>
          <TextInput
            className="bg-gray-100 px-4 py-3 rounded-lg"
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        <View className="mb-6">
          <Text className="text-gray-700 mb-2 font-medium">Confirm Password</Text>
          <TextInput
            className="bg-gray-100 px-4 py-3 rounded-lg"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />
        </View>

        <TouchableOpacity
          className="bg-green-800 py-4 rounded-lg items-center"
          onPress={handleSignup}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-white font-bold text-base">Sign Up</Text>
          )}
        </TouchableOpacity>

        <View className="flex-row justify-center mt-6">
          <Text className="text-gray-600">Already have an account? </Text>
          <Link href="/(auth)/login" asChild>
            <TouchableOpacity>
              <Text className="text-green-800 font-bold">Sign In</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </ScrollView>
  )
}


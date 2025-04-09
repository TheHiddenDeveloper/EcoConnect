"use client"

import { useState } from "react"
import { View, ScrollView } from "react-native"
import { StatusBar } from "expo-status-bar"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { auth } from "../../firebase/config"
import { Link } from "expo-router"
import { TextInput, Button, Text, Surface } from "react-native-paper"

export default function SignupScreen() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleSignup = async () => {
    if (name === "" || email === "" || password === "" || confirmPassword === "") {
      return
    }

    if (password !== confirmPassword) {
      return
    }

    if (password.length < 6) {
      return
    }

    setLoading(true)
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      await updateProfile(userCredential.user, {
        displayName: name,
      })
      // Navigation will be handled by the auth state listener in _layout.tsx
    } catch (error: any) {
      setLoading(false)
    }
  }

  return (
    <ScrollView className="flex-1 bg-white dark:bg-gray-900">
      <StatusBar style="auto" />
      <View className="flex-1 justify-center px-8 py-12">
        <Surface className="p-8 rounded-2xl">
          <Text className="text-3xl font-bold text-center mb-2" variant="headlineMedium">Create Account</Text>
          <Text className="text-base text-center mb-8" variant="bodyLarge">Join the carbon credits marketplace</Text>

          <TextInput
            label="Full Name"
            value={name}
            onChangeText={setName}
            mode="outlined"
            className="mb-4"
          />

          <TextInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            mode="outlined"
            className="mb-4"
          />

          <TextInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            mode="outlined"
            className="mb-4"
            right={
              <TextInput.Icon
                icon={showPassword ? "eye-off" : "eye"}
                onPress={() => setShowPassword(!showPassword)}
              />
            }
          />

          <TextInput
            label="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!showConfirmPassword}
            mode="outlined"
            className="mb-6"
            right={
              <TextInput.Icon
                icon={showConfirmPassword ? "eye-off" : "eye"}
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              />
            }
          />

          <Button
            mode="contained"
            onPress={handleSignup}
            loading={loading}
            disabled={loading}
            className="mb-6"
          >
            Sign Up
          </Button>

          <View className="flex-row justify-center">
            <Text variant="bodyMedium">Already have an account? </Text>
            <Link href="/(auth)/login" asChild>
              <Button mode="text" compact>Sign In</Button>
            </Link>
          </View>
        </Surface>
      </View>
    </ScrollView>
  )
}
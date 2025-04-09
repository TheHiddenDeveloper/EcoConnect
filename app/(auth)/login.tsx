"use client"

import { useState } from "react"
import { View } from "react-native"
import { StatusBar } from "expo-status-bar"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../../firebase/config"
import { Link } from "expo-router"
import { TextInput, Button, Text, Surface } from "react-native-paper"

export default function LoginScreen() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleLogin = async () => {
    if (email === "" || password === "") {
      return
    }

    setLoading(true)
    try {
      await signInWithEmailAndPassword(auth, email, password)
      // Navigation will be handled by the auth state listener in _layout.tsx
    } catch (error: any) {
      setLoading(false)
    }
  }

  return (
    <View className="flex-1 bg-white dark:bg-gray-900">
      <StatusBar style="auto" />
      <View className="flex-1 justify-center px-8">
        <Surface className="p-8 rounded-2xl">
          <Text className="text-3xl font-bold text-center mb-2" variant="headlineMedium">Welcome Back</Text>
          <Text className="text-base text-center mb-8" variant="bodyLarge">Sign in to your account</Text>

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
            className="mb-2"
            right={
              <TextInput.Icon
                icon={showPassword ? "eye-off" : "eye"}
                onPress={() => setShowPassword(!showPassword)}
              />
            }
          />

          <Button
            onPress={() => {}}
            className="self-end mb-6"
            mode="text"
          >
            Forgot Password?
          </Button>

          <Button
            mode="contained"
            onPress={handleLogin}
            loading={loading}
            disabled={loading}
            className="mb-6"
          >
            Sign In
          </Button>

          <View className="flex-row justify-center">
            <Text variant="bodyMedium">Don't have an account? </Text>
            <Link href="/(auth)/signup" asChild>
              <Button mode="text" compact>Sign Up</Button>
            </Link>
          </View>
        </Surface>
      </View>
    </View>
  )
}
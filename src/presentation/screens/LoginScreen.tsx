import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useRef } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { Controller } from "react-hook-form";

import { useLogin } from "../hooks/auth/use-login";

function LoginScreen() {
  const firtInputRef = useRef<TextInput>(null);
  const secondInputRef = useRef<TextInput>(null);

  const {
    control,
    showPassword,
    handleShowPassword,
    errors,
    isLoading,
    handleSubmit,
    onSubmit,
  } = useLogin();

  return (
    <SafeAreaView className="flex-1">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <View className="flex-1 p-5">
          <View className="w-full h-full flex items-center justify-evenly flex-col p-4">
            <View>
              <Ionicons name="cart-outline" className="text-center" size={60} />
              <Text className="font-semibold">Miracles CMS</Text>
            </View>

            <View className="w-full h-[60%] flex flex-col justify-evenly">
              <View className="flex w-full flex-col items-start">
                <Text className="text-3xl font-semibold">Inicio de Sesión</Text>
                <Text className="text-sm">Hola! Genial verte de nuevo</Text>
              </View>
              <View>
                <Text className="text-red-400">Correo</Text>
                <Controller
                  control={control}
                  name="email"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      ref={firtInputRef}
                      className="border-b-2 border-gray-300"
                      placeholder="example@email.com"
                      keyboardType="email-address"
                      autoCapitalize="none"
                      returnKeyType="next"
                      onChangeText={onChange}
                      value={value}
                      onBlur={onBlur}
                      onSubmitEditing={() => {
                        secondInputRef.current?.focus();
                      }}
                    />
                  )}
                />

                {errors.email && (
                  <Text className="text-sm text-red-600 font-light">
                    {errors.email.message}
                  </Text>
                )}
              </View>
              <View>
                <Text className="text-red-400">Contraseña</Text>
                <View className="relative">
                  <Controller
                    control={control}
                    name="password"
                    render={({ field: { onChange, value } }) => (
                      <TextInput
                        ref={secondInputRef}
                        secureTextEntry={!showPassword}
                        placeholder="********"
                        className="border-b-2 border-gray-300 pr-10 py-2"
                        returnKeyType="done"
                        onChangeText={onChange}
                        value={value}
                      />
                    )}
                  />

                  <Pressable
                    onPress={handleShowPassword}
                    className="absolute right-0 top-1/2 -translate-y-1/2"
                  >
                    <Ionicons
                      name={showPassword ? "eye-off-outline" : "eye-outline"}
                      size={22}
                      color="#6B7280"
                    />
                  </Pressable>
                </View>
                {errors?.password && (
                  <Text className="text-sm text-red-600 font-light">
                    {errors.password.message}
                  </Text>
                )}
              </View>
              <View className="w-full flex flex-row justify-center">
                <TouchableOpacity
                  onPress={handleSubmit(onSubmit)}
                  className="w-[70%] bg-red-400 rounded-md"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <ActivityIndicator className="text-white p-4" />
                  ) : (
                    <Text className="text-center text-white font-semibold p-4">
                      Ingresar
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default LoginScreen;

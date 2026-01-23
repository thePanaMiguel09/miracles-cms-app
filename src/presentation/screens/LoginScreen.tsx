import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import {
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { useLogin } from "../hooks/use-login";

function LoginScreen() {
  const { showPassword, handleShowPassword } = useLogin();

  return (
    <SafeAreaView>
      <View className="w-screen h-screen p-5">
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
              <TextInput
                className="border-b-2 border-gray-300"
                placeholder="example@email.com"
              />
            </View>
            <View>
              <Text className="text-red-400">Contraseña</Text>
              <View className="relative">
                <TextInput
                  secureTextEntry={showPassword}
                  placeholder="********"
                  className="border-b-2 border-gray-300 pr-10 py-2"
                />

                <Pressable
                  onPress={handleShowPassword}
                  className="absolute right-0 top-1/2 -translate-y-1/2"
                >
                  <Ionicons
                    name={!showPassword ? "eye-off-outline" : "eye-outline"}
                    size={22}
                    color="#6B7280"
                  />
                </Pressable>
              </View>
            </View>
            <View className="w-full flex flex-row justify-center">
              <TouchableOpacity className="w-[70%] bg-red-400 rounded-md">
                <Text className="font-semibold text-white text-center m-3">
                  Ingresar
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default LoginScreen;

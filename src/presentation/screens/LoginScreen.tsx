import React from "react";
import { Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

function LoginScreen() {
  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <View className="bg-red-300 w-screen h-screen flex-1 items-center justify-center m-2">
          <Text className="text-red-600">Hola Mundo</Text>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default LoginScreen;

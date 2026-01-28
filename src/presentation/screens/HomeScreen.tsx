import { useRouter } from "expo-router";
import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import HomeCardItem from "../components/HomeCardItem";
import { useAuthContext } from "../context/authContext";

function HomeScreen() {
  const router = useRouter();
  const { user } = useAuthContext();

  return (
    <SafeAreaView className="flex-1">
      <View className="h-[15%] flex justify-center p-2">
        <Text className="font-light text-3xl">
          Hola {user?.names}! Bienvenido a tu CMS
        </Text>
      </View>
      <View
        className="
        flex w-screen h-screen 
        flex-row flex-wrap 
        gap-2 justify-center items-start p-2"
      >
        <HomeCardItem
          title="Usuarios"
          caption="Gestiona los usuarios"
          icon="people-outline"
          onPress={() => {
            router.push("/(tabs)/users");
          }}
        />
        <HomeCardItem
          title="Comercios"
          caption="Gestiona los comercios"
          icon="storefront-outline"
          onPress={() => {
            router.push("/(tabs)/commerces");
          }}
        />

        <HomeCardItem
          title="Productos"
          caption="Gestiona los productos"
          icon="basket-outline"
          onPress={() => {
            router.push("/(tabs)/products");
          }}
        />

        <HomeCardItem
          title="Categorías"
          caption="Gestiona las categorías"
          icon="library-outline"
          onPress={() => {
            router.push("/(tabs)/categories");
          }}
        />
      </View>
    </SafeAreaView>
  );
}

export default HomeScreen;

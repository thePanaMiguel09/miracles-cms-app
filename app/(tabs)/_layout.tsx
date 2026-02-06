import { Tabs } from "expo-router";
import React from "react";

import { useColorScheme } from "@/presentation/hooks/use-color-scheme";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "red",
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <Ionicons color={color} name="home-outline" size={26} />
          ),
        }}
      />
      <Tabs.Screen
        name="users"
        options={{
          title: "Usuarios",
          tabBarIcon: ({ color }) => (
            <Ionicons color={color} name="people-outline" size={26} />
          ),
        }}
      />
      <Tabs.Screen
        name="products"
        options={{
          title: "Productos",
          tabBarIcon: ({ color }) => (
            <Ionicons color={color} name="basket-outline" size={26} />
          ),
        }}
      />
      <Tabs.Screen
        name="commerces"
        options={{
          title: "Comercios",
          tabBarIcon: ({ color }) => (
            <Ionicons color={color} name="storefront-outline" size={26} />
          ),
        }}
      />

      <Tabs.Screen
        name="categories"
        options={{
          title: "Categorías",
          tabBarIcon: ({ color }) => (
            <Ionicons color={color} name="library-outline" size={26} />
          ),
        }}
      />
    </Tabs>
  );
}

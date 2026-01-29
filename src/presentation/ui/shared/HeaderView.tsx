import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { Pressable, Text, View } from "react-native";

interface HeaderViewProps {
  title: string;
  icon?: keyof typeof Ionicons.glyphMap;
  onPress?: () => void;
}

function HeaderView({ title, icon }: HeaderViewProps) {
  return (
    <View className="h-[10%] p-4 flex-row justify-between items-center m-4 bg-white rounded-lg shadow-xl shadow-black/50 ">
      <Text className="font-semibold text-2xl">{title}</Text>
      {icon && (
        <Pressable>
          <Ionicons size={24} name="add-outline" />
        </Pressable>
      )}
    </View>
  );
}

export default HeaderView;

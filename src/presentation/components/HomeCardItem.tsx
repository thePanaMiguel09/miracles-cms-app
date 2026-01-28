import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { Pressable, Text, View } from "react-native";

interface HomeCardItemProps {
  title: string;
  caption: string;
  onPress: () => void;
  icon?: keyof typeof Ionicons.glyphMap;
}

function HomeCardItem({ title, caption, onPress, icon }: HomeCardItemProps) {
  return (
    <Pressable
      className="w-[45%] h-[15%] flex flex-col justify-center border-none rounded-xl shadow-lg shadow-black/50 bg-white"
      onPress={onPress}
    >
      <View
        className={`flex flex-row ${icon ? "justify-center" : "justify-start"} items-center`}
      >
        {icon && <Ionicons color={"red"} name={icon} size={24} />}
        <Text className="text-2xl ml-2 mt-2 font-medium text-red-500">
          {title}
        </Text>
      </View>

      <Text className="m-2 font-light text-center">{caption}</Text>
    </Pressable>
  );
}

export default HomeCardItem;

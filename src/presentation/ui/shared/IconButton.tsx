import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { TouchableOpacity } from "react-native";

interface IconButtonProps {
  icon: keyof typeof Ionicons.glyphMap;
  iconColor: string;
  iconSize: number;
  className?: string;
  onPress: () => void;
}

function IconButton({
  icon,
  iconColor = "black",
  iconSize,
  className,
  onPress,
}: IconButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`
          w-[50px] h-[30px] 
          items-center 
          justify-center 
          rounded-lg 
          ${className}
          `}
    >
      <Ionicons name={icon} size={iconSize} color={iconColor} />
    </TouchableOpacity>
  );
}

export default IconButton;

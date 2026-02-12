import React from "react";
import { Menu } from "react-native-paper";
import { IconSource } from "react-native-paper/lib/typescript/components/Icon";

export interface CustomMenuItemProps {
  title: string;
  icon?: IconSource;
  onPress: () => void;
}

function CustomMenuItem({ title, icon, onPress }: CustomMenuItemProps) {
  return <Menu.Item  title={title} leadingIcon={icon} onPress={onPress} />;
}

export default CustomMenuItem;

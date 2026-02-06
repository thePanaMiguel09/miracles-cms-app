import React from "react";
import { ViewStyle } from "react-native";
import { MD3Elevation, Menu } from "react-native-paper";
import CustomMenuItem, { CustomMenuItemProps } from "./CustomMenuItem";

interface CustomMenuProps {
  isVisible: boolean;
  setDismiss: () => void;
  elevationValue?: MD3Elevation;
  anchorPosition?: "top" | "bottom";
  anchorElement: React.ReactNode | { x: number; y: number };
  style?: ViewStyle;
  menuItems: CustomMenuItemProps[];
}

function CustomMenu({
  style,
  isVisible,
  setDismiss,
  anchorPosition,
  anchorElement,
  elevationValue,
  menuItems,
}: CustomMenuProps) {
  return (
    <Menu
      visible={isVisible}
      anchorPosition={anchorPosition}
      elevation={elevationValue}
      contentStyle={style}
      onDismiss={setDismiss}
      anchor={anchorElement}
    >
      {menuItems.map((item, index) => (
        <CustomMenuItem
          key={index}
          title={item.title}
          icon={item.icon}
          onPress={item.onPress}
        />
      ))}
    </Menu>
  );
}

export default CustomMenu;

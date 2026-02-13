import React from "react";
import { Controller } from "react-hook-form";
import { Switch, Text, View } from "react-native";

interface CustomSwitchProps {
  name: string;
  control: any;
  activeLabel?: string;
  disabledLabel?: string;
  isEditable?: boolean;
}

const CustomSwitch = ({
  name,
  control,
  activeLabel,
  disabledLabel,
  isEditable = true,
}: CustomSwitchProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <View className="flex flex-row items-center justify-between">
          <Text className="font-light">
            {value ? (activeLabel ?? "Activo") : (disabledLabel ?? "Inactivo")}
          </Text>
          <Switch
            onValueChange={onChange}
            value={value}
            trackColor={{ false: "#F87171", true: "#FCA5A5" }}
            thumbColor={"#F87171"}
            disabled={!isEditable}
          />
        </View>
      )}
    />
  );
};

export default CustomSwitch;

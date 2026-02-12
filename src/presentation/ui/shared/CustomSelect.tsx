// CustomSelect.tsx
import { Picker } from "@react-native-picker/picker";
import React from "react";
import { Text, View } from "react-native";

interface ItemProps {
  itemLabel: string;
  itemValue: number;
}

interface CustomSelectProps {
  data?: ItemProps[];
  value?: number | null;
  onValueChange?: (value: number | null) => void;
  error?: string;
  placeholder?: string;
}

const CustomSelect = ({
  data = [],
  value,
  onValueChange,
  error,
  placeholder = "Seleccione una opción",
}: CustomSelectProps) => {
  return (
    <View>
      <Picker
        selectedValue={value ?? "placeholder"}
        onValueChange={(itemValue) => {
          if (itemValue === "placeholder") {
            onValueChange?.(null);
          } else {
            onValueChange?.(itemValue as number);
          }
        }}
      >
        <Picker.Item
          label={placeholder}
          value="placeholder"
          color="#9CA3AF" // Color gris para el placeholder
        />
        {data.map((item) => (
          <Picker.Item
            key={item.itemValue}
            label={item.itemLabel}
            value={item.itemValue}
          />
        ))}
      </Picker>
      {error && <Text className="text-red-500 text-sm mt-1">{error}</Text>}
    </View>
  );
};

export default CustomSelect;

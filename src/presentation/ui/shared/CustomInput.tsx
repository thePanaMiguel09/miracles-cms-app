import React from "react";
import { Controller } from "react-hook-form";
import { KeyboardTypeOptions, Text, TextInput, View } from "react-native";

interface CustomInputProps {
  name: string;
  control: any;
  placeholder: string;
  inputType: KeyboardTypeOptions;
  error: string | undefined;
  autoCapitalizeOptions?:
    | "words"
    | "none"
    | "sentences"
    | "characters"
    | undefined;
  isEditable?: boolean;
}

const CustomInput = ({
  name,
  control,
  error,
  inputType,
  placeholder,
  autoCapitalizeOptions,
  isEditable = true,
  ...rest
}: CustomInputProps) => {
  return (
    <View className="mb-2">
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value, onBlur } }) => (
          <TextInput
            editable={isEditable}
            autoCapitalize={autoCapitalizeOptions}
            keyboardType={inputType}
            placeholder={placeholder}
            className="bg-gray-200/95 border-b border-gray-400 rounded-sm"
            onChangeText={onChange}
            value={value?.toString()}
            onBlur={onBlur}
            {...rest}
          />
        )}
      />
      {error && <Text className="text-xs text-red-500 mt-1">{error}</Text>}
    </View>
  );
};

export default CustomInput;

import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";

interface CustomModalProps {
  modalTitle: string;
  modalMessage: string;
  modalIcon?: keyof typeof Ionicons.glyphMap;
  visible: boolean;
  onClose: () => void;
  type: "confirmation" | "information";
  onConfirmation?: () => void;
}

const CustomModal = ({
  visible,
  onClose,
  modalMessage,
  modalTitle,
  modalIcon,
  type,
  onConfirmation,
}: CustomModalProps) => {
  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      statusBarTranslucent
    >
      {/* Fondo oscuro */}
      <View className="flex-1 bg-black/50 justify-center items-center">
        {/* Caja del alert */}
        <View className="bg-white w-[80%] p-6 rounded-2xl">
          <View className="flex flex-row justify-center">
            {modalIcon && (
              <Ionicons className="mr-2" name={modalIcon} size={24} />
            )}
            <Text className="text-lg font-semibold text-center mb-2">
              {modalTitle}
            </Text>
          </View>

          <Text className="text-center text-gray-600 mb-4">{modalMessage}</Text>

          {type === "information" && (
            <TouchableOpacity
              onPress={onClose}
              className="bg-red-400 py-2 rounded-lg"
            >
              <Text className="text-white text-center font-semibold">
                Aceptar
              </Text>
            </TouchableOpacity>
          )}
          {type === "confirmation" && (
            <View className="bg-blue-300 flex flex-row items-center justify-center">
              <TouchableOpacity
                onPress={onClose}
                className="m-1 p-2 border border-red-400 rounded-lg"
              >
                <Text className="text-red-400">Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  onConfirmation?.();
                }}
                className="m-1 p-2 border border-red-400 rounded-lg bg-red-400"
              >
                <Text className="text-white">Aceptar</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default CustomModal;

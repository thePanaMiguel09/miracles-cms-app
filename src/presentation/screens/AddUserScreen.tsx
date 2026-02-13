import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useEffect } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAddUser } from "../hooks/users/use-add-user";
import CustomInput from "../ui/shared/CustomInput";
import CustomeModal from "../ui/shared/CustomModal";

const AddUserScreen = () => {
  const {
    isLoading,
    isSuccess,
    control,
    handleSubmit,
    apiError,
    errors,
    onSubmit,
    confirmationModalVisible,
    setConfirmationModalVisible,
  } = useAddUser();

  useEffect(() => {
    if (isSuccess) {
      setConfirmationModalVisible(true);
    }
  }, [isSuccess]);

  return (
    <SafeAreaView className="flex-1">
      <CustomeModal
        modalTitle="Usuario Registrado"
        modalMessage={"El usuario fue creado correctamente"}
        modalIcon="checkmark-circle-outline"
        visible={confirmationModalVisible}
        onClose={() => setConfirmationModalVisible(!confirmationModalVisible)}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
          {apiError && (
            <View className="flex-col items-center justify-center bg-red-300 m-4 flex p-2 rounded-lg ">
              <Ionicons name="warning-outline" color={"red"} size={24} />
              <Text className="mt-2 text-white font-semibold">{apiError}</Text>
            </View>
          )}
          <View className="ml-4 flex flex-row items-center">
            <Ionicons className="mr-2" name="person-circle-outline" size={24} />
            <Text className="font-semibold text-lg">Información personal</Text>
          </View>

          <View className="bg-white m-4 p-4 rounded-xl shadow-sm">
            <CustomInput
              control={control}
              autoCapitalizeOptions="words"
              error={errors?.userNames?.message}
              inputType="default"
              name="userNames"
              placeholder="Ingrese los nombres del usuario"
            />
            <CustomInput
              control={control}
              autoCapitalizeOptions="words"
              name="userSurnames"
              error={errors?.userSurnames?.message}
              inputType="default"
              placeholder="Ingrese los apellidos del usuario"
            />
            <CustomInput
              control={control}
              name="userDNI"
              error={errors?.userDNI?.message}
              inputType="numeric"
              placeholder="Ingrese el número de documento del usuario"
            />
          </View>
          <View className="ml-4 flex flex-row items-center">
            <Ionicons className="mr-2" name="chatbubble-outline" size={24} />
            <Text className="font-semibold text-lg">
              Información de contacto
            </Text>
          </View>

          <View className="bg-white m-4 p-4 rounded-xl shadow-sm">
            <CustomInput
              control={control}
              name="userPhone"
              error={errors?.userPhone?.message}
              inputType="number-pad"
              placeholder="Ingrese el número de teléfono del usuario"
            />
            <CustomInput
              control={control}
              autoCapitalizeOptions="none"
              name="userEmail"
              error={errors?.userEmail?.message}
              inputType="email-address"
              placeholder="Ingrese el correo electrónico del usuario"
            />
          </View>
          <View className="flex flex-row items-center ml-4 mt-2 ">
            <Ionicons size={24} name="lock-closed-outline" />
            <Text className="ml-4 font-semibold text-lg">
              Información de seguridad
            </Text>
          </View>
          <View className="bg-white m-4 p-4 rounded-xl shadow-sm">
            <CustomInput
              control={control}
              name="userPassword"
              autoCapitalizeOptions="none"
              error={errors?.userPassword?.message}
              inputType="visible-password"
              placeholder="Ingrse la contraseña para el usuario"
            />
          </View>
          <TouchableOpacity
            onPress={handleSubmit(onSubmit)}
            disabled={isLoading}
            className="bg-red-400 m-4 p-2 rounded-lg"
          >
            {isLoading ? (
              <ActivityIndicator size={24} color={"white"} />
            ) : (
              <Text className="text-center text-white font-semibold">
                Registrar
              </Text>
            )}
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AddUserScreen;

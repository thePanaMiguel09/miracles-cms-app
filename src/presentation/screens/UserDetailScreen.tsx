import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useEffect } from "react";
import { Controller } from "react-hook-form";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useUser } from "../hooks/users/use-user";
import CustomInput from "../ui/shared/CustomInput";
import CustomSelect from "../ui/shared/CustomSelect";

interface UserDetailScreenProps {
  userId: number;
}

const UserDetailScreen = ({ userId }: UserDetailScreenProps) => {
  const {
    commerces,
    roles,
    isLoadingRoles,
    isCommercesError,
    isLoadingCommerces,
    commercesError,
    errors,
    editForm,
    control,
    register,
    reset,
    useUserById,
    handleEditForm,
  } = useUser();

  const { data: user, isLoading: isLoadingUser } = useUserById(userId);

  useEffect(() => {
    if (user) {
      reset({
        names: user?.names,
        surnames: user?.surnames,
        createdAt: user?.createdAt.toLocaleDateString(),
        email: user.email,
        phone: user.phoneNumber.toString(),
        commerceId: user.storeId ?? null,
        status: user.userState,
        role: user.roleId ?? null,
      });
    }
  }, [user, reset]);

  if (isLoadingUser || isLoadingCommerces || isLoadingRoles) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size={24} color={"red"} />
        <Text className="mt-4">Cargando información del usuario</Text>
      </View>
    );
  }

  return (
    <View className="flex-1">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={{ paddingBottom: 20, paddingTop: 20 }}
        >
          <View className="flex flex-row justify-end items-center mr-4">
            <Ionicons name="pencil-outline" size={24} className="mr-1" />
            <Text className="font-thin mr-2">Editar</Text>
            <Switch value={editForm} onChange={() => handleEditForm()} />
          </View>
          <View className="flex flex-row items-center ml-4">
            <Ionicons className="mr-2" name="person-circle-outline" size={24} />
            <Text className="font-semibold">Información personal</Text>
          </View>
          <View className="bg-white rounded-lg shadow-lg shadow-black/50 m-4 p-4">
            <CustomInput
              name="names"
              control={control}
              inputType="default"
              placeholder="Nombres"
              error={errors.names?.message}
              isEditable={editForm}
            />
            <CustomInput
              name="surnames"
              control={control}
              inputType="default"
              placeholder="Apellidos"
              error={errors.surnames?.message}
              isEditable={editForm}
            />
          </View>
          <View className="flex flex-row items-center ml-4">
            <Ionicons className="mr-2" name="chatbubble-outline" size={24} />
            <Text className="font-semibold">Información de contacto</Text>
          </View>
          <View className="bg-white rounded-lg shadow-lg shadow-black/50 m-4 p-4">
            <CustomInput
              name="email"
              control={control}
              error={errors.email?.message}
              inputType="email-address"
              placeholder="Correo electrónico"
              isEditable={editForm}
            />
            <CustomInput
              name="phone"
              control={control}
              error={errors.email?.message}
              inputType="phone-pad"
              placeholder="Teléfono"
              isEditable={editForm}
            />
          </View>
          <View className="flex flex-row items-center ml-4">
            <Ionicons className="mr-2" name="id-card-outline" size={24} />
            <Text className="font-semibold">Información de la cuenta</Text>
          </View>
          <View className="bg-white m-4 p-4 rounded-lg shadow-lg shadow-black/50">
            <View className="flex flex-row items-center justify-between">
              <Text className="font-light">
                {user?.userState ? "Usiario activo" : "Usuario inactivo"}
              </Text>
              <Switch
                value={user?.userState}
                trackColor={{ false: "#F87171", true: "#FCA5A5" }}
                thumbColor={"#F87171"}
                disabled={editForm}
              />
            </View>
            <CustomInput
              isEditable={editForm}
              name="createdAt"
              control={control}
              inputType="default"
              placeholder="Fecha de registro"
              error={errors.createdAt?.message}
            />
          </View>
          <View className="flex flex-row items-center ml-4">
            <Ionicons size={24} className="mr-2" name="storefront-outline" />
            <Text className="font-semibold">Información del comercio</Text>
          </View>
          <View className="bg-white m-4 p-4 rounded-lg shadow-lg shadow-black/50">
            <View>
              <Text className="font-light">Comercio asignado</Text>
              <Controller
                name="commerceId"
                control={control}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <CustomSelect
                    data={
                      commerces?.map((commerce) => ({
                        itemLabel: commerce.commerceName,
                        itemValue: commerce.commerceId,
                      })) ?? []
                    }
                    value={value}
                    onValueChange={onChange}
                    error={error?.message}
                    placeholder="Seleccione un comercio"
                    isEnabled={editForm}
                  />
                )}
              />
              {!isCommercesError && (
                <Text className="text-sm ml-2 text-red-500">
                  {commercesError?.message}
                </Text>
              )}
            </View>
            <View>
              <Text className="font-light">Rol asignado</Text>
              <Controller
                name="role"
                control={control}
                render={({
                  field: { value, onChange },
                  fieldState: { error },
                }) => (
                  <CustomSelect
                    data={
                      roles?.map((role) => ({
                        itemValue: role.roleId,
                        itemLabel: role.roleName,
                      })) ?? []
                    }
                    value={value}
                    onValueChange={onChange}
                    error={error?.message}
                    isEnabled={editForm}
                  />
                )}
              />
            </View>
          </View>
          {editForm && (
            <View className="m-4">
              <TouchableOpacity className="p-4 bg-red-400 rounded-lg">
                <Text className="text-center">Editar</Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default UserDetailScreen;

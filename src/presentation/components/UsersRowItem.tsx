import { router } from "expo-router";
import React from "react";
import { Text, View } from "react-native";
import { useUpdateUserState } from "../hooks/users/use-update-user-state";
import CustomModal from "../ui/shared/CustomModal";
import IconButton from "../ui/shared/IconButton";

interface UsersRowItemProps {
  userId: number;
  userFirtName: string;
  userLastName: string;
  userEmail: string;
  userPhone: number;
  userState: boolean;
  userDateCreated: Date;
}

function UsersRowItem({
  userId,
  userFirtName,
  userLastName,
  userEmail,
  userPhone,
  userState,
  userDateCreated,
}: UsersRowItemProps) {
  const {
    isUpdating,
    isSuccess,
    informationModal,
    confirmationModal,
    openConfirmationModal,
    handleConfirmationModal,
    handleInformationModal,
    handleConfirmUpdate,
  } = useUpdateUserState();

  return (
    <View className="flex flex-row py-2 border-b border-gray-200">
      <CustomModal
        modalTitle="Eliminar Usuario"
        modalMessage="¿Desea eliminar al usuario?"
        type="confirmation"
        visible={confirmationModal}
        onClose={handleConfirmationModal}
        modalIcon="information-circle-outline"
        onConfirmation={handleConfirmUpdate}
      />
      <CustomModal
        modalTitle="Usuario Eliminado"
        modalMessage={"El usuario ha sido eliminado correctamente."}
        type="information"
        visible={informationModal}
        modalIcon="checkmark-circle-outline"
        onClose={handleInformationModal}
      />
      <View className="p-2" style={{ maxWidth: 160 }}>
        <Text className="w-[160px] flex-2 text-start font-normal">
          {userFirtName} {userLastName}
        </Text>
        <Text className="flex-2  text-start font-extralight">{userEmail}</Text>
      </View>
      <View className="flex flex-col justify-center items-center w-[150px]">
        <Text className="flex-2 text-center">{userPhone}</Text>
      </View>

      <View className="w-[150px] flex flex-col justify-center items-center">
        <Text
          className={`w-[100px] text-center text-white font-semibold rounded-lg p-2 ${userState ? "bg-green-400/90" : "bg-red-400/90"}`}
        >
          {userState ? "Activo" : "Inactivo"}
        </Text>
      </View>

      <View className="flex flex-col justify-center items-center w-[150px]">
        <Text className="text-end">
          {new Date(userDateCreated).toLocaleDateString()}
        </Text>
      </View>

      <View className="flex flex-row justify-evenly items-center w-[150px]">
        <IconButton
          icon="eye-outline"
          iconColor="white"
          iconSize={24}
          className="bg-blue-500 shadow-lg shadow-black/80"
          onPress={() =>
            router.push({
              pathname: "/users/[id]",
              params: { id: userId },
            })
          }
        />
        <IconButton
          disabled={!userState || isUpdating}
          icon="trash-outline"
          iconColor="white"
          iconSize={24}
          className={`${userState ? "bg-red-400" : "bg-red-300"}  shadow-lg shadow-black/80`}
          onPress={() => openConfirmationModal(userId, false)}
        />
      </View>
    </View>
  );
}

export default UsersRowItem;

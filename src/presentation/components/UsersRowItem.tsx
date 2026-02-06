import { router } from "expo-router";
import React from "react";
import { Text, View } from "react-native";
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
  return (
    <View className="flex flex-row py-2 border-b border-gray-200">
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
          icon="trash-outline"
          iconColor="white"
          iconSize={24}
          className="bg-red-400 shadow-lg shadow-black/80"
          onPress={() => console.log("Hola")}
        />
      </View>
    </View>
  );
}

export default UsersRowItem;

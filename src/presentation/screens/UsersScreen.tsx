import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import UsersRowItem from "../components/UsersRowItem";
import { useUsers } from "../hooks/users/use-users";
import HeaderView from "../ui/shared/HeaderView";

function UsersScreen() {
  const {
    usersQuery: { data: users = [], isLoading, isError, error, refetch },
  } = useUsers();

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 flex-col justify-center items-center">
        <ActivityIndicator color={"red"} size={24} />
        <Text className="text-sm">Cargando usuarios...</Text>
      </SafeAreaView>
    );
  }

  if (isError) {
    return (
      <SafeAreaView className="flex-1 flex-col justify-center items-center">
        <Ionicons color={"red"} name="alert-circle-outline" size={32} />
        <Text className="text-sm text-center mt-4">
          Lo sentimos, hubo un error al obtener los usuarios.
        </Text>
        <Text className="text-sm text-center">{error.message}</Text>
        <TouchableOpacity
          onPress={() => refetch}
          className="border border-red-400 p-2 rounded-lg"
        >
          <Text className="font-light">Reintentar</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex flex-col w-full h-full">
      <HeaderView
        title="Usuarios"
        icon="add"
        onPress={() => {
          router.push("/users/add-user");
        }}
      />

      <ScrollView
        horizontal
        className="m-4 border-none rounded-lg shadow-lg shadow-black/25 bg-white"
        keyboardDismissMode="none"
        keyboardShouldPersistTaps="handled"
      >
        <View style={{ minWidth: 800 }}>
          <FlatList
            data={users}
            extraData={users}
            keyExtractor={(user) => user.userDNI.toString()}
            showsVerticalScrollIndicator
            ListHeaderComponent={() => (
              <View className="flex flex-row p-4 rounded-t-lg justify-evenly bg-red-400">
                <Text className="text-center text-white font-bold">
                  Usuario
                </Text>
                <Text className="text-center text-white font-bold">
                  Teléfono
                </Text>
                <Text className="text-center text-white font-bold">Estado</Text>
                <Text className="text-center text-white font-bold">
                  Fecha ingreso
                </Text>
                <Text className="text-center text-white font-bold">
                  Acciones
                </Text>
              </View>
            )}
            renderItem={({ item }) => (
              <UsersRowItem
                userId={item.userId!}
                userEmail={item.email}
                userFirtName={item.names}
                userLastName={item.surnames}
                userPhone={item.phoneNumber}
                userState={item?.userState ?? false}
                userDateCreated={item.createdAt}
              />
            )}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default UsersScreen;

import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderView from "../ui/shared/HeaderView";

function UsersScreen() {
  return (
    <SafeAreaView className="flex-1">
      <HeaderView title="Usuarios" icon="add" />
    </SafeAreaView>
  );
}

export default UsersScreen;

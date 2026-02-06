import UserDetailScreen from "@/presentation/screens/UserDetailScreen";
import { useLocalSearchParams } from "expo-router";
import React from "react";

const UserDetail = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  return <UserDetailScreen userId={Number(id)} />;
};

export default UserDetail;

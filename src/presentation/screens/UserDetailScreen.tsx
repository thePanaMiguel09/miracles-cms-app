import React from "react";
import { Text, View } from "react-native";

interface UserDetailScreenProps {
  userId: number;
}

const UserDetailScreen = ({ userId }: UserDetailScreenProps) => {
  return (
    <View>
      <Text>ID: {userId}</Text>
    </View>
  );
};

export default UserDetailScreen;

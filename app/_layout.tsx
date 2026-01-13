import '../global.css';

import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Redirect, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import {
  AuthProvider,
  useAuthContext,
} from "@/presentation/context/authContext";
import { useColorScheme } from "@/presentation/hooks/use-color-scheme.web";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const { isAuthenticated } = useAuthContext();

  const colorScheme = useColorScheme();

  if (isAuthenticated) {
    return <Redirect href={"/(tabs)"} />;
  }

  return (
    <AuthProvider>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="login" options={{ headerShown: false }} />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </AuthProvider>
  );
}

import "../global.css";

import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
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

function LayoutInside() {
  const { isAuthenticated, isChecking } = useAuthContext();
  const colorScheme = useColorScheme();

  // mientras se restaura token
  if (isChecking) return null;

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        {isAuthenticated ? (
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        ) : (
          <Stack.Screen name="login" options={{ headerShown: false }} />
        )}
      </Stack>

      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <LayoutInside />
    </AuthProvider>
  );
}

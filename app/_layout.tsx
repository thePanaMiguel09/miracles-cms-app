import "../global.css";

import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { PaperProvider } from "react-native-paper";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import {
  AuthProvider,
  useAuthContext,
} from "@/presentation/context/authContext";
import { useColorScheme } from "@/presentation/hooks/theme/use-color-scheme.web";

export const unstable_settings = {
  anchor: "(tabs)",
};

function LayoutInside() {
  const { isAuthenticated, isChecking } = useAuthContext();
  const colorScheme = useColorScheme();

  if (isChecking) return null;

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{ headerShown: false }}
          redirect={!isAuthenticated}
        />
        <Stack.Screen
          name="users/add-user"
          options={{
            presentation: "modal",
            headerShown: true,
            title: "Crear Usuario",
            headerTitleAlign: "center",
          }}
          redirect={!isAuthenticated}
        />

        <Stack.Screen
          name="users/[id]"
          options={{
            presentation: "modal",
            headerShown: true,
            title: "Detalle de Usuario",
            headerTitleAlign: "left",
          }}
          redirect={!isAuthenticated}
        />

        <Stack.Screen
          redirect={isAuthenticated}
          name="login"
          options={{ headerShown: false }}
        />
      </Stack>

      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

export default function RootLayout() {
  const queryClient = new QueryClient();

  return (
    <PaperProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <LayoutInside />
        </AuthProvider>
      </QueryClientProvider>
    </PaperProvider>
  );
}

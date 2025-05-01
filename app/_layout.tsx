import { Stack } from "expo-router";

import "@/global.css";
import { GluestackUIProvider } from "@/src/components/ui/gluestack-ui-provider";
import { LocationProvider } from "@/src/context/LocationContext";
import { ToastProvider } from "@gluestack-ui/toast";

export default function RootLayout() {
  return (
    <ToastProvider>
      <GluestackUIProvider mode="light">
        <LocationProvider>
          <Stack
            screenOptions={{
              headerShown: false,
            }}
          />
        </LocationProvider>
      </GluestackUIProvider>
    </ToastProvider>
  );
}

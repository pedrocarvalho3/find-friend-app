import { Stack } from "expo-router";

import "@/global.css";
import { GluestackUIProvider } from "@/src/components/ui/gluestack-ui-provider";

export default function RootLayout() {
  return (
    <GluestackUIProvider mode="dark">
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </GluestackUIProvider>
  );
}

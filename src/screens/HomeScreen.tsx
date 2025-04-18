import React from "react";
import { SafeAreaView } from "react-native";
import { Box } from "../components/ui/box";
import { Text } from "../components/ui/text";

const HomeScreen: React.FC = React.memo(() => {
  return (
    <SafeAreaView className="bg-primary-500 flex-1 items-center justify-center">
      <Box className="text-white">
        <Text className="text-2xl font-bold text-center">
          Leve a felicidade para o seu lar
        </Text>
        <Text className="text-center">
          Encontre o animal de estimação ideal para seu estilo de vida!
        </Text>
      </Box>
    </SafeAreaView>
  );
});

export default HomeScreen;

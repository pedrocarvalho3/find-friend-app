import React, { useState } from "react";
import { SafeAreaView } from "react-native";
import { Center } from "../components/ui/center";
import { Text } from "../components/ui/text";
import LogoLarge from "@/src/assets/images/logo_large.png";
import ThreeDogs from "@/src/assets/images/three_dogs.png";
import { Box } from "../components/ui/box";
import { Image } from "../components/ui/image";
import { useRouter } from "expo-router";
import LocationSetter from "../components/commons/LocationSetter";
import { useLocation } from "../context/LocationContext";

const HomeScreen: React.FC = React.memo(() => {
  const router = useRouter();
  const { state, city } = useLocation();

  const handleSearch = () => {
    if (state && city) {
      router.push({
        pathname: "/Pets",
        params: { state, city },
      });
    }
  };

  return (
    <SafeAreaView className="bg-primary-500 flex-1">
      <Center className="text-white items-center justify-between py-8">
        <Box className="gap-12 mb-4">
          <Image
            source={LogoLarge}
            resizeMode="contain"
            size="xl"
            alt="Logo Large"
          />
          <Image source={ThreeDogs} className="w-80 h-80" alt="Three Dogs" />
        </Box>

        <Text className="text-2xl font-bold text-center">
          Leve a felicidade para o seu lar
        </Text>
        <Text className="text-center mb-12">
          Encontre o animal de estimação ideal para seu estilo de vida!
        </Text>

        <LocationSetter
          labelText="Busque um amigo:"
          hasButton
          onButtonPress={handleSearch}
        />
      </Center>
    </SafeAreaView>
  );
});

export default HomeScreen;

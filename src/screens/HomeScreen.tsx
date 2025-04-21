import React, { useState } from "react";
import { SafeAreaView } from "react-native";
import { Center } from "../components/ui/center";
import { Text } from "../components/ui/text";
import LogoLarge from "@/src/assets/images/logo_large.png";
import ThreeDogs from "@/src/assets/images/three_dogs.png";
import { Box } from "../components/ui/box";
import { Image } from "../components/ui/image";
import {
  Select,
  SelectBackdrop,
  SelectContent,
  SelectInput,
  SelectItem,
  SelectPortal,
  SelectTrigger,
} from "../components/ui/select";
import { useNavigation, useRouter } from "expo-router";
import { Button, ButtonIcon } from "../components/ui/button";
import { SearchIcon } from "../components/ui/icon";

const HomeScreen: React.FC = React.memo(() => {
  const router = useRouter();
  const [state, setState] = useState("");
  const [city, setCity] = useState("");

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
          <Image source={LogoLarge} resizeMode="contain" size="xl" />
          <Image source={ThreeDogs} className="w-80 h-80" />
        </Box>

        <Text className="text-2xl font-bold text-center">
          Leve a felicidade para o seu lar
        </Text>
        <Text className="text-center">
          Encontre o animal de estimação ideal para seu estilo de vida!
        </Text>

        <Box className="mt-12 gap-4 w-full p-8">
          <Text className="text-xl">Busque um amigo:</Text>
          <Box className="flex flex-row gap-4 h-20 w-full">
            <Select
              selectedValue={state}
              onValueChange={(value) => {
                setState(value);
                setCity("");
              }}
            >
              <SelectTrigger className="w-20 border-gray-400 rounded-xl">
                <SelectInput
                  placeholder="Estado"
                  className="placeholder:text-gray-300"
                />
              </SelectTrigger>
              <SelectPortal>
                <SelectBackdrop />
                <SelectContent>
                  <SelectItem label="PE" value="PE" />
                  <SelectItem label="SP" value="SP" />
                  <SelectItem label="RJ" value="RJ" />
                </SelectContent>
              </SelectPortal>
            </Select>

            <Select selectedValue={city} onValueChange={setCity} key={state}>
              <SelectTrigger className="w-32 border-gray-400 rounded-xl">
                <SelectInput
                  placeholder="Cidade"
                  className="placeholder:text-gray-300"
                />
              </SelectTrigger>
              <SelectPortal>
                <SelectBackdrop />
                <SelectContent>
                  {state === "PE" && (
                    <SelectItem label="Recife" value="Recife" />
                  )}
                  {state === "PE" && (
                    <SelectItem label="Trindade" value="Trindade" />
                  )}
                  {state === "SP" && (
                    <SelectItem label="São Paulo" value="São Paulo" />
                  )}
                  {state === "RJ" && (
                    <SelectItem label="Rio de Janeiro" value="Rio de Janeiro" />
                  )}
                </SelectContent>
              </SelectPortal>
            </Select>

            <Button
              variant="solid"
              className="bg-yellow-500 rounded-full"
              onPress={handleSearch}
            >
              <ButtonIcon as={SearchIcon} />
            </Button>
          </Box>
        </Box>
      </Center>
    </SafeAreaView>
  );
});

export default HomeScreen;

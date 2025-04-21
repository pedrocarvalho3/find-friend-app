import { Platform, SafeAreaView, StatusBar, View } from "react-native";
import { Text } from "../components/ui/text";
import { useLocalSearchParams } from "expo-router";
import { Heading } from "../components/ui/heading";
import { Image } from "../components/ui/image";
import Logo from "@/src/assets/images/logo.png";
import { Box } from "../components/ui/box";
import {
  Select,
  SelectBackdrop,
  SelectContent,
  SelectInput,
  SelectItem,
  SelectPortal,
  SelectTrigger,
} from "../components/ui/select";
import { useState } from "react";
import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
} from "../components/ui/avatar";
import Constants from "expo-constants";

const SearchPetsScreen: React.FC = () => {
  const { state, city } = useLocalSearchParams<{
    state: string;
    city: string;
  }>();

  const [selectedState, setSelectedState] = useState(state || "");
  const [selectedCity, setSelectedCity] = useState(city || "");

  const statusBarHeight =
    Platform.OS === "android"
      ? StatusBar.currentHeight
      : Constants.statusBarHeight;

  return (
    <>
      <StatusBar backgroundColor="#F15156" barStyle="light-content" />

      <View style={{ height: statusBarHeight, backgroundColor: "#F15156" }} />

      <SafeAreaView className="flex-1 bg-gray-100">
        <View className="flex-[0.15] bg-primary-500">
          <Box className="p-4 flex flex-row gap-8 justify-between">
            <Image size="xs" resizeMode="contain" source={Logo} />

            <Box className="gap-2">
              <Text className="text-lg">Localização:</Text>
              <Box className="flex flex-row gap-4 h-16">
                <Select
                  selectedValue={state}
                  onValueChange={(value) => {
                    setSelectedState(value);
                    setSelectedCity("");
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

                <Select
                  selectedValue={city}
                  onValueChange={setSelectedCity}
                  key={state}
                >
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
                        <SelectItem
                          label="Rio de Janeiro"
                          value="Rio de Janeiro"
                        />
                      )}
                    </SelectContent>
                  </SelectPortal>
                </Select>
              </Box>
            </Box>

            <Avatar size="md">
              <AvatarFallbackText>Pedro</AvatarFallbackText>
              <AvatarImage
                source={{
                  uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
                }}
              />
            </Avatar>
          </Box>
        </View>

        <View className="flex-1 p-4">
          <Text className="text-xl text-center">
            Pets disponíveis aparecerão aqui 🐶🐱
          </Text>
        </View>
      </SafeAreaView>
    </>
  );
};

export default SearchPetsScreen;

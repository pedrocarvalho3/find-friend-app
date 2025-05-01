import { View } from "react-native";
import { Box } from "../ui/box";
import { Image } from "../ui/image";
import LocationSetter from "./LocationSetter";
import { Avatar, AvatarFallbackText, AvatarImage } from "../ui/avatar";
import Logo from "@/src/assets/images/logo.png";
import { Button } from "../ui/button";
import { useState } from "react";
import { useRouter } from "expo-router";
import { isLoggedIn } from "@/src/utils/auth";

const DefaultHeader = () => {
  const router = useRouter();

  const handleAvatarPress = async () => {
    const logged = await isLoggedIn();

    if (logged) {
      router.navigate("/OrgProfile");
    } else {
      router.navigate("/Login");
    }
  };

  return (
    <View className="flex-[0.15] bg-primary-500">
      <Box className="p-4 flex flex-row gap-8 justify-between">
        <Image size="xs" resizeMode="contain" source={Logo} alt="Logo" />

        <LocationSetter labelText="Localização:" />

        <Button onPress={handleAvatarPress}>
          <Avatar size="md">
            <AvatarFallbackText>Pedro</AvatarFallbackText>
            <AvatarImage
              source={{
                uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
              }}
            />
          </Avatar>
        </Button>
      </Box>
    </View>
  );
};

export default DefaultHeader;

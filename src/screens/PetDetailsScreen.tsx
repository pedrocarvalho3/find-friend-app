import { ScrollView, TouchableOpacity } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Box } from "../components/ui/box";
import { useState } from "react";
import { Image } from "../components/ui/image";
import { Text } from "../components/ui/text";
import { HStack } from "../components/ui/hstack";
import { Icon } from "../components/ui/icon";
import {
  CircleAlert,
  Maximize,
  MessageCircle,
  Smile,
  Zap,
} from "lucide-react-native";
import { Avatar } from "../components/ui/avatar";
import { Button } from "../components/ui/button";
import type { Pet } from "../types/pets";
import type { Org } from "../types/org";

const PetDetailsScreen: React.FC = () => {
  const [pet] = useState<Pet>({
    id: "1",
    name: "Rex",
    description: "Um cachorro amigável e brincalhão",
    age: "Jovem",
    size: "MEDIUM",
    energy_level: "VERY_HIGH",
    environment: "MEDIUM_SPACE",
    photos: [
      "https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
      "https://images.unsplash.com/photo-1587300003388-59208cc962cb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      "https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
      "https://images.unsplash.com/photo-1580064755419-883acc42900b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    ],
    organization_id: "org1",
    city: "São Paulo",
    is_available: true,
  });

  const [organization] = useState<Org>({
    id: "org1",
    name: "Amigos dos Animais",
    address: "Av. Paulista, 1000 - São Paulo, SP",
    latitude: -23.5674,
    longitude: -46.6482,
  });

  const [selectedPhoto, setSelectedPhoto] = useState<string>(pet.photos[0]);

  return (
    <ScrollView>
      <Box>
        <Image
          source={{
            uri: selectedPhoto,
          }}
          className="w-full h-64"
          alt={`Foto do pet ${pet.name}`}
        />

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mt-2 px-2"
        >
          <HStack space="xs" className="py-2">
            {pet.photos.map((photo, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setSelectedPhoto(photo)}
              >
                <Image
                  source={{ uri: photo }}
                  className={`w-20 h-20 rounded-md ${selectedPhoto === photo ? "border-2 border-cyan-700" : ""
                    }`}
                  alt={`Miniatura ${index + 1} do pet ${pet.name}`}
                />
              </TouchableOpacity>
            ))}
          </HStack>
        </ScrollView>

        <Box className="mt-4 px-4">
          <Text className="font-bold text-4xl text-cyan-900 mb-2">
            {pet.name}
          </Text>
          <Text>
            Eu sou um lindo doguinho de 3 anos, um jovem bricalhão que adora
            fazer companhia, uma bagunça mas também ama uma soneca.
          </Text>

          <HStack
            space="xs"
            reversed={false}
            className="flex justify-between mt-8"
          >
            <Box className="border border-gray-300 p-4 rounded-lg gap-2">
              <HStack
                space="xs"
                reversed={false}
                className="flex justify-between"
              >
                <Icon as={Zap} size="sm" className="text-gray-400" />
                <Icon as={Zap} size="sm" className="text-gray-400" />
                <Icon as={Zap} size="sm" className="text-gray-400" />
                <Icon as={Zap} size="sm" className="text-gray-400" />
                <Icon as={Zap} size="sm" className="text-gray-400" />
              </HStack>

              <Text>Muita energia</Text>
            </Box>
            <Box className="border border-gray-300 p-4 rounded-lg gap-1">
              <Icon as={Maximize} size="md" />
              <Text>Ambiente amplo</Text>
            </Box>
            <Box className="border border-gray-300 p-4 rounded-lg gap-2">
              <HStack space="xs" className="mt-1">
                <Box className="w-3 h-3 bg-gray-400 rounded-full" />
                <Box className="w-3 h-3 bg-gray-400 rounded-full" />
                <Box className="w-3 h-3 bg-gray-400 rounded-full" />
              </HStack>
              <Text>Pequenino</Text>
            </Box>
          </HStack>
        </Box>

        {/* <Box>
          <MapView
            style={{ width: "100%", height: "100%" }}
            initialRegion={{
              latitude: organization.latitude,
              longitude: organization.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
          >
            <Marker
              coordinate={{
                latitude: organization.latitude,
                longitude: organization.longitude,
              }}
              title={organization.name}
              description={organization.address}
            >
              <Box className="bg-cyan-500 p-2 rounded-full">
                <Box className="bg-white p-1 rounded-full">
                  <Box className="bg-cyan-500 h-3 w-3 rounded-full" />
                </Box>
              </Box>
            </Marker>
          </MapView>
        </Box> */}

        <Box className="px-4 py-8">
          <Box className="flex flex-row gap-4 border-y-[1px] border-gray-300">
            <Avatar className="bg-orange-600 my-8">
              <Icon as={Smile} size="lg" className="stroke-white" />
            </Avatar>
            <Box className="my-8">
              <Text className="text-xl font-bold text-cyan-900">
                Seu Cãopanheiro
              </Text>
              <Text className="text-xs">
                Rua do meio, 123 , Boa viagem, Recife - PE{" "}
              </Text>
              <Box className="bg-gray-200 py-2 px-4 mt-2 flex-row gap-4 max-w-[75%] rounded-lg">
                <Icon as={MessageCircle} className="stroke-cyan-700" />
                <Text> 81 1234.4567</Text>
              </Box>
            </Box>
          </Box>

          <Box className="mt-8 gap-8 border-b-[1px] border-gray-300">
            <Text className="text-2xl font-bold text-cyan-900">
              Requisitos para adoção
            </Text>

            <Box className="gap-2 mb-8">
              <Box className="flex-row py-2 px-4 border-[1px] border-red-400 gap-2 items-center rounded-md">
                <Icon as={CircleAlert} size="lg" className="stroke-red-600" />
                <Text className="text-red-600">
                  Local grande para o animal correr e brincar.
                </Text>
              </Box>
              <Box className="flex-row py-2 px-4 border-[1px] border-red-400 gap-2 items-center rounded-md">
                <Icon as={CircleAlert} size="lg" className="stroke-red-600" />
                <Text className="text-red-600">
                  Local grande para o animal correr e brincar.
                </Text>
              </Box>
              <Box className="flex-row py-2 px-4 border-[1px] border-red-400 gap-2 items-center rounded-md">
                <Icon as={CircleAlert} size="lg" className="stroke-red-600" />
                <Text className="text-red-600">
                  Local grande para o animal correr e brincar.
                </Text>
              </Box>
              <Box className="flex-row py-2 px-4 border-[1px] border-red-400 gap-2 items-center rounded-md">
                <Icon as={CircleAlert} size="lg" className="stroke-red-600" />
                <Text className="text-red-600">
                  Local grande para o animal correr e brincar.
                </Text>
              </Box>
            </Box>
          </Box>

          <Button className="mt-8 bg-green-400 rounded-xl">
            <Icon as={MessageCircle} className="stroke-white" />
            <Text className="text-white">Entre em contato</Text>
          </Button>
        </Box>
      </Box>
    </ScrollView>
  );
};

export default PetDetailsScreen;

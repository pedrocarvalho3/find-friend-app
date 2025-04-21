import type React from "react";
import type { EnergyLevel, Environment, PetSize } from "./PetFilter";
import { Pressable } from "react-native";
import { Box } from "../ui/box";
import { Image } from "../ui/image";
import { VStack } from "../ui/vstack";
import { Text } from "../ui/text";

interface Pet {
  id: string;
  name: string;
  description: string;
  age: string;
  size: PetSize;
  energy_level: EnergyLevel;
  environment: Environment;
  photos: string[];
  organization_id: string;
  city: string;
  is_available: boolean;
}

const PetCard: React.FC<{ pet: Pet; onPress: () => void }> = ({
  pet,
  onPress,
}) => {
  return (
    <Pressable onPress={onPress} className="mb-4 ">
      <Box className="bg-gray-200 rounded-3xl overflow-hidden shadow-sm">
        <Box className="relative">
          <Image
            source={{
              uri: pet.photos[0] || "https://via.placeholder.com/300x200",
            }}
            alt={pet.name}
            height={200}
            className="w-full h-60 p-1 rounded-3xl"
            resizeMode="cover"
          />
        </Box>
        <VStack space="xs" className="p-4">
          <Text className="text-lg font-bold text-gray-800 text-center">
            {pet.name}
          </Text>
        </VStack>
      </Box>
    </Pressable>
  );
};

export default PetCard;

import { Alert, Platform, SafeAreaView, ScrollView, TouchableOpacity } from "react-native";
import { Image } from "../components/ui/image";
import { Text } from "../components/ui/text";
import { VStack } from "../components/ui/vstack";
import { Heading } from "../components/ui/heading";
import { Button, ButtonText } from "../components/ui/button";
import { HStack } from "../components/ui/hstack";
import { ageOptions, dependencyOptions, energyOptions, environmentOptions, sizeOptions } from "../constants/petOptions";
import { SelectController } from "../components/form/SelectController";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Constants from "expo-constants";
import InputController from "../components/form/InputController";
import { TextareaController } from "../components/form/TextareaController";
import { useEffect, useState } from "react";
import * as ImagePicker from 'expo-image-picker';
import { useToast } from "../components/ui/toast";
import ShowAppToast from "../components/commons/ShowToast";
import { Plus } from "lucide-react-native";

const registerPetSchema = z.object({
  name: z.string(),
  about: z.string(),
  age: z.enum(['PUPPY', 'ADULT', 'ELDERLY']),
  size: z.enum(['SMALL', 'MEDIUM', 'LARGE']),
  energyLevel: z.enum(['VERY_LOW', 'LOW', 'MEDIUM', 'HIGH', 'VERY_HIGH']),
  environment: z.enum(['SMALL_SPACE', 'MEDIUM_SPACE', 'LARGE_SPACE']),
  dependencyLevel: z.enum([
    'VERY_LOW',
    'LOW',
    'MEDIUM',
    'HIGH',
    'VERY_HIGH',
  ]),
  photos: z.array(z.string()).nonempty(),
  adoption_requirements: z.array(z.string()).nonempty(),
})

type RegisterPetSchema = z.infer<typeof registerPetSchema>

const RegisterPet = () => {
  const toast = useToast()

  const { handleSubmit, control } = useForm<RegisterPetSchema>({
    resolver: zodResolver(registerPetSchema)
  })

  const handleRegisterPet = async (data: RegisterPetSchema) => {
    const apiUrl = Constants?.expoConfig?.extra?.API_URL;
    console.log(data)
  }

  const [photos, setPhotos] = useState<string[]>([])

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
        if (status !== 'granted') {
          ShowAppToast(toast, "warning", "Precisamos de permissão para acessar sua galeria de imagens", "Permissão necessária!");
        }
      }
    })
  })

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.7,
      })

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setPhotos([...photos, result.assets[0].uri])
      }
    } catch (error) {
      console.error('Erro ao selecionar imagem:', error)
      ShowAppToast(toast, "error", "Não foi possível selecionar a imagem.");
    }
  }

  const removePhoto = (index: number) => {
    Alert.alert(
      'Remover foto',
      'Tem certeza que deseja remover esta foto?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Remover',
          onPress: () => {
            const updatedPhotos = [...photos];
            updatedPhotos.splice(index, 1);
            setPhotos(updatedPhotos);
          },
          style: 'destructive',
        },
      ]
    );
  }

  return (
    <ScrollView className="flex-1">
      <VStack space="xl" className="p-8 mt-12">
        <Heading className="text-blue-900 font-bold text-5xl">
          Adicione um pet
        </Heading>

        <InputController
          control={control}
          name="name"
          label="Nome do seu pet"
        />

        <TextareaController
          control={control}
          name="about"
          label="Sobre"
          placeholder="Descreva sobre o pet..."
        />


        <SelectController
          control={control}
          name="age"
          label="Idade"
          placeholder="Selecione a idade"
          options={ageOptions}
        />

        <SelectController
          control={control}
          name="size"
          label="Tamanho"
          placeholder="Selecione o tamanho"
          options={sizeOptions}
        />

        <SelectController
          control={control}
          name="energyLevel"
          label="Nível de Energia"
          placeholder="Selecione o nível de energia"
          options={energyOptions}
        />

        <SelectController
          control={control}
          name="dependencyLevel"
          label="Nível de Dependência"
          placeholder="Selecione o nível de dependência"
          options={dependencyOptions}
        />

        <SelectController
          control={control}
          name="environment"
          label="Ambiente"
          placeholder="Selecione o ambiente ideal"
          options={environmentOptions}
        />

        <HStack>
          <Text className="text-lg font-bold">Fotos do Pet</Text>
          <TouchableOpacity
            onPress={pickImage}
            className="flex-row items-center bg-blue-500 px-3 py-2 rounded-lg"
          >
            <Plus size={18} color="white" />
            <Text className="text-white ml-1">Adicionar</Text>
          </TouchableOpacity>
        </HStack>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mt-2 px-2"
        >
          <HStack space="xs" className="py-2">
            {photos.map((photo, index) => (
              <TouchableOpacity
                key={index}
              >
                <Image
                  source={{ uri: photo }}
                  className={'w-20 h-20 rounded-m'}
                  alt={`Photo da galeria do seu Pet`}
                />
              </TouchableOpacity>
            ))}
          </HStack>
        </ScrollView>

        <Button
          onPress={() => console.log("login feito com sucesso")}
          className="rounded-xl bg-blue-800 h-12"
        >
          <ButtonText>Cadastrar Pet</ButtonText>
        </Button>
      </VStack>
    </ScrollView>
  );
};

export default RegisterPet;

import { SafeAreaView, ScrollView } from "react-native";
import { Text } from "../components/ui/text";
import { VStack } from "../components/ui/vstack";
import { Heading } from "../components/ui/heading";
import {
  Input,
  InputField,
  InputIcon,
  InputSlot,
} from "../components/ui/input";
import { Button, ButtonIcon, ButtonText } from "../components/ui/button";
import { Textarea, TextareaInput } from "../components/ui/textarea";
import {
  Select,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectIcon,
  SelectInput,
  SelectItem,
  SelectPortal,
  SelectTrigger,
} from "../components/ui/select";
import { ChevronDownIcon, ImageIcon, Plus } from "lucide-react-native";
import { useState } from "react";
import { Icon } from "../components/ui/icon";
import { HStack } from "../components/ui/hstack";
import type { DependencyLevel, EnergyLevel, Environment, PetAge, PetSize } from "../types/pets";
import { ageOptions, dependencyOptions, energyOptions, environmentOptions, sizeOptions } from "../constants/petOptions";

const AddPet = () => {
  const [age, setAge] = useState<PetAge | "">("");
  const [size, setSize] = useState<PetSize | "">("");
  const [energyLevel, setEnergyLevel] = useState<EnergyLevel | "">("");
  const [dependencyLevel, setDependencyLevel] = useState<DependencyLevel | "">("");
  const [environment, setEnvironment] = useState<Environment | "">("");

  return (
    <ScrollView className="flex-1">
      <VStack space="xl" className="p-8 mt-12">
        <Heading className="text-blue-900 font-bold text-5xl">
          Adicione um pet
        </Heading>
        <VStack space="xs" className="mt-4">
          <Text className="">Nome</Text>
          <Input>
            <InputField type="text" />
          </Input>
        </VStack>
        <VStack space="xs">
          <Text className="">Sobre</Text>
          <Textarea
            size="md"
            isReadOnly={false}
            isInvalid={false}
            isDisabled={false}
          >
            <TextareaInput placeholder="Descreva sobre o pet..." />
          </Textarea>
        </VStack>

        <VStack space="sm">
          <Text>
            Idade
          </Text>
          <Select
            selectedValue={age}
            onValueChange={(value) => setAge(value as PetAge)}
          >
            <SelectTrigger className="bg-gray-100 rounded-lg">
              <SelectInput
                placeholder="Selecione o idade"
                className="p-4"
              />
              <SelectIcon>
                <ChevronDownIcon />
              </SelectIcon>
            </SelectTrigger>
            <SelectPortal>
              <SelectBackdrop />
              <SelectContent>
                <SelectDragIndicatorWrapper>
                  <SelectDragIndicator />
                </SelectDragIndicatorWrapper>
                {ageOptions.map((option) => (
                  <SelectItem
                    key={option.value}
                    label={option.label}
                    value={option.value}
                  />
                ))}
              </SelectContent>
            </SelectPortal>
          </Select>
        </VStack>

        <VStack space="sm">
          <Text>Tamanho</Text>
          <Select
            selectedValue={size}
            onValueChange={(value) => setSize(value as PetSize)}
          >
            <SelectTrigger className="bg-gray-100 rounded-lg">
              <SelectInput placeholder="Selecione o tamanho" className="p-4" />
              <SelectIcon>
                <ChevronDownIcon />
              </SelectIcon>
            </SelectTrigger>
            <SelectPortal>
              <SelectBackdrop />
              <SelectContent>
                <SelectDragIndicatorWrapper>
                  <SelectDragIndicator />
                </SelectDragIndicatorWrapper>
                {sizeOptions.map((option) => (
                  <SelectItem
                    key={option.value}
                    label={option.label}
                    value={option.value}
                  />
                ))}
              </SelectContent>
            </SelectPortal>
          </Select>
        </VStack>

        <VStack space="sm">
          <Text>Nível de Energia</Text>
          <Select
            selectedValue={energyLevel}
            onValueChange={(value) => setEnergyLevel(value as EnergyLevel)}
          >
            <SelectTrigger className="bg-gray-100 rounded-lg">
              <SelectInput
                placeholder="Selecione o nível de energia"
                className="p-4"
              />
              <SelectIcon className="mr-2">
                <ChevronDownIcon />
              </SelectIcon>
            </SelectTrigger>
            <SelectPortal>
              <SelectBackdrop />
              <SelectContent>
                <SelectDragIndicatorWrapper>
                  <SelectDragIndicator />
                </SelectDragIndicatorWrapper>
                {energyOptions.map((option) => (
                  <SelectItem
                    key={option.value}
                    label={option.label}
                    value={option.value}
                  />
                ))}
              </SelectContent>
            </SelectPortal>
          </Select>
        </VStack>

        <VStack space="sm">
          <Text>
            Nível de Dependência
          </Text>
          <Select
            selectedValue={dependencyLevel}
            onValueChange={(value) => setDependencyLevel(value as DependencyLevel)}
          >
            <SelectTrigger className="bg-gray-100 rounded-lg">
              <SelectInput
                placeholder="Selecione o nível de energia"
                className="p-4"
              />
              <SelectIcon className="mr-2">
                <ChevronDownIcon />
              </SelectIcon>
            </SelectTrigger>
            <SelectPortal>
              <SelectBackdrop />
              <SelectContent>
                <SelectDragIndicatorWrapper>
                  <SelectDragIndicator />
                </SelectDragIndicatorWrapper>
                {dependencyOptions.map((option) => (
                  <SelectItem
                    key={option.value}
                    label={option.label}
                    value={option.value}
                  />
                ))}
              </SelectContent>
            </SelectPortal>
          </Select>
        </VStack>

        <VStack space="sm">
          <Text>Ambiente</Text>
          <Select
            selectedValue={environment}
            onValueChange={(value) => setEnvironment(value as Environment)}
          >
            <SelectTrigger className="bg-gray-100 rounded-lg">
              <SelectInput
                placeholder="Selecione o ambiente ideal"
                className="p-4"
              />
              <SelectIcon className="mr-2">
                <ChevronDownIcon />
              </SelectIcon>
            </SelectTrigger>
            <SelectPortal>
              <SelectBackdrop />
              <SelectContent>
                <SelectDragIndicatorWrapper>
                  <SelectDragIndicator />
                </SelectDragIndicatorWrapper>
                {environmentOptions.map((option) => (
                  <SelectItem
                    key={option.value}
                    label={option.label}
                    value={option.value}
                  />
                ))}
              </SelectContent>
            </SelectPortal>
          </Select>
        </VStack>

        <HStack space="md" className="mt-2">
          <Button>
            {/* <ButtonIcon as={ImageIcon} className="text-blue-600" /> */}
            <ButtonText className="text-blue-600 ml-2">Galeria</ButtonText>
          </Button>
        </HStack>

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

export default AddPet;

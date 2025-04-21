import { useState } from "react";
import { Text } from "../ui/text";
import { ScrollView, TouchableOpacity, View, Modal } from "react-native";
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
} from "../ui/select";
import { Button, ButtonText } from "../ui/button";
import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
  ActionsheetScrollView,
} from "../ui/actionsheet";
import { VStack } from "../ui/vstack";
import { HStack } from "../ui/hstack";
import { ChevronDownIcon } from "../ui/icon";
import { Input, InputField } from "../ui/input";

export interface FindAllParams {
  city: string;
  age?: string;
  size?: PetSize;
  energy_level?: EnergyLevel;
  environment?: Environment;
}

export type PetSize = "SMALL" | "MEDIUM" | "LARGE";
export type EnergyLevel = "ONE" | "TWO" | "THREE" | "FOUR" | "FIVE";
export type Environment = "SMALL_SPACE" | "MEDIUM_SPACE" | "LARGE_SPACE";

const PetFilter: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: Omit<any, "city">) => void;
  currentFilters: Partial<FindAllParams>;
}> = ({ isOpen, onClose, onApplyFilters, currentFilters }) => {
  const [age, setAge] = useState<string>(currentFilters.age || "");
  const [size, setSize] = useState<PetSize | "">(currentFilters.size || "");
  const [energyLevel, setEnergyLevel] = useState<EnergyLevel | "">(
    currentFilters.energy_level || ""
  );
  const [environment, setEnvironment] = useState<Environment | "">(
    currentFilters.environment || ""
  );

  const handleApplyFilters = () => {
    const filters: Partial<any> = {};

    if (age) filters.age = age;
    if (size) filters.size = size;
    if (energyLevel) filters.energy_level = energyLevel;
    if (environment) filters.environment = environment;

    onApplyFilters(filters);
    onClose();
  };

  const handleClearFilters = () => {
    setAge("");
    setSize("");
    setEnergyLevel("");
    setEnvironment("");
  };

  const sizeOptions = [
    { label: "Pequeno", value: "SMALL" },
    { label: "Médio", value: "MEDIUM" },
    { label: "Grande", value: "LARGE" },
  ];

  const energyOptions = [
    { label: "Muito baixo", value: "ONE" },
    { label: "Baixo", value: "TWO" },
    { label: "Moderado", value: "THREE" },
    { label: "Alto", value: "FOUR" },
    { label: "Muito alto", value: "FIVE" },
  ];

  const environmentOptions = [
    { label: "Espaço pequeno", value: "SMALL_SPACE" },
    { label: "Espaço médio", value: "MEDIUM_SPACE" },
    { label: "Espaço amplo", value: "LARGE_SPACE" },
  ];

  return (
    <Actionsheet isOpen={isOpen} onClose={onClose} snapPoints={[75]}>
      <ActionsheetBackdrop />
      <ActionsheetContent>
        <ActionsheetDragIndicatorWrapper>
          <ActionsheetDragIndicator />
        </ActionsheetDragIndicatorWrapper>

        <VStack space="4xl" className="p-6 w-full">
          <HStack className="justify-between items-center mb-4">
            <Text className="text-xl font-bold text-gray-800">Filtros</Text>
            <Button variant="link" onPress={handleClearFilters} className="p-0">
              <ButtonText className="text-primary-500 font-semibold">
                Limpar
              </ButtonText>
            </Button>
          </HStack>

          <ActionsheetScrollView showsVerticalScrollIndicator={false}>
            <VStack space="sm" className="mb-6">
              <Text className="text-lg font-semibold text-gray-800">Idade</Text>
              <Input
                variant="underlined"
                size="md"
                isDisabled={false}
                isInvalid={false}
                isReadOnly={false}
              >
                <InputField placeholder="Digite a idade" />
              </Input>
            </VStack>

            <VStack space="sm" className="mb-6">
              <Text className="text-lg font-semibold text-gray-800">
                Tamanho
              </Text>
              <Select
                selectedValue={size}
                onValueChange={(value) => setSize(value as PetSize)}
              >
                <SelectTrigger className="bg-gray-100 rounded-lg">
                  <SelectInput
                    placeholder="Selecione o tamanho"
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

            <VStack space="sm" className="mb-6">
              <Text className="text-lg font-semibold text-gray-800">
                Nível de Energia
              </Text>
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

            <VStack space="sm" className="mb-6">
              <Text className="text-lg font-semibold text-gray-800">
                Ambiente
              </Text>
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
          </ActionsheetScrollView>

          <HStack space="md">
            <Button
              variant="outline"
              className="flex-1 border border-gray-300"
              onPress={onClose}
            >
              <ButtonText>Cancelar</ButtonText>
            </Button>
            <Button
              variant="solid"
              className="flex-1 bg-primary-500"
              onPress={handleApplyFilters}
            >
              <ButtonText>Aplicar</ButtonText>
            </Button>
          </HStack>
        </VStack>
      </ActionsheetContent>
    </Actionsheet>
  );
};

export default PetFilter;

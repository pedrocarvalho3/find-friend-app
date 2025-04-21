import {
  FlatList,
  Platform,
  SafeAreaView,
  StatusBar,
  View,
} from "react-native";
import Constants from "expo-constants";
import { Fab, FabIcon, FabLabel } from "../components/ui/fab";
import { AddIcon } from "../components/ui/icon";
import { useEffect, useState } from "react";
import DefaultHeader from "../components/commons/DefaultHeader";
import PetFilter, {
  type EnergyLevel,
  type Environment,
  type FindAllParams,
  type PetSize,
} from "../components/commons/PetFilter";
import FilterBadge from "../components/commons/FilterBadge";
import { useNavigation } from "expo-router";
import { Center } from "../components/ui/center";
import { Spinner } from "../components/ui/spinner";
import EmptyList from "../components/commons/EmptyList";
import PetCard from "../components/commons/PetCard";
import React from "react";

const SearchPetsScreen: React.FC = React.memo(() => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<Partial<FindAllParams>>(
    {}
  );
  const [pets, setPets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();

  const fetchPets = async (filters: Partial<FindAllParams> = {}) => {
    try {
      setLoading(true);

      setTimeout(() => {
        setPets([
          {
            id: "1",
            name: "Rex",
            description: "Um cachorro amigável e brincalhão",
            age: "Jovem",
            size: "MEDIUM",
            energy_level: "FOUR",
            environment: "MEDIUM_SPACE",
            photos: [
              "https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
            ],
            organization_id: "org1",
            city: "São Paulo",
            is_available: true,
          },
          {
            id: "2",
            name: "Luna",
            description: "Uma gata muito dócil e tranquila",
            age: "Adulto",
            size: "SMALL",
            energy_level: "TWO",
            environment: "SMALL_SPACE",
            photos: [
              "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
            ],
            organization_id: "org2",
            city: "Rio de Janeiro",
            is_available: true,
          },
          {
            id: "3",
            name: "Bob",
            description:
              "Um cachorro de porte grande, ideal para espaços amplos",
            age: "Idoso",
            size: "LARGE",
            energy_level: "THREE",
            environment: "LARGE_SPACE",
            photos: [
              "https://images.unsplash.com/photo-1477884213360-7e9d7dcc1e48?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
            ],
            organization_id: "org1",
            city: "Belo Horizonte",
            is_available: false,
          },
        ]);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error("Erro ao buscar pets:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPets(activeFilters);
  }, [activeFilters]);

  const statusBarHeight =
    Platform.OS === "android"
      ? StatusBar.currentHeight
      : Constants.statusBarHeight;

  const getSizeLabel = (size: PetSize) => {
    const map = { SMALL: "Pequeno", MEDIUM: "Médio", LARGE: "Grande" };
    return map[size];
  };

  const getEnergyLabel = (energy: EnergyLevel) => {
    const map = {
      ONE: "Muito baixo",
      TWO: "Baixo",
      THREE: "Moderado",
      FOUR: "Alto",
      FIVE: "Muito alto",
    };
    return map[energy];
  };

  const getEnvironmentLabel = (env: Environment) => {
    const map = {
      SMALL_SPACE: "Espaço pequeno",
      MEDIUM_SPACE: "Espaço médio",
      LARGE_SPACE: "Espaço amplo",
    };
    return map[env];
  };

  const handleApplyFilters = (filters: Partial<FindAllParams>) => {
    setActiveFilters(filters);
  };

  const removeFilter = (filterKey: keyof FindAllParams) => {
    const newFilters = { ...activeFilters };
    delete newFilters[filterKey];
    setActiveFilters(newFilters);
  };

  const navigateToPetDetails = (petId: string) => {
    console.log(`Navegando para detalhes do pet ${petId}`);
  };

  return (
    <>
      <StatusBar backgroundColor="#F15156" barStyle="light-content" />

      <View style={{ height: statusBarHeight, backgroundColor: "#F15156" }} />

      <DefaultHeader />

      <SafeAreaView className="flex-1 bg-gray-100">
        <View className="flex-1 p-4">
          {Object.keys(activeFilters).length > 0 && (
            <View className="flex-row flex-wrap mb-4 justify-end">
              {activeFilters.age && (
                <FilterBadge
                  label={`Idade: ${activeFilters.age}`}
                  onRemove={() => removeFilter("age")}
                />
              )}
              {activeFilters.size && (
                <FilterBadge
                  label={`Tamanho: ${getSizeLabel(activeFilters.size)}`}
                  onRemove={() => removeFilter("size")}
                />
              )}
              {activeFilters.energy_level && (
                <FilterBadge
                  label={`Energia: ${getEnergyLabel(
                    activeFilters.energy_level
                  )}`}
                  onRemove={() => removeFilter("energy_level")}
                />
              )}
              {activeFilters.environment && (
                <FilterBadge
                  label={`Ambiente: ${getEnvironmentLabel(
                    activeFilters.environment
                  )}`}
                  onRemove={() => removeFilter("environment")}
                />
              )}
            </View>
          )}

          {loading ? (
            <Center className="flex-1">
              <Spinner size="large" color="primary.500" />
            </Center>
          ) : (
            <FlatList
              data={pets}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <PetCard
                  pet={item}
                  onPress={() => navigateToPetDetails(item.id)}
                />
              )}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ padding: 12 }}
              ListEmptyComponent={<EmptyList />}
            />
          )}

          <Fab
            size="md"
            placement="bottom right"
            isHovered={false}
            isDisabled={false}
            isPressed={false}
            onPress={() => setIsFilterOpen(true)}
            className="bg-yellow-500"
          >
            <FabIcon as={AddIcon} className="text-gray-100" />
            <FabLabel className="text-gray-100">Filtrar</FabLabel>
          </Fab>

          <PetFilter
            isOpen={isFilterOpen}
            onClose={() => setIsFilterOpen(false)}
            onApplyFilters={handleApplyFilters}
            currentFilters={activeFilters}
          />
        </View>
      </SafeAreaView>
    </>
  );
});

export default SearchPetsScreen;

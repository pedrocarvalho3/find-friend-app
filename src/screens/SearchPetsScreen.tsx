import { Platform, SafeAreaView, StatusBar, View } from "react-native";
import Constants from "expo-constants";
import { Fab, FabIcon, FabLabel } from "../components/ui/fab";
import { AddIcon } from "../components/ui/icon";
import { useState } from "react";
import DefaultHeader from "../components/commons/DefaultHeader";
import PetFilter, {
  type EnergyLevel,
  type Environment,
  type FindAllParams,
  type PetSize,
} from "../components/commons/PetFilter";
import FilterBadge from "../components/commons/FilterBadge";

const SearchPetsScreen: React.FC = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<Partial<FindAllParams>>(
    {}
  );

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
          <Fab
            size="md"
            placement="bottom right"
            isHovered={false}
            isDisabled={false}
            isPressed={false}
            onPress={() => setIsFilterOpen(true)}
            className="bg-yellow-400"
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
};

export default SearchPetsScreen;

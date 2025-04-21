import React from "react";
import { Box } from "../ui/box";
import { Text } from "../ui/text";
import {
  Select,
  SelectBackdrop,
  SelectContent,
  SelectInput,
  SelectItem,
  SelectPortal,
  SelectTrigger,
} from "../ui/select";
import { useLocation } from "@/src/context/LocationContext";
import { Button, ButtonIcon } from "../ui/button";
import { SearchIcon } from "../ui/icon";

interface Props {
  labelText: string;
  hasButton?: boolean;
  onButtonPress?: () => void;
}

const LocationSetter: React.FC<Props> = ({
  labelText,
  hasButton,
  onButtonPress,
}) => {
  const { state, city, setState, setCity } = useLocation();

  return (
    <Box className="gap-4">
      <Text>{labelText}</Text>
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
              {state === "PE" && <SelectItem label="Recife" value="Recife" />}
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

        {hasButton ? (
          <Button
            variant="solid"
            className="bg-yellow-500 rounded-full"
            onPress={onButtonPress}
          >
            <ButtonIcon as={SearchIcon} />
          </Button>
        ) : null}
      </Box>
    </Box>
  );
};

export default LocationSetter;

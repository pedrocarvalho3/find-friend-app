// components/form/SelectController.tsx

import { Controller } from "react-hook-form";
import {
  FormControl,
  FormControlLabel,
  FormControlError,
  FormControlErrorText,
} from "../ui/form-control";
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
import { ChevronDownIcon } from "lucide-react-native";
import { Text } from "../ui/text";

type Option = {
  label: string;
  value: string;
};

type SelectControllerProps = {
  control: any;
  name: string;
  label: string;
  placeholder?: string;
  options: Option[];
};

export const SelectController = ({
  control,
  name,
  label,
  placeholder,
  options,
}: SelectControllerProps) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <FormControl isInvalid={!!error}>
          <FormControlLabel>
            <Text>{label}</Text>
          </FormControlLabel>
          <Select selectedValue={value} onValueChange={onChange}>
            <SelectTrigger>
              <SelectInput
                placeholder={placeholder || "Selecione"}
                value={options.find((option) => option.value === value)?.label || ''}
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
                {options.map((option) => (
                  <SelectItem
                    key={option.value}
                    label={option.label}
                    value={option.value}
                  />
                ))}
              </SelectContent>
            </SelectPortal>
          </Select>
          {error && (
            <FormControlError>
              <FormControlErrorText>{error.message}</FormControlErrorText>
            </FormControlError>
          )}
        </FormControl>
      )}
    />
  );
};

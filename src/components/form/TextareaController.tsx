import { Controller } from "react-hook-form";
import {
  FormControl,
  FormControlLabel,
  FormControlError,
  FormControlErrorText,
} from "../ui/form-control";
import { Textarea, TextareaInput } from "../ui/textarea";
import { Text } from "../ui/text";

type TextareaControllerProps = {
  control: any;
  name: string;
  label: string;
  placeholder?: string;
};

export const TextareaController = ({
  control,
  name,
  label,
  placeholder,
}: TextareaControllerProps) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <FormControl isInvalid={!!error}>
          <FormControlLabel>
            <Text>{label}</Text>
          </FormControlLabel>
          <Textarea>
            <TextareaInput
              placeholder={placeholder || "Digite aqui..."}
              value={value}
              onChangeText={onChange}
              multiline
              numberOfLines={4}
              className="p-4"
            />
          </Textarea>
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

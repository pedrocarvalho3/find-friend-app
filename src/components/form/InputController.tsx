import { Controller } from "react-hook-form";
import { FormControl, FormControlError, FormControlErrorText, FormControlLabel } from "../ui/form-control";
import { Text } from "../ui/text";
import { Input, InputField, InputIcon, InputSlot } from "../ui/input";
import { EyeIcon, EyeOffIcon } from "lucide-react-native";

type InputControllerProps = {
  control: any;
  name: string;
  label: string;
  secureTextEntry?: boolean;
  showToggle?: boolean;
  showPassword?: boolean;
  togglePassword?: () => void;
  keyboardType?: "default" | "email-address" | "numeric";
}

const InputController = ({
  control,
  name,
  label,
  secureTextEntry,
  showToggle,
  showPassword,
  togglePassword,
  keyboardType = "default",
}: InputControllerProps) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
        <FormControl isInvalid={!!error}>
          <FormControlLabel>
            <Text>{label}</Text>
          </FormControlLabel>
          <Input>
            <InputField
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              secureTextEntry={secureTextEntry && !showPassword}
              keyboardType={keyboardType}
              autoCapitalize="none"
            />
            {showToggle && (
              <InputSlot className="pr-3" onPress={togglePassword}>
                <InputIcon as={showPassword ? EyeIcon : EyeOffIcon} />
              </InputSlot>
            )}
          </Input>
          {error && (
            <FormControlError>
              <FormControlErrorText>{error.message}</FormControlErrorText>
            </FormControlError>
          )}
        </FormControl>
      )}
    />
  )
}

export default InputController
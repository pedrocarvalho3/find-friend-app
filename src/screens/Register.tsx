import { SafeAreaView } from "react-native";
import { Text } from "../components/ui/text";
import { Heading } from "../components/ui/heading";
import { VStack } from "../components/ui/vstack";
import {
  Input,
  InputField,
  InputIcon,
  InputSlot,
} from "../components/ui/input";
import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react-native";
import { Button, ButtonText } from "../components/ui/button";
import { useRouter } from "expo-router";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100 justify-center">
      <VStack space="xl" className="p-8">
        <Heading className="text-blue-900 font-bold text-5xl">
          Cadastre sua organização
        </Heading>
        <VStack space="xs" className="mt-4">
          <Text className="">Nome do responsável</Text>
          <Input>
            <InputField type="text" />
          </Input>
        </VStack>
        <VStack space="xs">
          <Text className="">Email</Text>
          <Input>
            <InputField type="text" />
          </Input>
        </VStack>
        <VStack space="xs">
          <Text className="">CEP</Text>
          <Input>
            <InputField type="text" />
          </Input>
        </VStack>
        <VStack space="xs">
          <Text className="">Endereço</Text>
          <Input>
            <InputField type="text" />
          </Input>
        </VStack>
        <VStack space="xs">
          <Text className="">Whatsapp</Text>
          <Input>
            <InputField type="text" />
          </Input>
        </VStack>
        <VStack space="xs">
          <Text>Password</Text>
          <Input>
            <InputField type={showPassword ? "text" : "password"} />
            <InputSlot className="pr-3" onPress={() => !setShowPassword}>
              <InputIcon as={showPassword ? EyeIcon : EyeOffIcon} />
            </InputSlot>
          </Input>
        </VStack>
        <VStack space="xs">
          <Text>Confirmar Password</Text>
          <Input>
            <InputField type={showPassword ? "text" : "password"} />
            <InputSlot className="pr-3" onPress={() => !setShowPassword}>
              <InputIcon as={showPassword ? EyeIcon : EyeOffIcon} />
            </InputSlot>
          </Input>
        </VStack>
        <Button
          onPress={() => console.log("Register feito com sucesso")}
          className="rounded-xl bg-blue-800 h-12"
        >
          <ButtonText>Register</ButtonText>
        </Button>
        <Button
          onPress={handleGoBack}
          variant="link"
          className="bg-gray-200 rounded-xl h-12"
        >
          <ButtonText className="text-blue-600">Já tenho uma conta</ButtonText>
        </Button>
      </VStack>
    </SafeAreaView>
  );
};

export default Register;

import { SafeAreaView, ScrollView } from "react-native";
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
    <ScrollView className="mt-8">
      <VStack space="xl" className="p-8">
        <Heading className="text-blue-900 font-bold text-5xl">
          Cadastre sua organização
        </Heading>
        <VStack space="xs" className="mt-4">
          <Text>Nome do responsável</Text>
          <Input>
            <InputField type="text" />
          </Input>
        </VStack>
        <VStack space="xs">
          <Text>Email</Text>
          <Input>
            <InputField type="text" />
          </Input>
        </VStack>
        <VStack space="xs">
          <Text>CEP</Text>
          <Input>
            <InputField type="text" />
          </Input>
        </VStack>
        <VStack space="xs">
          <Text>Cidade</Text>
          <Input>
            <InputField type="text" />
          </Input>
        </VStack>
        <VStack space="xs">
          <Text>Estado</Text>
          <Input>
            <InputField type="text" />
          </Input>
        </VStack>
        <VStack space="xs">
          <Text>Bairro</Text>
          <Input>
            <InputField type="text" />
          </Input>
        </VStack>
        <VStack space="xs">
          <Text>Rua</Text>
          <Input>
            <InputField type="text" />
          </Input>
        </VStack>
        <VStack space="xs">
          <Text>Whatsapp</Text>
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
    </ScrollView>

  );
};

export default Register;

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
import { useEffect, useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react-native";
import { Button, ButtonText } from "../components/ui/button";
import { useRouter } from "expo-router";
import InputController from "../components/form/InputController";
import { z } from "zod";
import { useToast } from "../components/ui/toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import Constants from "expo-constants";
import ShowAppToast from "../components/commons/ShowToast";

const registerSchema = z.object({
  email: z.string().email("Email inválido!"),
  password: z.string().min(8, 'A senha deve ter no minímo 8 caracteres!'),
  repeated_password: z.string().min(8, 'A senha deve ter no minímo 8 caracteres!'),
  name: z.string(),
  author_name: z.string(),
  whatsapp: z.string(),
  cep: z.string(),
  state: z.string(),
  city: z.string(),
  neighborhood: z.string(),
  street: z.string(),
  latitude: z.number(),
  longitude: z.number(),
}).refine((data) => data.password == data.repeated_password, {
  path: ['repeated_password'],
  message: 'As senhas não coincidem!'
});

type RegisterSchema = z.infer<typeof registerSchema>

const Register = () => {
  const toast = useToast()

  const { handleSubmit, control, formState: { errors } } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      latitude: 0,
      longitude: 0,
    },
  });

  const router = useRouter()
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [repeatedShowPassword, setRepeatedShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleRegister = async (data: RegisterSchema) => {
    const apiUrl = Constants?.expoConfig?.extra?.API_URL;
    setIsLoading(true);

    try {
      await axios.post(`${apiUrl}/orgs`, data);

      ShowAppToast(toast, "success", "Cadastro realizado com sucesso!");
      router.back();
    } catch (error) {
      const defaultMessage = "Ocorreu um erro inesperado"

      if (axios.isAxiosError(error)) {
        const status = error.response?.status

        const toastMessage =
          status === 409
            ? "Org com e-mail já cadastrado!"
            : defaultMessage

        ShowAppToast(toast, "error", toastMessage)
      } else {
        ShowAppToast(toast, "error", defaultMessage)
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoBack = () => {
    router.back();
  };

  return (
    <ScrollView className="mt-8">
      <VStack space="xl" className="p-8">
        <Heading className="text-blue-900 font-bold text-5xl">
          Cadastre sua organização
        </Heading>

        <VStack space="md" className="mt-4">
          <InputController
            control={control}
            name="name"
            label="Nome da organização"
          />

          <InputController
            control={control}
            name="author_name"
            label="Nome do responsável"
          />

          <InputController
            control={control}
            name="email"
            label="Email"
            keyboardType="email-address"
          />

          <InputController
            control={control}
            name="cep"
            label="CEP"
          />

          <InputController
            control={control}
            name="city"
            label="Cidade"
          />

          <InputController
            control={control}
            name="state"
            label="Estado"
          />

          <InputController
            control={control}
            name="neighborhood"
            label="Bairro"
          />

          <InputController
            control={control}
            name="street"
            label="Rua"
          />

          <InputController
            control={control}
            name="whatsapp"
            label="Whatssap"
          />

          <InputController
            control={control}
            name="password"
            label="Senha"
            secureTextEntry
            showToggle
            showPassword={showPassword}
            togglePassword={() => setShowPassword(prev => !prev)}
          />

          <InputController
            control={control}
            name="repeated_password"
            label="Confirmar senha"
            secureTextEntry
            showToggle
            showPassword={repeatedShowPassword}
            togglePassword={() => setRepeatedShowPassword(prev => !prev)}
          />
        </VStack>

        <Button
          onPress={handleSubmit(handleRegister)}
          className="rounded-xl bg-blue-800 h-12"
          disabled={isLoading}
        >
          <ButtonText>{isLoading ? "Carregando..." : "Cadastrar-se"}</ButtonText>
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

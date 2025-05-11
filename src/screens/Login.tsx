import React from 'react';
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
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller } from "react-hook-form";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";
import { useToast } from "../components/ui/toast";
import ShowAppToast from "../components/commons/ShowToast";
import { FormControl, FormControlError, FormControlErrorText, FormControlLabel } from '../components/ui/form-control';
import InputController from '../components/form/InputController';

const loginSchema = z.object({
  email: z.string().email("Email inválido!"),
  password: z.string().min(8, 'A senha deve ter no minímo 8 caracteres!'),
});

type LoginSchema = z.infer<typeof loginSchema>;

const Login = () => {
  const toast = useToast()

  const { handleSubmit, control, formState: { errors } } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const router = useRouter();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleLogin = async (data: LoginSchema) => {
    const apiUrl = Constants?.expoConfig?.extra?.API_URL;
    setIsLoading(true);

    try {
      const response = await axios.post(`${apiUrl}/sessions`, data);

      const { token } = response.data;
      await AsyncStorage.setItem("@app:token", token);

      ShowAppToast(toast, "success", "Login realizado com sucesso!");
      router.back();
    } catch (error) {
      const defaultMessage = "Ocorreu um erro inesperado"

      if (axios.isAxiosError(error)) {
        const status = error.response?.status

        const toastMessage =
          status === 400
            ? "Credencias inválidas!"
            : defaultMessage

        ShowAppToast(toast, "error", toastMessage)
      } else {
        ShowAppToast(toast, "error", defaultMessage)
      }
    } finally {
      setIsLoading(false)
    }
  };

  const handleRegisterPress = () => {
    router.navigate("/Register");
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100 justify-center">
      <VStack space="xl" className="p-8">
        <Heading className="text-blue-900 font-bold text-5xl">
          Boas-vindas!
        </Heading>
        <VStack space="md" className="mt-4">
          <InputController
            control={control}
            name="email"
            label="Email"
            keyboardType="email-address"
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
        </VStack>

        <Button
          onPress={handleSubmit(handleLogin)}
          className="rounded-xl bg-blue-800 h-12 mt-4"
          disabled={isLoading}
        >
          <ButtonText>{isLoading ? "Carregando..." : "Login"}</ButtonText>
        </Button>
        <Button
          onPress={handleRegisterPress}
          variant="link"
          className="bg-gray-200 rounded-xl h-12"
          disabled={isLoading}
        >
          <ButtonText className="text-blue-600">
            Cadastrar minha organização
          </ButtonText>
        </Button>
      </VStack>
    </SafeAreaView>
  );
};

export default Login;

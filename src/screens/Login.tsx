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

  const handleRegisterPress = () => {
    router.navigate("/Register");
  };

  const handleLogin = async (data: LoginSchema) => {
    const { email, password } = data;

    const apiUrl = Constants?.expoConfig?.extra?.API_URL;
    setIsLoading(true);

    try {
      const response = await axios.post(`${apiUrl}/sessions`, {
        email,
        password,
      });

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

  return (
    <SafeAreaView className="flex-1 bg-gray-100 justify-center">
      <VStack space="xl" className="p-8">
        <Heading className="text-blue-900 font-bold text-5xl">
          Boas-vindas!
        </Heading>
        <VStack space="xs" className="mt-4">
          <Text>Email</Text>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
              <>
                <Input isInvalid={!!error}>
                  <InputField
                    keyboardType="email-address"
                    autoCapitalize="none"
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                  />
                </Input>
                {error && (
                  <Text className="text-red-500 text-xs mt-1">{error.message}</Text>
                )}
              </>
            )}
          />

        </VStack>
        <VStack space="xs">
          <Text>Password</Text>
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
              <>
                <Input isInvalid={!!error}>
                  <InputField
                    secureTextEntry={!showPassword}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                  />
                  <InputSlot className="pr-3" onPress={() => setShowPassword((prev) => !prev)}>
                    <InputIcon as={showPassword ? EyeIcon : EyeOffIcon} />
                  </InputSlot>
                </Input>
                {error && (
                  <Text className="text-red-500 text-xs mt-1">{error.message}</Text>
                )}
              </>

            )}
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

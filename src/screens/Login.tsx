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
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";

const Login = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleRegisterPress = () => {
    router.navigate("/Register");
  };

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Por favor, preencha todos os campos");
      return;
    }

    const apiUrl = Constants?.expoConfig?.extra?.API_URL;
    console.log(apiUrl);

    try {
      setIsLoading(true);
      setError("");

      const response = await axios.post(`${apiUrl}/sessions`, {
        email,
        password,
      });

      const { token } = response.data;
      await AsyncStorage.setItem("@app:token", token);

      console.log("Login feito com sucesso");

      router.back();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          const errorMessage =
            error.response.data.message || "Credenciais inválidas";
          setError(errorMessage);
        } else {
          setError("Erro de conexão. Verifique sua internet.");
        }
      } else {
        setError("Ocorreu um erro ao fazer login");
      }
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
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
          <Input>
            <InputField
              type="text"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </Input>
        </VStack>
        <VStack space="xs">
          <Text>Password</Text>
          <Input>
            <InputField
              type={showPassword ? "text" : "password"}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
            <InputSlot className="pr-3" onPress={() => !setShowPassword}>
              <InputIcon as={showPassword ? EyeIcon : EyeOffIcon} />
            </InputSlot>
          </Input>
        </VStack>

        {error ? <Text className="text-red-500 mt-2">{error}</Text> : null}

        <Button
          onPress={handleLogin}
          className="rounded-xl bg-blue-800 h-12 mt-8"
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

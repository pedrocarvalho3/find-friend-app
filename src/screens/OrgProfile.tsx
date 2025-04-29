import { SafeAreaView } from "react-native";
import { Text } from "../components/ui/text";
import { Button, ButtonIcon, ButtonText } from "../components/ui/button";
import { Icon } from "../components/ui/icon";
import { LogOut, Plus } from "lucide-react-native";
import { useRouter } from "expo-router";
import { Box } from "../components/ui/box";
import AsyncStorage from "@react-native-async-storage/async-storage";

const OrgProfile = () => {
  const router = useRouter();

  const handleRedirectAddPet = () => {
    router.navigate("/AddPet");
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("@app:token");
      router.replace("/Login");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <Box className="p-8">
        <Text className="mb-8">Perfil da empresa</Text>

        <Button
          onPress={handleRedirectAddPet}
          variant="link"
          className="bg-gray-200 rounded-xl h-12 items-center"
        >
          <ButtonIcon as={Plus} className="stroke-blue-600" />
          <ButtonText className="text-blue-600">Cadastrar novo Pet</ButtonText>
        </Button>

        <Button
          onPress={handleLogout}
          variant="link"
          className="bg-red-200 rounded-xl h-12 items-center"
        >
          <ButtonIcon as={LogOut} className="stroke-red-600" />
          <ButtonText className="text-red-600">Sair</ButtonText>
        </Button>
      </Box>
    </SafeAreaView>
  );
};

export default OrgProfile;

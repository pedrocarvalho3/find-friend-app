import { Center } from "../ui/center";
import { Image } from "../ui/image";
import { Text } from "../ui/text";

const EmptyList: React.FC = () => (
  <Center className="flex-1 p-6">
    <Image
      source={{
        uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
      }}
      alt="Nenhum pet encontrado"
      height={150}
      width={150}
      resizeMode="contain"
      className="mb-4"
    />
    <Text className="text-lg text-gray-600 text-center mb-2">
      Nenhum pet encontrado
    </Text>
    <Text className="text-gray-500 text-center">
      Tente mudar os filtros ou verificar mais tarde.
    </Text>
  </Center>
);

export default EmptyList;

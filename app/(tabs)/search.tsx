import { useState } from "react";
import { View , TextInput , Pressable , Text , Keyboard , ScrollView , Image } from "react-native";
import { hortalicas } from "../../data/hortalicas_5"; // ajuste o caminho conforme necessário

type Ficha = {
  nome: string;
  slug: string;
  nome_cientifico: string;
  plantio: string;
  solo: string;
  luz: string;
  ciclo: string;
  irrigacao: string;
  pragas: string;
  dicas: string;
  imagem?: string;
};

export default function SearchScreen() {
  const [query, setQuery] = useState("");
  const [resultado, setResultado] = useState<Ficha | null>(null);
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  const buscar = async () => {
    const slug = query.trim().toLowerCase();
    if (!slug) return;

    Keyboard.dismiss();
    setErro("");
    setResultado(null);
    setCarregando(true);

    try {
      const item = hortalicas.find((h) => h.slug === slug);
      if (item) {
        setResultado(item);
      } else {
        setErro("Nenhuma hortaliça encontrada.");
      }
    } catch (e) {
      setErro("Erro ao buscar dados.");
    } finally {
      setCarregando(false);
    }
  };

  return (
    <ScrollView className="flex-1 bg-white px-6 pt-20">
      <TextInput
        className="border border-neutral-300 rounded-xl px-4 py-3 mb-4 text-base text-neutral-800"
        placeholder="Digite o nome da hortaliça"
        placeholderTextColor="#9CA3AF"
        value={query}
        onChangeText={setQuery}
        returnKeyType="search"
        onSubmitEditing={buscar}
      />

      <Pressable
        onPress={buscar}
        className="bg-green-600 px-6 py-3 rounded-full shadow active:opacity-80 mb-6"
      >
        <Text className="text-white text-base font-medium text-center">
          Pesquisar
        </Text>
      </Pressable>

      {carregando && (
        <Text className="text-center text-gray-500">Carregando...</Text>
      )}
      {erro !== "" && <Text className="text-center text-red-600">{erro}</Text>}

      {resultado && (
        <View className="bg-white rounded-2xl p-6 mt-4 shadow-md space-y-4">
          {resultado.imagem && (
            <Image
              source={{ uri: resultado.imagem }}
              style={{ width: "100%", height: 180, borderRadius: 12 }}
              resizeMode="cover"
            />
          )}

          <View className="items-center">
            <Text className="text-2xl font-bold text-green-700">
              {resultado.nome}
            </Text>
            <Text className="text-sm italic text-gray-500">
              {resultado.nome_cientifico}
            </Text>
          </View>

          <View className="space-y-1">
            <Text>
              <Text className="font-semibold">🌱 Plantio:</Text>{" "}
              {resultado.plantio}
            </Text>
            <Text>
              <Text className="font-semibold">🌾 Solo:</Text> {resultado.solo}
            </Text>
            <Text>
              <Text className="font-semibold">☀️ Luz:</Text> {resultado.luz}
            </Text>
            <Text>
              <Text className="font-semibold">⏳ Ciclo:</Text> {resultado.ciclo}
            </Text>
            <Text>
              <Text className="font-semibold">💧 Irrigação:</Text>{" "}
              {resultado.irrigacao}
            </Text>
            <Text>
              <Text className="font-semibold">🐛 Pragas:</Text>{" "}
              {resultado.pragas}
            </Text>
            <Text>
              <Text className="font-semibold">💡 Dicas:</Text> {resultado.dicas}
            </Text>
          </View>
        </View>
      )}
    </ScrollView>
  );
}

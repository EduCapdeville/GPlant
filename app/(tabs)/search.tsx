import { useState } from "react";
import {
  View,
  TextInput,
  Pressable,
  Text,
  Keyboard,
  ScrollView,
  Image,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { hortalicas } from "../../data/hortalicas_5";

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
  sinonimos?: string[];
};

export default function SearchScreen() {
  const insets = useSafeAreaInsets();
  const [query, setQuery] = useState("");
  const [resultadoUnico, setResultadoUnico] = useState<Ficha | null>(null);
  const [multiplosResultados, setMultiplosResultados] = useState<Ficha[]>([]);
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  const buscar = () => {
    const termo = query.trim().toLowerCase();
    if (!termo) return;

    Keyboard.dismiss();
    setErro("");
    setResultadoUnico(null);
    setMultiplosResultados([]);
    setCarregando(true);

    try {
      const resultadosDiretos = hortalicas.filter(
        (h) =>
          h.slug === termo ||
          h.nome.toLowerCase() === termo ||
          (h.sinonimos && h.sinonimos.includes(termo))
      );

      if (resultadosDiretos.length === 1) {
        setResultadoUnico(resultadosDiretos[0]);
      } else if (resultadosDiretos.length > 1) {
        setMultiplosResultados(resultadosDiretos);
      } else {
        // Busca genérica: exibe todas as hortaliças que contenham o termo no nome ou slug
        const similares = hortalicas.filter(
          (h) =>
            h.nome.toLowerCase().includes(termo) ||
            h.slug.includes(termo) ||
            (h.sinonimos && h.sinonimos.some((s) => s.includes(termo)))
        );

        if (similares.length > 0) {
          setMultiplosResultados(similares);
        } else {
          setErro("Nenhuma hortaliça encontrada.");
        }
      }
    } catch (e) {
      setErro("Erro ao buscar dados.");
    } finally {
      setCarregando(false);
    }
  };

  const renderFicha = (hortalica: Ficha) => (
    <View
      key={hortalica.slug}
      className="bg-white rounded-2xl p-6 mt-4 shadow-md space-y-4"
    >
      {hortalica.imagem && (
        <Image
          source={{ uri: hortalica.imagem }}
          style={{ width: "100%", height: 180, borderRadius: 12 }}
          resizeMode="cover"
        />
      )}
      <View className="items-center">
        <Text className="text-2xl font-bold text-green-700">{hortalica.nome}</Text>
        <Text className="text-sm italic text-gray-500">{hortalica.nome_cientifico}</Text>
      </View>

      <View className="space-y-1">
        <Text><Text className="font-semibold">🌱 Plantio:</Text> {hortalica.plantio}</Text>
        <Text><Text className="font-semibold">🌾 Solo:</Text> {hortalica.solo}</Text>
        <Text><Text className="font-semibold">☀️ Luz:</Text> {hortalica.luz}</Text>
        <Text><Text className="font-semibold">⏳ Ciclo:</Text> {hortalica.ciclo}</Text>
        <Text><Text className="font-semibold">💧 Irrigação:</Text> {hortalica.irrigacao}</Text>
        <Text><Text className="font-semibold">🐛 Pragas:</Text> {hortalica.pragas}</Text>
        <Text><Text className="font-semibold">💡 Dicas:</Text> {hortalica.dicas}</Text>
      </View>
    </View>
  );

  return (
    <ScrollView
      className="flex-1 bg-white px-6 pt-20"
      contentContainerStyle={{ paddingBottom: insets.bottom + 80 }}
    >
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
        <Text className="text-white text-base font-medium text-center">Pesquisar</Text>
      </Pressable>

      {carregando && (
        <Text className="text-center text-gray-500">Carregando...</Text>
      )}

      {erro !== "" && <Text className="text-center text-red-600">{erro}</Text>}

      {resultadoUnico && renderFicha(resultadoUnico)}

      {multiplosResultados.length > 0 &&
        multiplosResultados.map(renderFicha)}
    </ScrollView>
  );
}

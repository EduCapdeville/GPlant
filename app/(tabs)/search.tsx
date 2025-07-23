import { useState } from 'react';
import { View, TextInput, Pressable, Text, Keyboard, ScrollView } from 'react-native';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';

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
};

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const [resultado, setResultado] = useState<Ficha | null>(null);
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  const buscar = async () => {
    const slug = query.trim().toLowerCase();
    if (!slug) return;

    Keyboard.dismiss();
    setErro('');
    setResultado(null);
    setCarregando(true);

    try {
      const ref = doc(db, 'hortalicas', slug);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        setResultado(snap.data() as Ficha);
      } else {
        setErro('Nenhuma hortaliça encontrada.');
      }
    } catch (e) {
      setErro('Erro ao buscar dados.');
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
        <Text className="text-white text-base font-medium text-center">Pesquisar</Text>
      </Pressable>

      {carregando && <Text className="text-center text-gray-500">Carregando...</Text>}
      {erro !== '' && <Text className="text-center text-red-600">{erro}</Text>}

      {resultado && (
        <View className="bg-neutral-100 rounded-xl p-4 mt-4 space-y-2">
          <Text className="text-xl font-bold text-green-800">{resultado.nome}</Text>
          <Text className="text-sm text-gray-600 italic">{resultado.nome_cientifico}</Text>
          <Text><Text className="font-semibold">Plantio:</Text> {resultado.plantio}</Text>
          <Text><Text className="font-semibold">Solo:</Text> {resultado.solo}</Text>
          <Text><Text className="font-semibold">Luz:</Text> {resultado.luz}</Text>
          <Text><Text className="font-semibold">Ciclo:</Text> {resultado.ciclo}</Text>
          <Text><Text className="font-semibold">Irrigação:</Text> {resultado.irrigacao}</Text>
          <Text><Text className="font-semibold">Pragas:</Text> {resultado.pragas}</Text>
          <Text><Text className="font-semibold">Dicas:</Text> {resultado.dicas}</Text>
        </View>
      )}
    </ScrollView>
  );
}
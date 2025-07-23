import { View, Text, Pressable, Image } from "react-native";
import { icons } from "@constants/icons";
import { Link } from "expo-router";

export default function HomeScreen() {
  return (
    <View className="flex-1 bg-white items-center justify-center px-6">
      <Image source={icons.logo} style={{ width: 180, height: 180, marginBottom: 10 }} />
      <Text className="text-base text-neutral-500 mb-5 text-center">
        Explore fichas de cultivo para hortaliças, legumes e muito mais.
      </Text>

      <Link href="/search" asChild>
        <Pressable className="bg-green-600 px-6 py-3 rounded-full shadow-lg active:opacity-80 cursor-pointer ">
          <Text className="text-white text-base font-medium">Buscar</Text>
        </Pressable>
      </Link>
    </View>
  );
}

import { Colors } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export function GlosarioBoton() {
  const insets = useSafeAreaInsets();

  return (
    <Pressable
      onPress={() => router.push("/glosario")}
      accessibilityRole="button"
      accessibilityLabel="Abrir glosario de términos"
      className="absolute top-4 left-1/2 -translate-x-1/2 flex-row items-center rounded-full px-4 py-3 active:opacity-80"
      style={{
        bottom: insets.bottom + 16,
        backgroundColor: Colors.primary,
        elevation: 6,
      }}
    >
      <Text className="flex-1 font-semibold text-base text-white">
        ¿Palabra complicada? ¡El glosario está aquí!
      </Text>
    </Pressable>
  );
}
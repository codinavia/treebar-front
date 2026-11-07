import { Colors } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export function GlosarioBoton() {
  const insets = useSafeAreaInsets();

  return (
    <View
      className="absolute left-0 right-0 items-center"
      style={{ bottom: insets.bottom + 16 }}
      pointerEvents="box-none"
    >

    <Pressable
      onPress={() => router.push("/glosario")}
      accessibilityRole="button"
      accessibilityLabel="Abrir glosario de términos"
      className="absolute right-4 flex-row items-center rounded-full px-4 py-3 active:opacity-80"
      style={{
        bottom: insets.bottom + 16,
        backgroundColor: Colors.primary,
        elevation: 6,
        shadowOpacity: 0.25,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 3 },
      }}
    >
      <Text className="ml-3 flex-1 font-semibold text-base text-white">
        ¿Palabra complicada? ¡El glosario está aquí!
      </Text>
    </Pressable>

    </View>
  );
}
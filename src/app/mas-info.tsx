import { AppHeader } from "@/components/app-header";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { MenuButton } from "@/components/menu-button";
import { Colors } from "@/constants/colors";

export default function MasInfoScreen() {
  return (
    <SafeAreaView className="flex-1 bg-surface">
      <View className="flex-1 bg-surface">
        <AppHeader title="Más Información" />
        <View className="flex-1 px-6 pt-6">
          {/* Label directo, sin diseño */}
          <Text className="my-10 text-center text-2xl font-bold text-ink">
            Nombre del producto AQUÍ
          </Text>

          <View className="gap-4">
            <MenuButton
              label="Reparación"
              icon={<Ionicons name="hammer" size={50} color="white" />}
              iconPosition="right"
              onPress={() => router.push("/reparacion")}
            />
            <MenuButton
              label="Sustentabilidad PENDIENTE DE AGREGAR"
              icon={<Ionicons name="leaf" size={50} color={Colors.white} />}
              iconPosition="right"
              onPress={() => router.push("/producto")}
            />
            <MenuButton
              label="Certificaciones PENDIENTE DE AGREGAR"
              icon={<Ionicons name="document" size={50} color={Colors.white} />}
              iconPosition="right"
              onPress={() => router.push("/producto")}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

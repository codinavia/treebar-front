import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ActionCard } from "@/components/action-card";
import { Colors } from "@/constants/colors";

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-surface">
      <View className="flex-1 px-6 pt-6">
        <ScrollView contentContainerClassName="px-6 pb-10 pt-6">
          {/* Label en cuadro resaltado */}
          {/*
        <View className="self-center rounded-2xl bg-white px-8 py-4 shadow">
          <Text className="text-xl font-bold text-ink">
            Escanea tus productos
          </Text>
        </View>
        */}

          {/* Label directo, sin diseño */}
          <Text className="my-10 text-center text-l font-bold text-ink">
            ENCUENTRA TODA LA INFORMACIÓN DE TUS PRODUCTOS
          </Text>

          <View className="gap-4">
            <ActionCard
              label="Escanear Código"
              icon={<Ionicons name="camera" size={50} color="white" />}
              onPress={() => router.push("/escanear")}
            />
            <ActionCard
              variant="outline"
              label="Ingresar Código"
              icon={<Ionicons name="keypad" size={50} color={Colors.white} />}
              onPress={() => router.push("/ingresar")}
            />
            <ActionCard
              variant="outline"
              label="Escaneados recientemente"
              icon={<Ionicons name="time-outline" size={50} color={Colors.white} />}
              onPress={() => router.push("/recientes")}
            />
            <ActionCard
              variant="outline"
              label="¿Palabra complicada? ¡El glosario está aqui!"
              icon={<Ionicons name="alert" size={50} color={Colors.white} />}
              onPress={() => router.push("/glosario")}
            />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

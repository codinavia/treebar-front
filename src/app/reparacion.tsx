import { AppHeader } from "@/components/app-header";
import { RepairItem } from "@/components/repair-item";
import { useState } from "react";
import { ScrollView, Text, View } from "react-native";

type Seccion = "specs" | "reviews";

export default function ProductoScreen() {
  const [seccion, setSeccion] = useState<Seccion>("specs");

  return (
    <View className="flex-1 bg-surface">
      <AppHeader title="Reparación" />
      <ScrollView contentContainerClassName="px-6 pb-10 pt-6">
        <Text className="my-10 text-center text-2xl font-bold text-ink">
          Sitios de reparación encontrados
        </Text>

        <View className="gap-4">
          <RepairItem
            name="Tecno Mix"
            type="Electrónica"
            distance="0.8 Km"
            onPress={() => console.log("Abrir ubicación de Tecno Mix")}
          />

          <RepairItem
            name="Tecno Max"
            type="Electrónica"
            distance="0.8 Km"
            onPress={() => console.log("Abrir ubicación de Tecno Max")}
          />
        </View>
      </ScrollView>
    </View>
  );
}

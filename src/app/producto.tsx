import { AppHeader } from "@/components/app-header";
import { MenuButton } from "@/components/menu-button";
import { ReviewCard } from "@/components/review-card";
import { SegmentedTabs } from "@/components/segmented-tabs";
import { Colors } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { ScrollView, Text, View } from "react-native";

type Seccion = "specs" | "reviews";

export default function ProductoScreen() {
  const [seccion, setSeccion] = useState<Seccion>("specs");

  return (
    <View className="flex-1 bg-surface">
      <AppHeader title="Información del producto" />
      <ScrollView contentContainerClassName="px-6 pb-10 pt-6">
        <Text className="my-10 text-center text-2xl font-bold text-ink">
          Nombre del producto AQUÍ
        </Text>

        <View className="gap-4">
          <MenuButton
            label="Dejar reseña"
            icon={
              <Ionicons name="star-outline" size={36} color={Colors.primary} />
            }
            onPress={() => router.push("/deja-resena")}
          />

          <SegmentedTabs
            tabs={[
              { key: "specs", label: "Especificaciones" },
              { key: "reviews", label: "Reseñas" },
            ]}
            active={seccion}
            onChange={setSeccion}
          />

          {seccion === "specs" ? (
            <Text className="text-ink">Aquí van las especificaciones</Text>
          ) : (
            <View className="gap-3">
              <ReviewCard
                rating={4}
                date="15 Mayo 2026"
                comment="Buen producto"
              />
              <ReviewCard
                rating={4}
                date="16 Mayo 2026"
                comment="Buen producto"
              />
              <ReviewCard
                rating={4}
                date="17 Mayo 2026"
                comment="Buen producto"
              />
              <ReviewCard
                rating={4}
                date="18 Mayo 2026"
                comment="Buen producto"
              />
              <ReviewCard
                rating={4}
                date="19 Mayo 2026"
                comment="Buen producto"
              />
            </View>
          )}

          <MenuButton
            label="Consultar más información"
            icon={
              <Ionicons
                name="information-circle-outline"
                size={30}
                color={Colors.primaryDark}
              />
            }
            onPress={() => router.push("/mas-info")}
          />

          <MenuButton
            label="¿Quieres saber algo más del producto?"
            icon={<Ionicons name="eye" size={30} color={Colors.primaryDark} />}
            onPress={() => router.push("/dudas")}
          />
        </View>
      </ScrollView>
    </View>
  );
}

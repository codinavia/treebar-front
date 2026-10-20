import * as reviews from "@/api/reviews";
import { AppHeader } from "@/components/app-header";
import { MenuButton } from "@/components/menu-button";
import { ReviewCard } from "@/components/review-card";
import { SegmentedTabs } from "@/components/segmented-tabs";
import { Colors } from "@/constants/colors";
// import { mensaje } from "@/lib/api";
import { Review } from "@/types/api";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";

type Seccion = "specs" | "reviews";

const Q_TYPES = [
  { key: "uso", label: "Uso" },
  { key: "dese", label: "Desempeño" },
  { key: "dura", label: "Durabilidad" },
  { key: "frec", label: "Frecuencia" },
  { key: "repa", label: "Reparabilidad" },
  { key: "sust", label: "Sustentabilidad" },
];

export default function ProductoScreen() {
  const { codigo } = useLocalSearchParams<{ codigo: string }>();

  const [seccion, setSeccion] = useState<Seccion>("specs");
  const [tipo, setTipo] = useState(Q_TYPES[0].key);
  const [resenas, setResenas] = useState<Review[]>([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (seccion !== "reviews" || !codigo) return;

    let cancelado = false;
    setCargando(true);
    setError(null);

    reviews
      .get(codigo, tipo)
      .then((d) => !cancelado && setResenas(d))
      // .catch((e) => !cancelado && setError(mensajeDeError(e)))
      .finally(() => !cancelado && setCargando(false));

    return () => {
      cancelado = true;
    };
  }, [seccion, tipo, codigo]);

  const hayResenas = resenas.some((r) => r.calificaciones.length > 0);

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
            icon={<Ionicons name="star-outline" size={36} color={Colors.primary} />}
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
              {/* Filtro por tipo */}
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View className="flex-row gap-2">
                  {Q_TYPES.map((t) => {
                    const activo = t.key === tipo;
                    return (
                      <Pressable
                        key={t.key}
                        onPress={() => setTipo(t.key)}
                        className="rounded-full border px-4 py-2"
                        style={{
                          backgroundColor: activo ? Colors.primary : "transparent",
                          borderColor: Colors.primary,
                        }}
                      >
                        <Text style={{ color: activo ? "#fff" : Colors.primary }}>
                          {t.label}
                        </Text>
                      </Pressable>
                    );
                  })}
                </View>
              </ScrollView>

              {/* Contenido */}
              {cargando ? (
                <ActivityIndicator color={Colors.primary} />
              ) : error ? (
                <Text className="text-center text-ink">{error}</Text>
              ) : !hayResenas ? (
                <Text className="text-center text-ink">
                  Aún no hay reseñas de este tipo.
                </Text>
              ) : (
                resenas.map((grupo) =>
                  grupo.calificaciones.length === 0 ? null : (
                    <View key={grupo.pregunta} className="gap-3">
                      <Text className="font-semibold text-ink">
                        {grupo.pregunta}
                      </Text>
                      {grupo.calificaciones.map((c, i) => (
                        <ReviewCard
                          key={`${c.id_criterio}-${i}`}
                          rating={c.calificacion}
                          comment={c.comentario}
                          date=""
                        />
                      ))}
                    </View>
                  ),
                )
              )}
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
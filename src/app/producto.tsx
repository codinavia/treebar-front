import { AppHeader } from "@/components/app-header";
import { MenuButton } from "@/components/menu-button";
import { PantallaEstado } from "@/components/producto/pantalla-estado";
import { ResenasTab } from "@/components/producto/resenas-tab";
import { SpecsTab } from "@/components/producto/specs-tab";
import { SegmentedTabs } from "@/components/segmented-tabs";
import { Colors } from "@/constants/colors";
import { useProductoStore } from "@/store/producto";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";

type Seccion = "specs" | "reviews";

export default function ProductoScreen() {
  const { codigo } = useLocalSearchParams<{ codigo: string }>();
  const {
    estado,
    error,
    producto,
    reparaciones,
    codigo: cargado,
    cargar,
  } = useProductoStore();

  const [seccion, setSeccion] = useState<Seccion>("specs");

  useEffect(() => {
    if (codigo) cargar(codigo);
  }, [codigo]);

  // ---- Pantallas completas ----
  if (!codigo) return <PantallaEstado variante="noEncontrado" codigo="" />;

  // `cargado !== codigo`: el store aún tiene el producto anterior durante un render
  if (cargado !== codigo || estado === "cargando")
    return <PantallaEstado variante="cargando" />;

  if (estado === "error")
    return (
      <PantallaEstado
        variante="error"
        mensaje={error ?? undefined}
        onReintentar={() => cargar(codigo, true)}
      />
    );

  if (estado === "noEncontrado" || !producto)
    return <PantallaEstado variante="noEncontrado" codigo={codigo} />;

  // ---- Pantalla principal ----
  return (
    <View className="flex-1 bg-surface">
      <AppHeader title="Información del producto" />
      <ScrollView contentContainerClassName="px-6 pb-10 pt-6">
        {producto.imagenUrl && (
          <Image
            source={{ uri: producto.imagenUrl }}
            className="h-48 w-full border bg-white"
            style={{ borderColor: Colors.primary }}
            resizeMode="contain"
          />
        )}

        <View className="my-6">
          {producto.marca && (
            <Text className="text-base uppercase text-ink">
              {producto.marca}
            </Text>
          )}
          <Text
            className="text-3xl font-bold"
            style={{ color: Colors.primaryDark }}
          >
            {producto.nombre}
          </Text>
        </View>

        <View className="gap-4">
          <MenuButton
            label="Dejar reseña"
            icon={
              <Ionicons name="star-outline" size={36} color={Colors.primary} />
            }
            onPress={() =>
              router.push({ pathname: "/deja-resena", params: { codigo } })
            }
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
            <SpecsTab producto={producto} reparaciones={reparaciones} />
          ) : (
            <ResenasTab />
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
            onPress={() =>
              router.push({ pathname: "/mas-info", params: { codigo } })
            }
          />

          <MenuButton
            label="¿Quieres saber algo más del producto?"
            icon={<Ionicons name="eye" size={30} color={Colors.primaryDark} />}
            onPress={() =>
              router.push({ pathname: "/dudas", params: { codigo } })
            }
          />
        </View>
      </ScrollView>
    </View>
  );
}
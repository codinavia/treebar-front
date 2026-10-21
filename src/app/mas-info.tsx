import { AppHeader } from "@/components/app-header";
import { MenuButton } from "@/components/menu-button";
import { PantallaEstado } from "@/components/producto/pantalla-estado";
import { Colors } from "@/constants/colors";
import { useProductoStore } from "@/store/producto";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { Text, View } from "react-native";

export default function MasInfoScreen() {
  const { codigo } = useLocalSearchParams<{ codigo: string }>();
  const { estado, error, producto, codigo: cargado, cargar } =
    useProductoStore();

  // Si el store está vacío (por ejemplo, tras recargar en web), se recupera solo.
  // Si ya estaba cargado, `cargar` no repite la petición.
  useEffect(() => {
    if (codigo) cargar(codigo);
  }, [codigo]);

  if (!codigo) return <PantallaEstado variante="noEncontrado" codigo="" />;

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

  return (
    <View className="flex-1 bg-surface">
      <AppHeader title="Más información" />
      <View className="flex-1 px-6 pt-6">
        <View className="my-6 items-center">
          {producto.marca && (
            <Text className="text-base uppercase text-ink">
              {producto.marca}
            </Text>
          )}
          <Text
            className="text-center text-3xl font-bold"
            style={{ color: Colors.primaryDark }}
          >
            {producto.nombre}
          </Text>
        </View>

        <View className="gap-4">
          <MenuButton
            label="Reparación"
            icon={<Ionicons name="hammer-outline" size={36} color={Colors.primaryDark} />}
            iconPosition="right"
            onPress={() =>
              router.push({ pathname: "/reparacion", params: { codigo } })
            }
          />
          <MenuButton
            label="Sustentabilidad"
            icon={<Ionicons name="leaf-outline" size={36} color={Colors.primaryDark} />}
            iconPosition="right"
            onPress={() =>
              router.push({ pathname: "/sustentabilidad", params: { codigo } })
            }
          />
          <MenuButton
            label="Certificaciones"
            icon={<Ionicons name="ribbon-outline" size={36} color={Colors.primaryDark} />}
            iconPosition="right"
            onPress={() =>
              router.push({ pathname: "/certificaciones", params: { codigo } })
            }
          />
        </View>
      </View>
    </View>
  );
}
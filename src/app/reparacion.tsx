import { AppHeader } from "@/components/app-header";
import { MapaUbicacion } from "@/components/mapa-ubicacion";
import { RepairItem } from "@/components/repair-item";
import { Colors } from "@/constants/colors";
import { format_distance } from "@/lib/utils";
import { useProductoStore } from "@/store/producto";
import { useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, Linking, ScrollView, Text, View } from "react-native";

export default function ReparacionScreen() {
  const { codigo } = useLocalSearchParams<{ codigo: string }>();
  const { 
    estado, 
    reparaciones, 
    ubicacion, 
    codigo: cargado, 
    cargar } 
  = useProductoStore();

  // Si el store está vacío, se recupera solo.
  // Si ya estaba cargado, `cargar` no repite la petición.
  useEffect(() => {
    if (codigo) cargar(codigo);
  }, [codigo]);

  const cargando = cargado !== codigo || estado === "cargando";

  // Los más cercanos primero
  const ordenadas = [...reparaciones].sort(
    (a, b) =>
      (a.distanciaMetros ?? Infinity) - (b.distanciaMetros ?? Infinity),
  );

  return (
    <View className="flex-1 bg-surface">
      <AppHeader title="Reparación" />
      <ScrollView contentContainerClassName="px-6 pb-10 pt-6">
        {ubicacion && (
          <View className="mb-6">
            <MapaUbicacion latitud={ubicacion.latitud} longitud={ubicacion.longitud} />
          </View>
        )}

        {cargando ? (
          <ActivityIndicator color={Colors.primary} />
        ) : ordenadas.length === 0 ? (
          <Text className="text-center text-ink">
            No encontramos talleres de reparación cerca de ti.
          </Text>
        ) : (
          <View className="gap-4">
            {ordenadas.map((r, i) => (
              <RepairItem
                key={`${r.nombre}-${i}`}
                name={r.nombre}
                type={r.tipo ?? "Taller de reparación"}
                distance={format_distance(r.distanciaMetros)}
                onPress={() =>
                  r.googleMapsUri && Linking.openURL(r.googleMapsUri)
                }
              />
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}
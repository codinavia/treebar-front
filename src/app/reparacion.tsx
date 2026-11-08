import { AppHeader } from "@/components/app-header";
import { MapaUbicacion } from "@/components/mapa-ubicacion";
import { RepairItem } from "@/components/repair-item";
import { Colors } from "@/constants/colors";
import { format_distance } from "@/lib/utils";
import { useProductoStore } from "@/store/producto";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Linking,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";

export default function ReparacionScreen() {
  const { codigo } = useLocalSearchParams<{ codigo: string }>();
  const {
    estado,
    reparaciones,
    ubicacion,
    estadoUbicacion,
    puedePreguntarUbicacion,
    codigo: cargado,
    cargar,
    actualizarUbicacion,
  } = useProductoStore();

  const [pidiendo, setPidiendo] = useState(false);
  const [intentado, setIntentado] = useState(false);

  useEffect(() => {
    if (codigo) cargar(codigo);
  }, [codigo]);

  const cargando = cargado !== codigo || estado === "cargando";
  const sinUbicacion = !cargando && estadoUbicacion !== "ok";
  const web = Platform.OS === "web";

  const abrirAjustes = !web && !puedePreguntarUbicacion;

  const permitirUbicacion = async () => {
    if (abrirAjustes) {
      Linking.openSettings();
      return;
    }
    setPidiendo(true);
    try {
      await actualizarUbicacion(); // actualiza estadoUbicacion en el store
    } catch {
      // se mantiene el mensaje de bloqueo
    } finally {
      setIntentado(true);
      setPidiendo(false);
    }
  };

  const mensaje = !intentado
    ? "Necesitamos tu ubicación para mostrarte los lugares de reparación."
    : estadoUbicacion === "no_disponible"
      ? "No pudimos obtener tu ubicación. Revisa que el GPS esté activo e inténtalo de nuevo."
      : web
        ? "El navegador bloqueó la ubicación. Actívala desde los ajustes del sitio."
        : "No se otorgó el permiso de ubicación. Actívalo en los ajustes del dispositivo.";

  const ordenadas = [...reparaciones].sort(
    (a, b) => (a.distanciaMetros ?? Infinity) - (b.distanciaMetros ?? Infinity),
  );

  const renderContenido = () => {
    if (cargando) return <ActivityIndicator color={Colors.primary} />;

    if (sinUbicacion)
      return (
        <View className="items-center gap-4 py-6">
          <Ionicons name="location-outline" size={64} color={Colors.primaryDark} />
          <Text className="text-center text-lg text-ink">{mensaje}</Text>

          <Pressable
            onPress={permitirUbicacion}
            disabled={pidiendo}
            className="rounded-full px-6 py-3"
            style={{ backgroundColor: Colors.primary, opacity: pidiendo ? 0.5 : 1 }}
          >
            <Text style={{ color: Colors.white }}>
              {pidiendo
                ? "Buscando..."
                : abrirAjustes
                  ? "Abrir ajustes"
                  : "Dar permiso"}
            </Text>
          </Pressable>
        </View>
      );

    return (
      <>
        {ubicacion && (
          <View className="mb-6">
            <MapaUbicacion latitud={ubicacion.latitud} longitud={ubicacion.longitud} />
          </View>
        )}

        {ordenadas.length === 0 ? (
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
                onPress={() => r.googleMapsUri && Linking.openURL(r.googleMapsUri)}
              />
            ))}
          </View>
        )}
      </>
    );
  };

  return (
    <View className="flex-1 bg-white">
      <AppHeader title="Reparación" />
      <ScrollView contentContainerClassName="px-6 pb-10 pt-6">
        {renderContenido()}
      </ScrollView>
    </View>
  );
}
import { AppHeader } from "@/components/app-header";
import { MapaUbicacion } from "@/components/mapa-ubicacion";
import { RepairItem } from "@/components/repair-item";
import { Colors } from "@/constants/colors";
import { format_distance } from "@/lib/utils";
import { useProductoStore } from "@/store/producto";
import { useLocalSearchParams } from "expo-router";
import { 
  useEffect,
  useState 
} from "react";
import {
  ActivityIndicator,
  Linking,
  ScrollView,
  Text,
  View,
  Platform,
  Pressable
} from "react-native";
import { parse_error } from "@/lib/api";
import { Ionicons } from "@expo/vector-icons";

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
  const [errorUbic, setErrorUbic] = useState<string | null>(null);

  const [aviso, setAviso] = useState<string | null>(null);

  const permitirUbicacion = async () => {
    setPidiendo(true);
    setAviso(null);
    try {
      const resultado = await actualizarUbicacion();
      if (resultado === "denegada")
        setAviso("No pudimos obtener tu ubicación. Actívalo en la configuración del navegador y vuelve a intentarlo.");
      else if (resultado === "no_disponible")
        setAviso("No pudimos obtener tu ubicación. Revisa que el GPS esté activo.");
    } catch (e) {
      setAviso(parse_error(e));
    } finally {
      setPidiendo(false);
    }
  };

  // Si el store está vacío, se recupera solo.
  // Si ya estaba cargado, `cargar` no repite la petición.
  useEffect(() => {
    if (codigo) cargar(codigo);
  }, [codigo]);

  const cargando = cargado !== codigo || estado === "cargando";

  // Los más cercanos primero
  const ordenadas = [...reparaciones].sort(
    (a, b) => (a.distanciaMetros ?? Infinity) - (b.distanciaMetros ?? Infinity),
  );

  return !cargando && estadoUbicacion !== "ok" ? (
      <View className="items-center gap-4 py-6">
        <Ionicons name="location-outline" size={64} color={Colors.primaryDark} />
        <Text className="text-center text-lg text-ink">
          {estadoUbicacion === "denegada"
            ? "Necesitamos acceder a tu ubicación para mostrarte talleres de reparación cercanos."
            : "No pudimos obtener tu ubicación. Revisa que el GPS esté activo e inténtalo de nuevo."}
        </Text>
          
        {estadoUbicacion === "denegada" && !puedePreguntarUbicacion && Platform.OS === "web" && (
          <Text className="text-center text-sm text-ink">
            El navegador bloqueó el permiso. Actívalo desde el ícono del candado
            junto a la dirección y vuelve a intentarlo.
          </Text>
        )}

        {aviso && <Text className="text-center" style={{ color: Colors.red }}>{aviso}</Text>}
        {errorUbic && <Text className="text-center" style={{ color: Colors.red }}>{errorUbic}</Text>}
      
        <Pressable
          onPress={permitirUbicacion}
          disabled={pidiendo}
          className="rounded-full px-6 py-3"
          style={{ backgroundColor: Colors.primary, opacity: pidiendo ? 0.5 : 1 }}
        >
          <Text style={{ color: Colors.white }}>
            {pidiendo ? "Buscando..." : !puedePreguntarUbicacion && Platform.OS !== "web" ? "Abrir ajustes" : "Permitir ubicación"}
          </Text>
        </Pressable>
      </View>
    ) : (
      <View className="flex-1 bg-white">
        <AppHeader title="Reparación" />
        <ScrollView contentContainerClassName="px-6 pb-10 pt-6">
          {ubicacion && (
            <View className="mb-6">
              <MapaUbicacion
                latitud={ubicacion.latitud}
                longitud={ubicacion.longitud}
              />
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

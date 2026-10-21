import { AppHeader } from "@/components/app-header";
import { Colors } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { ActivityIndicator, Pressable, Text, View } from "react-native";

type Props =
  | { variante: "cargando" }
  | { variante: "error"; mensaje?: string; onReintentar: () => void }
  | { variante: "noEncontrado"; codigo: string };

export function PantallaEstado(props: Props) {
  return (
    <View className="flex-1 bg-surface">
      <AppHeader title="Información del producto" />
      <View className="flex-1 items-center justify-center gap-4 px-6">
        {props.variante === "cargando" && (
          <ActivityIndicator size="large" color={Colors.primary} />
        )}

        {props.variante === "error" && (
          <>
            <Ionicons
              name="cloud-offline-outline"
              size={64}
              color={Colors.primaryDark}
            />
            <Text className="text-center text-lg text-ink">
              {props.mensaje ?? "Ocurrió un error inesperado."}
            </Text>
            <Pressable
              onPress={props.onReintentar}
              className="rounded-full px-6 py-3"
              style={{ backgroundColor: Colors.primary }}
            >
              <Text style={{ color: "#fff" }}>Reintentar</Text>
            </Pressable>
          </>
        )}

        {props.variante === "noEncontrado" && (
          <>
            <Ionicons
              name="search-outline"
              size={64}
              color={Colors.primaryDark}
            />
            <Text className="text-center text-xl font-bold text-ink">
              Producto no encontrado
            </Text>
            <Text className="text-center text-ink">
              No encontramos información del código {props.codigo}. Revisa que
              sea correcto o intenta con otro producto.
            </Text>
          </>
        )}
      </View>
    </View>
  );
}
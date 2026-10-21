import { Colors } from "@/constants/colors";
import { ActivityIndicator, Pressable, Text, View } from "react-native";

type Props =
  | { variante: "cargando" }
  | { variante: "error"; mensaje: string; onReintentar: () => void }
  | { variante: "vacio"; mensaje: string };

export function EstadoInline(props: Props) {
  if (props.variante === "cargando")
    return <ActivityIndicator color={Colors.primary} />;

  if (props.variante === "vacio")
    return <Text className="text-center text-ink">{props.mensaje}</Text>;

  return (
    <View className="items-center gap-3">
      <Text className="text-center text-ink">{props.mensaje}</Text>
      <Pressable onPress={props.onReintentar}>
        <Text style={{ color: Colors.primary }}>Reintentar</Text>
      </Pressable>
    </View>
  );
}
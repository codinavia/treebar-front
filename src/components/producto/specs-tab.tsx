import { Colors } from "@/constants/colors";
import type { Product, RepairPlace } from "@/types/api";
import { Text, View } from "react-native";

function FilaSpec({ etiqueta, valor }: { etiqueta: string; valor: string }) {
  return (
    <View
      className="flex-row items-start justify-between gap-4 border-b py-2"
      style={{ borderColor: Colors.primary }}
    >
      <Text className="max-w-[45%] font-bold text-ink">{etiqueta}</Text>
      <Text className="flex-1 text-right" style={{ color: Colors.primary }}>
        {valor}
      </Text>
    </View>
  );
}

type Props = { producto: Product; reparaciones: RepairPlace[] };

export function SpecsTab({ producto, reparaciones }: Props) {
  return (
    <View className="gap-3">
      {producto.inferido && (
        <Text className="text-xs text-ink">
          Información aproximada, puede no ser exacta.
        </Text>
      )}

      {producto.descripcion && (
        <Text className="text-ink">{producto.descripcion}</Text>
      )}

      <View>
        {Object.entries(producto.especificaciones ?? {}).map(([k, v]) => (
          <FilaSpec key={k} etiqueta={k} valor={v} />
        ))}
      </View>
    </View>
  );
}
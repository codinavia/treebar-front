import * as scan from "@/api/scan";
import { AppHeader } from "@/components/app-header";
import { EstadoInline } from "@/components/producto/estado-inline";
import { Colors } from "@/constants/colors";
import { parse_error } from "@/lib/api";
import type { RecentlyScanned } from "@/types/api";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";

export default function RecientesScreen() {
  const [lista, setLista] = useState<RecentlyScanned[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [intento, setIntento] = useState(0);

  useEffect(() => {
    let cancelado = false;
    setError(null);
    setLista(null);

    scan
      .recent()
      .then((d) => !cancelado && setLista(d))
      .catch((e) => !cancelado && setError(parse_error(e)));

    return () => {
      cancelado = true;
    };
  }, [intento]);

  const renderContenido = () => {
    if (error)
      return (
        <EstadoInline
          variante="error"
          mensaje={error}
          onReintentar={() => setIntento((n) => n + 1)}
        />
      );

    if (lista === null) return <EstadoInline variante="cargando" />;

    if (lista.length === 0)
      return (
        <EstadoInline
          variante="vacio"
          mensaje="Aún no hay productos escaneados."
        />
      );

    return lista.map((p) => (
      <Pressable
        key={p.codigo}
        onPress={() =>
          router.push({ pathname: "/producto", params: { codigo: p.codigo } })
        }
        className="flex-row items-center rounded-3xl border border-line bg-card-soft p-5 active:opacity-70"
      >
        <View
          className="h-12 w-12 items-center justify-center rounded-lg"
          style={{ backgroundColor: Colors.primaryDark }}
        >
          <Ionicons name="barcode-outline" size={30} color="white" />
        </View>

        <View className="ml-4 flex-1">
          <Text
            className="text-lg font-bold text-ink"
            numberOfLines={2}
          >
            {p.nombre ?? p.codigo}
          </Text>
          {p.nombre && (
            <Text className="text-sm text-ink">{p.codigo}</Text>
          )}
        </View>

        <Ionicons name="chevron-forward" size={24} color={Colors.primaryDark} />
      </Pressable>
    ));
  };

  return (
    <View className="flex-1 bg-surface">
      <AppHeader title="Escaneados recientemente" />
      <ScrollView contentContainerClassName="gap-4 px-6 pb-10 pt-6">
        {renderContenido()}
      </ScrollView>
    </View>
  );
}
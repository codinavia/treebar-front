import * as certifications from "@/api/certifications";
import { AppHeader } from "@/components/app-header";
import { EstadoInline } from "@/components/producto/estado-inline";
import { Colors } from "@/constants/colors";
import { parse_error } from "@/lib/api";
import { useProductoStore } from "@/store/producto";
import type { Certification } from "@/types/api";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Linking, Pressable, ScrollView, Text, View } from "react-native";

export default function CertificacionesScreen() {
  const { codigo } = useLocalSearchParams<{ codigo: string }>();

  const producto = useProductoStore((s) =>
    s.codigo === codigo ? s.producto : null,
  );
  const marca = producto?.marca;

  const [lista, setLista] = useState<Certification[] | null>(null); // null = aún no cargado
  const [error, setError] = useState<string | null>(null);
  const [intento, setIntento] = useState(0);

  useEffect(() => {
    let cancelado = false;
    setError(null);
    setLista(null);

    certifications
      .get()
      .then((d) => !cancelado && setLista(d))
      .catch((e) => !cancelado && setError(parse_error(e)));

    return () => {
      cancelado = true;
    };
  }, [intento]);

  const abrir = (url: string) => {
    Linking.openURL(url).catch(() => {});
  };

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
          mensaje="Aún no hay certificaciones registradas."
        />
      );

    return lista.map((c) => (
      <View
        key={c.nombre}
        className="rounded-3xl border border-line bg-card-soft p-5"
      >
        {/* Nombre */}
        <View className="flex-row items-center">
          <View
            className="h-12 w-12 items-center justify-center rounded-lg"
            style={{ backgroundColor: Colors.primaryDark }}
          >
            <Ionicons name="ribbon" size={28} color="white" />
          </View>
          <Text className="ml-4 flex-1 text-xl font-bold text-ink">
            {c.nombre}
          </Text>
        </View>

        {/* Descripción */}
        <Text className="mt-3 text-ink">{c.descripcion}</Text>

        <View className="my-3 h-px bg-primary-dark" />

        {/* ¿La marca la tiene? */}
        <View className="flex-row items-start">
          <Ionicons
            name="help-circle-outline"
            size={24}
            color={Colors.primaryDark}
          />
          <Text className="ml-2 flex-1 text-ink">
            {marca
              ? `¿${marca} cuenta con esta certificación? Consúltalo en el sitio oficial.`
              : "¿La empresa cuenta con esta certificación? Consúltalo en el sitio oficial."}
          </Text>
        </View>

        {/* Enlace */}
        <Pressable
          onPress={() => abrir(c.url)}
          className="mt-3 flex-row items-center justify-center rounded-full py-3 active:opacity-70"
          style={{ backgroundColor: Colors.primary }}
        >
          <Ionicons name="open-outline" size={20} color="white" />
          <Text className="ml-2 font-semibold" style={{ color: "#fff" }}>
            Ver sitio oficial
          </Text>
        </Pressable>
      </View>
    ));
  };

  return (
    <View className="flex-1 bg-surface">
      <AppHeader title="Certificaciones" />
      <ScrollView contentContainerClassName="gap-4 px-6 pb-10 pt-6">
        {producto && (
          <View className="items-center">
            {producto.marca && (
              <Text className="text-base uppercase text-ink">
                {producto.marca}
              </Text>
            )}
            <Text
              className="text-center text-2xl font-bold"
              style={{ color: Colors.primaryDark }}
            >
              {producto.nombre}
            </Text>
          </View>
        )}

        <Text className="text-center text-ink">
          Las certificaciones ayudan a saber si un producto o una empresa
          cumple estándares ambientales, de calidad o de seguridad.
        </Text>

        {renderContenido()}
      </ScrollView>
    </View>
  );
}
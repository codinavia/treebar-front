import * as queries from "@/api/queries";
import { AppHeader } from "@/components/app-header";
import { ChatCard } from "@/components/chat-card";
import { MenuButton } from "@/components/menu-button";
import { EstadoInline } from "@/components/producto/estado-inline";
import { PantallaEstado } from "@/components/producto/pantalla-estado";
import { Colors } from "@/constants/colors";
import { parse_error } from "@/lib/api";
import { useProductoStore } from "@/store/producto";
import type { Query } from "@/types/api";
import { Ionicons } from "@expo/vector-icons";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";

export default function DudasScreen() {
  const { codigo } = useLocalSearchParams<{ codigo: string }>();

  // ---- Producto (del store) ----
  const { estado, producto, codigo: cargado, cargar } =
    useProductoStore();

  useEffect(() => {
    if (codigo) cargar(codigo); // no repite la petición si ya está cargado
  }, [codigo]);

  // ---- Lista de preguntas ----
  const [preguntas, setPreguntas] = useState<Query[] | null>(null); // null = aún no cargado
  const [error, setError] = useState<string | null>(null);
  const [intento, setIntento] = useState(0);

  const [abierta, setAbierta] = useState<string | null>(null);

  const primera = useRef(true);

  useFocusEffect(
    useCallback(() => {
      if (primera.current) {
        primera.current = false;
        return;
      }
      setIntento((n) => n + 1);
    }, []),
  );

  useEffect(() => {
    if (!codigo) return;
    let cancelado = false;
    setError(null);
    setPreguntas(null);

    queries
      .get(codigo)
      .then((d) => !cancelado && setPreguntas(d))
      .catch((e) => !cancelado && setError(parse_error(e)));

    return () => {
      cancelado = true;
    };
  }, [codigo, intento]);

  const toggle = (pregunta: string) => {
    setAbierta((actual) => (actual === pregunta ? null : pregunta));
  };

  // ---- Pantallas completas ----
  if (cargado !== codigo || estado === "cargando")
    return <PantallaEstado variante="cargando" />;

  if (estado === "noEncontrado" || !producto)
    return <PantallaEstado variante="noEncontrado" codigo={codigo} />;

  const renderRespuestas = (query: Query) => (
    <ChatCard
      question={query.pregunta}
      time=""
      replies={query.respuestas.map((r) => ({
        text: r.respuesta,
        time: "",
      }))}

      onSend={async (texto) => {
        await queries.answer({ id_duda: query.id, respuesta: texto });
        setIntento((n) => n + 1);
      }}
    />
  );

  const renderContenido = () => {
    if (error)
      return (
        <EstadoInline
          variante="error"
          mensaje={error}
          onReintentar={() => setIntento((n) => n + 1)}
        />
      );

    if (preguntas === null) return <EstadoInline variante="cargando" />;

    if (preguntas.length === 0)
      return <EstadoInline variante="vacio" mensaje="Aún no hay dudas." />;

    return preguntas.map((q) => {
      const p = q.pregunta;

      if (abierta === p)
        return (
          <View key={p} className="gap-2">
            <Pressable onPress={() => toggle(p)}>
              <Text className="text-xs text-ink">Toca para cerrar</Text>
            </Pressable>
            {renderRespuestas(q)}
          </View>
        );

      return (
        <Pressable
          key={p}
          onPress={() => toggle(p)}
          className="rounded-2xl border border-gray-200 bg-white p-4"
        >
          <Text className="font-semibold text-ink">{p}</Text>
        </Pressable>
      );
    });
  };

  return (
    <View className="flex-1 bg-surface">
      <AppHeader title="Dudas" />
      <ScrollView contentContainerClassName="gap-4 px-6 pb-10 pt-6">
        <View className="items-center">
          {producto.marca && (
            <Text className="text-base uppercase text-ink">{producto.marca}</Text>
          )}
          <Text
            className="text-center text-3xl font-bold"
            style={{ color: Colors.primaryDark }}
          >
            {producto.nombre}
          </Text>
        </View>

        {renderContenido()}

        <MenuButton
          label="Hacer una nueva pregunta"
          icon={
            <Ionicons
              name="chatbubble-ellipses-outline"
              size={28}
              color={Colors.primaryDark}
            />
          }
          onPress={() =>
            router.push({ pathname: "/pregunta-nueva", params: { codigo } })
          }
        />
      </ScrollView>
    </View>
  );
}
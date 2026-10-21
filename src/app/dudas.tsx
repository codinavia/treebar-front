import * as queries from "@/api/queries";
import { AppHeader } from "@/components/app-header";
import { ChatCard } from "@/components/chat-card";
import { MenuButton } from "@/components/menu-button";
import { EstadoInline } from "@/components/producto/estado-inline";
import { Colors } from "@/constants/colors";
import { parse_error } from "@/lib/api";
import type { Query } from "@/types/api";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";

export default function DudasScreen() {
  const { codigo } = useLocalSearchParams<{ codigo: string }>();

  // ---- Lista de preguntas ----
  const [preguntas, setPreguntas] = useState<Query[] | null>(null); // null = aún no cargado
  const [error, setError] = useState<string | null>(null);
  const [intento, setIntento] = useState(0);

  const [abierta, setAbierta] = useState<string | null>(null);

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

  const renderRespuestas = (query: Query) => {
    return (
      <ChatCard
        question={query.pregunta}
        time=""
        replies={query.respuestas.map((r) => ({
          text: r.respuesta,
          time: "",
        }))}
        onSend={(texto) => console.log("Respuesta:", texto)}
      />
    );
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
        {renderContenido()}

        <MenuButton
          label="Hacer una nueva pregunta"
          icon={<Ionicons name="chatbubble" size={30} color={Colors.primaryDark} />}
          onPress={() =>
            router.push({ pathname: "/pregunta-nueva", params: { codigo } })
          }
        />
      </ScrollView>
    </View>
  );
}
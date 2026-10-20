import * as queries from "@/api/queries";
import { AppHeader } from "@/components/app-header";
import { ChatCard } from "@/components/chat-card";
import { MenuButton } from "@/components/menu-button";
import { Colors } from "@/constants/colors";
// import { mensaje } from "@/lib/api";
import type { Answer, Query } from "@/types/api";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Pressable, ScrollView, Text, View } from "react-native";

export default function DudasScreen() {
  const { codigo } = useLocalSearchParams<{ codigo: string }>();

  const [error, setError] 
    = useState<string | null>(null);

  /**
   * Estados de la pantalla de preguntas.
   */
  const [preguntas, setPreguntas] 
    = useState<Query[]>([]);

  const [cargando, setCargando] 
    = useState(true);

  const [abierta, setAbierta] 
    = useState<string | null>(null);

  /**
   * Estados de la sección de respuestas a una pregunta específica.
   */
  const [respuestas, setRespuestas] 
    = useState<Record<string, Answer[]>>({});  

  const [cargandoResp, setCargandoResp] 
    = useState<string | null>(null);

  useEffect(() => {
    if (!codigo) return;
    let cancelado = false;
    queries
      .get(codigo)
      .then((d) => !cancelado && setPreguntas(d))
      // .catch((e) => !cancelado && setError(mensajeDeError(e)))
      .finally(() => !cancelado && setCargando(false));
    return () => {
      cancelado = true;
    };
  }, [codigo]);

  /**
   * Cierra o abre la sección de respuestas a una pregunta específica
   * si el usario hace click sobre esta.
   * @param pregunta
   */
  const toggle = async (pregunta: string) => {
    if (abierta === pregunta) 
      return setAbierta(null);

    setAbierta(pregunta);

    if (respuestas[pregunta] || !codigo) 
      return;

    setCargandoResp(pregunta);
    try {
      const d = await queries.getQueryAnswers(codigo, pregunta);
      setRespuestas((prev) => ({
        ...prev,
        [pregunta]: d[0]?.respuestas ?? [],
      }));
    } catch (e) {
      setAbierta(null);
      // setError(mensajeDeError(e));
    } finally {
      setCargandoResp(null);
    }
  };

  return (
    <View className="flex-1 bg-surface">
      <AppHeader title="Dudas" />
      <ScrollView contentContainerClassName="gap-4 px-6 pb-10 pt-6">
        {cargando ? (
          <ActivityIndicator color={Colors.primary} />
        ) : error ? (
          <Text className="text-center text-ink">{error}</Text>
        ) : preguntas.length === 0 ? (
          <Text className="text-center text-ink">Aún no hay dudas.</Text>
        ) : (
          preguntas.map((q) => {
            const p = q.pregunta;
            const open = abierta === p;

            return open ? (
              <View key={p} className="gap-2">
                <Pressable onPress={() => toggle(p)}>
                  <Text className="text-xs text-ink">Toca para cerrar</Text>
                </Pressable>
                {cargandoResp === p ? (
                  <ActivityIndicator color={Colors.primary} />
                ) : (
                  <ChatCard
                    question={p}
                    time=""
                    replies={(respuestas[p] ?? []).map((r) => ({
                      text: r.respuesta,
                      time: "",
                    }))}
                    onSend={(texto) => console.log("Respuesta:", texto)}
                  />
                )}
              </View>
            ) : (
              <Pressable
                key={p}
                onPress={() => toggle(p)}
                className="rounded-2xl border border-gray-200 bg-white p-4"
              >
                <Text className="font-semibold text-ink">{p}</Text>
              </Pressable>
            );
          })
        )}

        <MenuButton
          label="Hacer una nueva pregunta PENDIENTE SIGUIENTE PANTALLA"
          icon={<Ionicons name="chatbubble" size={30} color={Colors.primaryDark} />}
          onPress={() => router.push("/mas-info")}
        />
      </ScrollView>
    </View>
  );
}
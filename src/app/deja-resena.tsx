import * as reviews from "@/api/reviews";
import { AppHeader } from "@/components/app-header";
import { EstadoInline } from "@/components/producto/estado-inline";
import { QuestionCard } from "@/components/question-card";
import { Colors } from "@/constants/colors";
import { parse_error } from "@/lib/api";
import { obtenerHuella } from "@/lib/huella";
import { useProductoStore } from "@/store/producto";
import type { Criterio } from "@/types/api";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";

export default function DejarResenaScreen() {
  const { codigo } = useLocalSearchParams<{ codigo: string }>();

  const [criterios, setCriterios] = useState<Criterio[] | null>(null);
  const [errorCarga, setErrorCarga] = useState<string | null>(null);
  const [intento, setIntento] = useState(0);

  const [respuestas, setRespuestas] = useState<Record<string, string>>({});
  const [enviando, setEnviando] = useState(false);
  const [errorEnvio, setErrorEnvio] = useState<string | null>(null);
  const [enviada, setEnviada] = useState(false);
  const [intentado, setIntentado] = useState(false);

  const comentarioFalta = (id: string) => 
    !(respuestas[id] ?? "").trim();

  const hayErrores = (criterios ?? []).some((c) => 
    comentarioFalta(c.id));

  useEffect(() => {
    let cancelado = false;
    setErrorCarga(null);
    setCriterios(null);
    reviews
      .getQuestions()
      .then((d) => !cancelado && setCriterios(d))
      .catch((e) => !cancelado && setErrorCarga(parse_error(e)));
    return () => {
      cancelado = true;
    };
  }, [intento]);

  const enviar = async () => {
    if (!codigo || !criterios || enviando) return;

    setIntentado(true);
    if (hayErrores) return;

    setEnviando(true);
    setErrorEnvio(null);
    try {
      await reviews.create({
        huella_usuario: await obtenerHuella(),
        codigo_producto: codigo,
        comentarios: criterios.map((c) => ({
          id_criterio: c.id,
          comentario: respuestas[c.id].trim(),
        })),
      });
      useProductoStore.setState({ resenas: {} });
      setEnviada(true);
    } catch (e) {
      setErrorEnvio(parse_error(e));
    } finally {
      setEnviando(false);
    }
  };

  if (enviada)
    return (
      <View className="flex-1 bg-surface">
        <AppHeader title="Tu reseña" />
        <View className="flex-1 items-center justify-center gap-4 px-6">
          <Text className="text-center text-xl font-bold text-ink">
            ¡Gracias por tu reseña!
          </Text>
          <Pressable
            onPress={() => router.back()}
            className="rounded-full px-6 py-3"
            style={{ backgroundColor: Colors.primary }}
          >
            <Text style={{ color: "#fff" }}>Volver al producto</Text>
          </Pressable>
        </View>
      </View>
    );

  return (
    <View className="flex-1 bg-surface">
      <AppHeader title="Tu reseña" />
      <ScrollView 
        contentContainerClassName="gap-4 px-6 pb-80 pt-6"
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
      >
        {errorCarga ? (
          <EstadoInline
            variante="error"
            mensaje={errorCarga}
            onReintentar={() => setIntento((n) => n + 1)}
          />
        ) : criterios === null ? (
          <EstadoInline variante="cargando" />
        ) : (
          criterios.map((c, i) => (
            <QuestionCard
              key={c.id}
              type="full"
              number={i + 1}
              question={c.pregunta}
              comment={respuestas[c.id] ?? ""}
              onChange={(t) => setRespuestas((p) => ({ ...p, [c.id]: t }))}
              commentError={intentado && comentarioFalta(c.id)}
            />
          ))
        )}

        {intentado && hayErrores && (
          <Text className="text-center" style={{ color: Colors.red }}>
            Completa las preguntas marcadas en rojo
          </Text>
        )}

        {errorEnvio && (
          <Text className="text-center" style={{ color: Colors.red }}>
            {errorEnvio}
          </Text>
        )}

        {criterios && (
          <Pressable
            onPress={enviar}
            disabled={enviando}
            className="items-center rounded-full py-4"
            style={{
              backgroundColor: Colors.primary,
              opacity: enviando ? 0.5 : 1,
            }}
          >
            <Text className="text-lg font-semibold" style={{ color: "#fff" }}>
              {enviando ? "Enviando..." : "Enviar"}
            </Text>
          </Pressable>
        )}
      </ScrollView>
    </View>
  );
}
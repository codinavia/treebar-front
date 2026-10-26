import * as queries from "@/api/queries";
import { AppHeader } from "@/components/app-header";
import { Colors } from "@/constants/colors";
import { parse_error } from "@/lib/api";
import { useProductoStore } from "@/store/producto";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    Text,
    TextInput,
    View,
} from "react-native";

const MAX = 100; // la columna `pregunta` de la tabla duda es varchar(100)

export default function PreguntaNuevaScreen() {
  const { codigo } = useLocalSearchParams<{ codigo: string }>();

  const producto = useProductoStore((s) =>
    s.codigo === codigo ? s.producto : null,
  );

  const [pregunta, setPregunta] = useState("");
  const [intentado, setIntentado] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [errorEnvio, setErrorEnvio] = useState<string | null>(null);
  const [enviada, setEnviada] = useState(false);

  const vacia = pregunta.trim().length === 0;

  const enviar = async () => {
    if (!codigo || enviando) return;

    setIntentado(true);
    if (vacia) return;

    setEnviando(true);
    setErrorEnvio(null);
    try {
      await queries.create({
        codigo_producto: codigo,
        pregunta: pregunta.trim(),
      });
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
        <AppHeader title="Nueva pregunta" />
        <View className="flex-1 items-center justify-center gap-4 px-6">
          <Ionicons
            name="checkmark-circle-outline"
            size={72}
            color={Colors.primary}
          />
          <Text className="text-center text-xl font-bold text-ink">
            ¡Tu pregunta fue publicada!
          </Text>
          <Text className="text-center text-ink">
            Otros usuarios podrán responderla.
          </Text>
          <Pressable
            onPress={() => router.back()}
            className="rounded-full px-6 py-3"
            style={{ backgroundColor: Colors.primary }}
          >
            <Text style={{ color: "#fff" }}>Volver a dudas</Text>
          </Pressable>
        </View>
      </View>
    );

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-surface"
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <AppHeader title="Nueva pregunta" />
      <ScrollView
        contentContainerClassName="gap-4 px-6 pb-10 pt-6"
        keyboardShouldPersistTaps="handled"
      >
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

        <View className="rounded-3xl border border-line bg-card-soft p-5">
          <View className="flex-row items-center">
            <Ionicons
              name="chatbubble-ellipses-outline"
              size={28}
              color={Colors.primaryDark}
            />
            <Text className="ml-3 flex-1 text-lg text-ink">
              ¿Qué quieres saber de este producto?
            </Text>
          </View>

          <TextInput
            value={pregunta}
            onChangeText={(t) => {
              setPregunta(t);
              setErrorEnvio(null);
            }}
            placeholder="Escribe tu pregunta..."
            multiline
            maxLength={MAX}
            className="mt-3 h-28 border bg-white p-2 text-ink"
            style={{
              borderColor: intentado && vacia ? Colors.red : Colors.primaryDark,
            }}
            textAlignVertical="top"
          />

          <View className="mt-1 flex-row justify-between">
            <Text className="text-sm" style={{ color: Colors.red }}>
              {intentado && vacia ? "Escribe tu pregunta." : ""}
            </Text>
            <Text className="text-sm text-ink">
              {pregunta.length}/{MAX}
            </Text>
          </View>
        </View>

        {errorEnvio && (
          <Text className="text-center" style={{ color: Colors.red }}>
            {errorEnvio}
          </Text>
        )}

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
            {enviando ? "Enviando..." : "Publicar pregunta"}
          </Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
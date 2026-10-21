import { AppHeader } from "@/components/app-header";
import { Colors } from "@/constants/colors";
import { router } from "expo-router";
import { useState } from "react";
import {
    KeyboardAvoidingView,
    Platform,
    Pressable,
    Text,
    TextInput,
    View,
} from "react-native";

// EAN-8, UPC-A (12), EAN-13 and GTIN-14
const LARGOS_VALIDOS = [8, 12, 13, 14];

export default function IngresarScreen() {
  const [data, setCodigo] = useState("");
  const [error, setError] = useState<string | null>(null);

  const cambiar = (texto: string) => {
    setCodigo(texto.replace(/\D/g, "")); // only digits, even if the user pastes text
    setError(null);
  };

  const buscar = () => {
    if (!LARGOS_VALIDOS.includes(data.length)) {
      setError("El código debe tener 8, 12, 13 o 14 dígitos.");
      return;
    }
    router.push({ pathname: "/producto", params: { codigo: data } });
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-surface"
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <AppHeader title="Ingresar código" />
      <View className="flex-1 justify-center gap-4 px-6 pb-40">
        <Text className="text-center text-lg font-semibold text-ink">
          Escribe el código de barras del producto
        </Text>

        <TextInput
          value={data}
          onChangeText={cambiar}
          onSubmitEditing={buscar}
          placeholder="Ej. 0781138811156"
          keyboardType="number-pad"
          returnKeyType="search"
          maxLength={14}
          autoFocus
          className="rounded-2xl border bg-white px-4 py-4 text-center text-xl text-ink"
          style={{ borderColor: error ? "#DC2626" : Colors.primary }}
        />

        {error && <Text className="text-center text-red-600">{error}</Text>}

        <Pressable
          onPress={buscar}
          disabled={data.length === 0}
          className="items-center rounded-full py-4"
          style={{
            backgroundColor: Colors.primary,
            opacity: data.length === 0 ? 0.5 : 1,
          }}
        >
          <Text className="text-lg font-semibold" style={{ color: "#fff" }}>
            Buscar producto
          </Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}
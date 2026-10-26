import { AppHeader } from "@/components/app-header";
import { Colors } from "@/constants/colors";
import { CameraView, useCameraPermissions } from "expo-camera";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useRef } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function EscanearScreen() {
  const [permiso, pedirPermiso] = useCameraPermissions();
  const bloqueado = useRef(false);

  // Al volver a esta pantalla, permite escanear otra vez.
  useFocusEffect(
    useCallback(() => {
      bloqueado.current = false;
    }, []),
  );

  if (!permiso) return <View className="flex-1 bg-surface" />;

  if (!permiso.granted) {
    return (
      <View className="flex-1 bg-surface">
        <AppHeader title="Escanear código" />
        <View className="flex-1 items-center justify-center gap-4 px-6">
          <Text className="text-center text-ink">
            Necesitamos acceso a la cámara para escanear el código de barras.
          </Text>
          <Pressable
            onPress={pedirPermiso}
            className="rounded-full px-6 py-3"
            style={{ backgroundColor: Colors.primary }}
          >
            <Text style={{ color: Colors.white }}>Dar permiso</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-surface">
      <AppHeader title="Escanear código" />
      <View className="flex-1">
        <CameraView
          style={StyleSheet.absoluteFill}
          facing="back"
          barcodeScannerSettings={{
            barcodeTypes: ["ean13", "ean8", "upc_a", "upc_e"],
          }}
          onBarcodeScanned={({ data }) => {
            if (bloqueado.current) return;
            bloqueado.current = true;
            router.push({ pathname: "/producto", params: { codigo: data } });
          }}
        />
        <View className="absolute bottom-10 w-full items-center">
          <Text className="rounded-full bg-black/60 px-4 py-2 text-white">
            Apunta al código de barras
          </Text>
        </View>
      </View>
    </View>
  );
}
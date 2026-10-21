import { Colors } from "@/constants/colors";
import { Platform, View } from "react-native";
import { WebView } from "react-native-webview";

type Props = { latitud: number; longitud: number; alto?: number };

export function MapaUbicacion({ latitud, longitud, alto = 170 }: Props) {
  const d = 0.006; // zoom: menor número = más cerca
  const uri =
    "https://www.openstreetmap.org/export/embed.html" +
    `?bbox=${longitud - d},${latitud - d},${longitud + d},${latitud + d}` +
    `&layer=mapnik&marker=${latitud},${longitud}`;

  return (
    <View
      className="overflow-hidden border"
      style={{ height: alto, borderColor: Colors.primaryDark }}
    >
      {Platform.OS === "web" ? (
        <iframe
          src={uri}
          style={{ border: 0, width: "100%", height: "100%" }}
          title="Mapa"
        />
      ) : (
        <WebView source={{ uri }} scrollEnabled={false} />
      )}
    </View>
  );
}
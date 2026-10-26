import { Colors } from "@/constants/colors";
import { Modal, Pressable, Text, View } from "react-native";

type Props = {
  visible: boolean;
  titulo: string;
  mensaje: string;
  onCerrar: () => void;
};

export function AvisoModal({ visible, titulo, mensaje, onCerrar }: Props) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onCerrar}>
      <View className="flex-1 items-center justify-center bg-black/50 px-8">
        <View className="w-full gap-4 rounded-3xl bg-white p-6">
          <Text className="text-center text-xl font-bold text-ink">{titulo}</Text>
          <Text className="text-center text-ink">{mensaje}</Text>
          <Pressable
            onPress={onCerrar}
            className="items-center rounded-full py-3"
            style={{ backgroundColor: Colors.primary }}
          >
            <Text style={{ color: "#fff" }}>Entendido</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}
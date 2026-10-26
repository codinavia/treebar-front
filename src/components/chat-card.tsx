import { Colors } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { ActivityIndicator, Pressable, Text, TextInput, View } from "react-native";

const MAX = 250;

type Reply = { text: string; time: string };
type Props = {
  question: string;
  time: string;
  replies?: Reply[];
  onSend?: (text: string) => void | Promise<void>;
};

export function ChatCard({ question, time, replies = [], onSend }: Props) {
  const [text, setText] = useState("");
  const [intentado, setIntentado] = useState(false);
  const [enviando, setEnviando] = useState(false);

  const vacio = text.trim().length === 0;
  const error = intentado && vacio;

  const send = async () => {
    if (enviando) return;

    setIntentado(true);
    if (vacio) return;

    setEnviando(true);
    try {
      await onSend?.(text.trim());
      setText(""); // solo se limpia si el envío no lanzó error
      setIntentado(false);
    } catch {
      // el padre muestra el error; el texto se conserva para reintentar
    } finally {
      setEnviando(false);
    }
  };

  return (
    <View className="rounded-3xl border border-line bg-card-soft p-5">
      <View className="flex-row items-start">
        <Ionicons name="person-circle" size={36} color={Colors.primaryDark} />
        <Text className="ml-3 flex-1 text-lg text-ink">{question}</Text>
      </View>
      <Text className="mt-1 self-end text-muted">{time}</Text>
      <View className="my-2 h-px bg-primary-dark" />

      {replies.map((r, i) => (
        <View key={i} className="mb-3 ml-6 flex-row">
          <Ionicons name="return-down-forward" size={28} color={Colors.line} />
          <View className="ml-2 flex-1">
            <Text className="text-lg text-ink">{r.text}</Text>
            <Text className="text-muted">{r.time}</Text>
          </View>
        </View>
      ))}

      <View
        className="mt-2 flex-row items-center rounded-full border bg-[#F1F8E1] px-4"
        style={{ borderColor: error ? Colors.red : Colors.line }}
      >
        <TextInput
          value={text}
          onChangeText={setText}
          onSubmitEditing={send}
          editable={!enviando}
          maxLength={MAX}
          placeholder="Escribe una respuesta..."
          placeholderTextColor={error ? Colors.red : Colors.muted}
          className="h-11 flex-1 text-ink"
        />
        {enviando ? (
          <ActivityIndicator color={Colors.primaryDark} />
        ) : (
          <Pressable onPress={send} hitSlop={10}>
            <Ionicons name="send" size={26} color={Colors.primaryDark} />
          </Pressable>
        )}
      </View>

      <View className="mt-1 flex-row justify-between px-2">
        <Text className="text-sm" style={{ color: Colors.red }}>
          {error ? "Escribe una respuesta." : ""}
        </Text>
        {text.length > 200 && (
          <Text className="text-sm text-muted">
            {text.length}/{MAX}
          </Text>
        )}
      </View>
    </View>
  );
}
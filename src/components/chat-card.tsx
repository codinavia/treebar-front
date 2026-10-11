import { Colors } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";

type Reply = { text: string; time: string };
type Props = {
  question: string;
  time: string;
  replies?: Reply[];
  onSend?: (text: string) => void;
};

export function ChatCard({ question, time, replies = [], onSend }: Props) {
  const [text, setText] = useState("");

  const send = () => {
    if (!text.trim()) return;
    onSend?.(text.trim());
    setText("");
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

      <View className="mt-2 flex-row items-center rounded-full border border-line bg-[#F1F8E1] px-4">
        <TextInput
          value={text}
          onChangeText={setText}
          placeholder="Escribe una respuesta..."
          placeholderTextColor={Colors.muted}
          className="h-11 flex-1 text-ink"
        />
        <Pressable onPress={send} hitSlop={10}>
          <Ionicons name="send" size={26} color={Colors.primaryDark} />
        </Pressable>
      </View>
    </View>
  );
}

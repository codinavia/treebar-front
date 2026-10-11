import { Colors } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, View } from "react-native";

type Props = {
  value: number;
  size?: number;
  onChange?: (value: number) => void;
};

export function StarRating({ value, size = 28, onChange }: Props) {
  return (
    <View className="flex-row gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <Pressable key={n} disabled={!onChange} onPress={() => onChange?.(n)}>
          <Ionicons
            name="star"
            size={size}
            color={n <= value ? Colors.primary : Colors.line}
          />
        </Pressable>
      ))}
    </View>
  );
}

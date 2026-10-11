import { ReactNode } from "react";
import { Pressable, Text, View } from "react-native";

type Props = {
  label: string;
  icon: ReactNode;
  variant?: "solid" | "outline";
  onPress?: () => void;
};

export function ActionCard({ label, icon, variant = "solid", onPress }: Props) {
  if (variant === "solid") {
    return (
      <Pressable
        onPress={onPress}
        className="items-center rounded-3xl bg-primary py-12 active:opacity-80"
      >
        <View className="mb-6 h-24 w-24 items-center justify-center rounded-full bg-white/30">
          {icon}
        </View>
        <Text className="text-xl font-bold text-white">{label}</Text>
      </Pressable>
    );
  }
  return (
    <Pressable
      onPress={onPress}
      className="flex-row items-center rounded-3xl border-2 border-primary-dark bg-card px-8 py-6 active:opacity-80"
    >
      {icon}
      <Text className="ml-10 text-xl font-bold text-ink">{label}</Text>
    </Pressable>
  );
}

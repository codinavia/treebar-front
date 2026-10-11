import { ReactNode } from "react";
import { Pressable, Text, View } from "react-native";

type Props = {
  label: string;
  icon: ReactNode;
  iconPosition?: "left" | "right";
  onPress?: () => void;
  className?: string;
};

export function MenuButton({
  label,
  icon,
  iconPosition = "right",
  onPress,
  className = "",
}: Props) {
  return (
    <Pressable
      onPress={onPress}
      className={`flex-row items-center rounded-3xl border border-line bg-card px-6 py-5 active:opacity-70 ${className}`}
    >
      {iconPosition === "left" && <View className="mr-4">{icon}</View>}
      <Text className="flex-1 text-xl text-ink">{label}</Text>
      {iconPosition === "right" && icon}
    </Pressable>
  );
}

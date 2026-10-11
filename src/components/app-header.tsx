import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = { title: string; showBack?: boolean };

export function AppHeader({ title, showBack = true }: Props) {
  const insets = useSafeAreaInsets();
  return (
    <View
      className="bg-primary px-4 pb-3"
      style={{ paddingTop: insets.top + 8 }}
    >
      <View className="h-12 flex-row items-center">
        <View className="w-9">
          {showBack && (
            <Pressable onPress={() => router.back()} hitSlop={10}>
              <Ionicons name="arrow-back" size={30} color="white" />
            </Pressable>
          )}
        </View>
        <Text className="flex-1 text-center text-xl font-bold text-white">
          {title}
        </Text>
        <View className="w-9" />
      </View>
    </View>
  );
}

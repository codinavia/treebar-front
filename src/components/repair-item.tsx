import { Colors } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";

type Props = {
  name: string;
  type: string;
  distance: string;
  onPress?: () => void;
};

export function RepairItem({ name, type, distance, onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      className="flex-row items-center rounded-3xl bg-card px-5 py-6 active:opacity-70"
    >
      <View className="h-12 w-12 items-center justify-center rounded-lg bg-primary-dark">
        <Ionicons name="construct" size={30} color="white" />
      </View>
      <View className="ml-5 flex-1">
        <Text className="text-xl font-bold text-black">{name}</Text>
        <Text className="text-lg text-black">{type}</Text>
      </View>
      <View className="items-center">
        <Text className="text-lg font-bold text-black">{distance}</Text>
        <Ionicons
          name="navigate-outline"
          size={36}
          color={Colors.primaryDark}
        />
      </View>
    </Pressable>
  );
}

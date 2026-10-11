import { Pressable, Text, View } from "react-native";

type Tab<T extends string> = { key: T; label: string };
type Props<T extends string> = {
  tabs: Tab<T>[];
  active: T;
  onChange: (key: T) => void;
};

export function SegmentedTabs<T extends string>({ tabs, active, onChange }: Props<T>) {
  return (
    <View className="flex-row border-b-2 border-primary-dark">
      {tabs.map((t) => (
        <Pressable
          key={t.key}
          onPress={() => onChange(t.key)}
          className={`flex-1 border-b-4 px-2 pb-1 ${
            active === t.key ? "border-primary-dark" : "border-transparent"
          }`}
        >
          <Text className={`text-lg text-ink ${t.key === tabs[tabs.length - 1].key ? "text-right" : ""}`}>
            {t.label}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}
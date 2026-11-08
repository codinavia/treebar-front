import { Text, View } from "react-native";

type Props = {
  comment: string;
  date?: string;
};

export function ReviewCard({ comment, date }: Props) {
  return (
    <View className="rounded-3xl border border-line bg-card-soft p-4">
      {!!date && <Text className="mb-1 self-end text-sm text-muted">{date}</Text>}
      <Text className="text-ink">{comment}</Text>
    </View>
  );
}
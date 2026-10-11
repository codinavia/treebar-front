import { Text, View } from "react-native";
import { StarRating } from "./star-rating";

type Props = { rating: number; date: string; comment: string };

export function ReviewCard({ rating, date, comment }: Props) {
  return (
    <View className="rounded-3xl border border-line bg-card-soft px-5 py-3">
      <View className="flex-row items-center justify-between">
        <StarRating value={rating} size={24} />
        <Text className="text-primary">{date}</Text>
      </View>
      <Text className="mt-3 text-lg text-ink">{comment}</Text>
    </View>
  );
}

import { Text, TextInput, View } from "react-native";
import { StarRating } from "./star-rating";

type BaseProps = {
  number: number;
  question: string;
};

type TextProps = BaseProps & {
  type: "text";
  value: string;
  onChange: (value: string) => void;
};

type StarsProps = BaseProps & {
  type: "stars";
  value: number;
  onChange: (value: number) => void;
};

type Props = TextProps | StarsProps;

export function QuestionCard(props: Props) {
  const { number, question } = props;

  return (
    <View className="rounded-3xl border border-line bg-card-soft p-5">
      <View className="flex-row items-center">
        <Text className="mr-3 text-2xl font-bold text-ink">{number}</Text>
        <Text className="flex-1 text-lg text-ink">{question}</Text>
      </View>

      {props.type === "text" ? (
        <TextInput
          value={props.value}
          onChangeText={props.onChange}
          multiline
          className="mt-3 h-28 border border-primary-dark bg-white p-2 text-ink"
          textAlignVertical="top"
        />
      ) : (
        <View className="mt-3 items-center rounded-3xl border border-line bg-card py-3">
          <StarRating value={props.value} size={40} onChange={props.onChange} />
        </View>
      )}
    </View>
  );
}

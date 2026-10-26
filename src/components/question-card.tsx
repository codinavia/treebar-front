import { Colors } from "@/constants/colors";
import { Text, TextInput, View } from "react-native";
import { StarRating } from "./star-rating";

type FullProps = BaseProps & {
  type: "full";
  stars: number;
  comment: string;
  onStarsChange: (value: number) => void;
  onCommentChange: (value: string) => void;
  starsError?: boolean;
  commentError?: boolean;
};

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

type Props = TextProps | StarsProps | FullProps;

export function QuestionCard(props: Props) {
  const { number, question } = props;

  if (props.type === "full") {
    return (
      <View className="rounded-3xl border border-line bg-card-soft p-5">
        <View className="flex-row items-center">
          <Text className="mr-3 text-2xl font-bold text-ink">{number}</Text>
          <Text className="flex-1 text-lg text-ink">{question}</Text>
        </View>

        <View
          className="mt-3 items-center rounded-3xl border bg-card py-3"
          style={props.starsError ? { borderColor: Colors.red } : undefined}
        >
          <StarRating value={props.stars} size={40} onChange={props.onStarsChange} />
        </View>
        {props.starsError && (
          <Text className="mt-1 text-sm" style={{ color: Colors.red }}>
            Elige una calificación.
          </Text>
        )}

        <TextInput
          value={props.comment}
          onChangeText={props.onCommentChange}
          placeholder="Escribe tu comentario"
          multiline
          maxLength={250}
          className="mt-3 h-28 border bg-white p-2 text-ink"
          style={{ borderColor: props.commentError ? Colors.red : Colors.primaryDark }}
          textAlignVertical="top"
        />
        {props.commentError && (
          <Text className="mt-1 text-sm" style={{ color: Colors.red }}>
            Este comentario no puede estar vacío.
          </Text>
        )}
      </View>
    );
  }

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

import { Colors } from "@/constants/colors";
import { Text, TextInput, View } from "react-native";

type FullProps = BaseProps & {
  type: "full";
  comment: string;
  onChange: (value: string) => void;
  commentError?: boolean;
};

type BaseProps = {
  number: number;
  question: string;
};

export function QuestionCard(props: FullProps) {
  const { number, question } = props;

  if (props.type === "full") {
    return (
      <View className="rounded-3xl border border-line bg-card-soft p-5">
        <View className="flex-row items-center">
          <Text className="mr-3 text-2xl font-bold text-ink">{number}</Text>
          <Text className="flex-1 text-lg text-ink">{question}</Text>
        </View>

        <TextInput
          value={props.comment}
          onChangeText={props.onChange}
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

      <TextInput
        value={props.comment}
        onChangeText={props.onChange}
        multiline
        className="mt-3 h-28 border border-primary-dark bg-white p-2 text-ink"
        textAlignVertical="top"
      />
    </View>
  );
}

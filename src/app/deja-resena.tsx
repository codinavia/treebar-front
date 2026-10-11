import { AppHeader } from "@/components/app-header";
import { QuestionCard } from "@/components/question-card";
import { useState } from "react";
import { ScrollView, View } from "react-native";

export default function DejarResenaScreen() {
  const [actividades, setActividades] = useState("");
  const [frecuencia, setFrecuencia] = useState("");
  const [desgaste, setDesgaste] = useState(0);

  return (
    <View className="flex-1 bg-surface">
      <AppHeader title="Tu reseña" />

      <ScrollView contentContainerClassName="gap-4 px-6 pb-10 pt-6">
        <QuestionCard
          number={1}
          question="¿Para qué actividades lo empleas?"
          type="text"
          value={actividades}
          onChange={setActividades}
        />
        <QuestionCard
          number={2}
          question="¿Con qué frecuencia lo usas?"
          type="text"
          value={frecuencia}
          onChange={setFrecuencia}
        />
        <QuestionCard
          number={3}
          question="¿Se ha mantenido sin desgaste?"
          type="stars"
          value={desgaste}
          onChange={setDesgaste}
        />
      </ScrollView>
    </View>
  );
}

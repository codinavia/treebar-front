import { AppHeader } from "@/components/app-header";
import { ChatCard } from "@/components/chat-card";
import { MenuButton } from "@/components/menu-button";
import { Colors } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { ScrollView, View } from "react-native";

type Seccion = "specs" | "reviews";

export default function DudasScreen() {
  const [seccion, setSeccion] = useState<Seccion>("specs");

  return (
    <View className="flex-1 bg-surface">
      <AppHeader title="Dudas" />
      <ScrollView contentContainerClassName="gap-4 px-6 pb-10 pt-6">
        <ChatCard
          question="¿Se puede expandir el disco duro de esta laptop?"
          time="hace 5 días"
          replies={[
            {
              text: "Sí, le puedes poner un disco duro del tamaño que quieras",
              time: "hace 3 días",
            },
          ]}
          onSend={(texto) => console.log("Respuesta:", texto)}
        />

        <ChatCard
          question="¿Se puede jugar buscaminas en esta laptop?"
          time="hace 2 semanas"
          onSend={(texto) => console.log("Respuesta:", texto)}
        />

        <ChatCard
          question="¿Se puede hacer el amor con otro?"
          time="hace 2 semanas"
          onSend={(texto) => console.log("Respuesta:", texto)}
        />

        <MenuButton
          label="Hacer una nueva pregunta PENDIENTE SIGUIENTE PANTALLA"
          icon={
            <Ionicons name="chatbubble" size={30} color={Colors.primaryDark} />
          }
          onPress={() => router.push("/mas-info")}
        />
      </ScrollView>
    </View>
  );
}

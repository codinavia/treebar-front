import { EstadoInline } from "@/components/producto/estado-inline";
import { ReviewCard } from "@/components/review-card";
import { Colors } from "@/constants/colors";
import { parse_error } from "@/lib/api";
import { useProductoStore } from "@/store/producto";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";

const Q_TYPES = [
  { key: "uso", label: "Uso" },
  { key: "dese", label: "Desempeño" },
  { key: "dura", label: "Durabilidad" },
  { key: "frec", label: "Frecuencia" },
  { key: "repa", label: "Reparabilidad" },
  { key: "sust", label: "Sustentabilidad" },
];

export function ResenasTab() {
  const resenasPorTipo = useProductoStore((s) => s.resenas);
  const cargarResenas = useProductoStore((s) => s.cargarResenas);

  const [tipo, setTipo] = useState(Q_TYPES[0].key);
  const [error, setError] = useState<string | null>(null);
  const [intento, setIntento] = useState(0);

  const resenas = resenasPorTipo[tipo];
  const yaCargado = resenas !== undefined;

  useEffect(() => {
    if (yaCargado) return;

    let cancelado = false;
    setError(null);

    cargarResenas(tipo).catch((e) => !cancelado && setError(parse_error(e)));

    return () => {
      cancelado = true;
    };
  }, [tipo, yaCargado, intento]);

  const cambiarTipo = (key: string) => {
    setTipo(key);
    setError(null);
  };

  const renderContenido = () => {
    if (!yaCargado) {
      return error ? (
        <EstadoInline
          variante="error"
          mensaje={error}
          onReintentar={() => setIntento((n) => n + 1)}
        />
      ) : (
        <EstadoInline variante="cargando" />
      );
    }

    const grupos = resenas.filter((g) => g.calificaciones.length > 0);

    if (grupos.length === 0)
      return (
        <EstadoInline
          variante="vacio"
          mensaje="Aún no hay reseñas de este tipo."
        />
      );

    return grupos.map((grupo) => (
      <View key={grupo.pregunta} className="gap-3">
        <Text className="font-semibold text-ink">{grupo.pregunta}</Text>
        {grupo.calificaciones.map((c, i) => (
          <ReviewCard
            key={`${c.id_criterio}-${i}`}
            rating={c.calificacion}
            comment={c.comentario}
            date=""
          />
        ))}
      </View>
    ));
  };

  return (
    <View className="gap-3">
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View className="flex-row gap-2">
          {Q_TYPES.map((t) => {
            const activo = t.key === tipo;
            return (
              <Pressable
                key={t.key}
                onPress={() => cambiarTipo(t.key)}
                className="rounded-full border px-4 py-2"
                style={{
                  backgroundColor: activo ? Colors.primary : "transparent",
                  borderColor: Colors.primary,
                }}
              >
                <Text style={{ color: activo ? "#fff" : Colors.primary }}>
                  {t.label}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>

      {renderContenido()}
    </View>
  );
}
import { AppHeader } from "@/components/app-header";
import { Colors } from "@/constants/colors";
import { useMemo, useState } from "react";
import { ScrollView, Text, TextInput, View } from "react-native";

const GLOSARIO_ITEMS = [
  {
    label: "RAM",
    value:
      "Es la memoria de trabajo del aparato. Es como la mesa de la cocina: entre más grande, más cosas puedes tener a la mano al mismo tiempo sin que se amontone todo.",
  },
  {
    label: "SSD",
    value:
      "Es el cajón donde se guardan tus fotos, tus archivos y tus programas. Es moderno y muy rápido: el aparato prende y abre las cosas en un abrir y cerrar de ojos.",
  },
  {
    label: "Disco duro (HDD)",
    value:
      "También es un cajón para guardar cosas, pero más antiguo y más lento. Es como un archivero grande: cabe mucho, pero tarda más en encontrar lo que buscas.",
  },
  {
    label: "Gigabyte",
    value:
      "Es la medida del tamaño de las cosas guardadas, como los litros para el agua. Entre más GB, más fotos, videos y canciones te caben.",
  },
  {
    label: "La nube",
    value:
      "Es una bodega en internet donde guardas tus fotos y archivos. Aunque pierdas el celular, tus cosas siguen a salvo y las puedes recuperar.",
  },
  {
    label: "Procesador (CPU)",
    value:
      "Es el cerebro del aparato. Piensa, calcula y decide qué hacer. Entre más rápido, más pronto te hace caso.",
  },
  {
    label: "Tarjeta gráfica (GPU)",
    value:
      "Es el artista del aparato. Se encarga de dibujar las imágenes, los videos y los juegos en la pantalla para que se vean bonitos y sin trabarse.",
  },
  {
    label: "Sistema operativo",
    value:
      "Es el director de orquesta del aparato. Hace que todos los programas y piezas trabajen juntos. Ejemplos: Android, iPhone (iOS) y Windows.",
  },
  {
    label: "Volts (V)",
    value:
      "Es la fuerza con la que empuja la electricidad. Piensa en la presión del agua en una manguera: más volts, más empujón.",
  },
  {
    label: "Amperes (A)",
    value:
      "Es la cantidad de electricidad que pasa. Si los volts son la presión de la manguera, los amperes son qué tan gruesa es la manguera.",
  },
  {
    label: "Watts (W)",
    value:
      "Es cuánta energía gasta o da un aparato. Un foco de 60 watts gasta más que uno de 10. En un cargador, más watts significa que carga más rápido.",
  },
  {
    label: "mAh",
    value:
      "Dice qué tan grande es el tanque de la batería. Entre más mAh, más tiempo dura el celular antes de pedirte cargador.",
  },
  {
    label: "Resolución (píxeles)",
    value:
      "Son los puntitos de colores que forman la imagen. Entre más puntitos, más nítida y bonita se ve, como un cuadro bien pintado y con muchos detalles.",
  },
  {
    label: "Megapíxeles (MP)",
    value:
      "Dice qué tantos detalles puede captar la cámara. Más megapíxeles, fotos más claras y que se pueden hacer más grandes sin verse borrosas.",
  },
  {
    label: "Economía circular",
    value:
      "Es aprovechar las cosas una y otra vez en lugar de tirarlas. Es como cuando la abuela guardaba la ropa para arreglarla, heredarla o hacer trapos: nada se desperdicia, todo se vuelve a usar.",
  },
  {
    label: "Obsolescencia programada",
    value:
      "Es cuando una empresa fabrica un aparato para que dure poco, o lo deja de actualizar, para que tengas que comprar otro. Es como un zapato que a propósito se despega al año para que compres unos nuevos.",
  },
  {
    label: "Derecho a reparar (Right to repair)",
    value:
      "Es tu derecho de arreglar tus aparatos donde tú quieras, y no solo con la marca que los vendió. Es como poder llevar tu coche con el mecánico de confianza de tu colonia y que las refacciones se consigan fácil.",
  },
  {
    label: "Greenwashing",
    value:
      "Es cuando una empresa presume que es ecológica, pero en realidad no lo es tanto. Es como poner una etiqueta verde y una hojita en un frasco, nada más para que parezca natural. Conviene fijarse si lo que dicen es cierto.",
  },
  {
    label: "Sustentabilidad",
    value:
      "Es usar lo que necesitamos hoy sin acabarnos lo que ocupan los que vienen después. Es como cuidar el huerto: tomas frutas, pero también siembras para que haya el próximo año.",
  },
  {
    label: "Basura electrónica",
    value:
      "Son los aparatos viejos que ya no sirven: celulares, tele, cargadores. Contienen materiales dañinos, así que no se deben tirar con la basura normal.",
  },
  {
    label: "Huella de carbono",
    value:
      "Es la marca que deja en el planeta todo lo que hacemos, fabricamos o gastamos. Entre más grande la huella, más contaminamos.",
  },
  {
    label: "Eficiencia energética",
    value:
      "Es que un aparato haga el mismo trabajo gastando menos luz. Un foco LED alumbra igual que uno viejo, pero gasta mucho menos.",
  },
];

function InfoRow({ label, value }: { label: string; value?: string | null }) {
  return (
    <View className="gap-1">
      <Text className="text-xs font-semibold uppercase tracking-wide text-gray-500">
        {label}
      </Text>
      <Text className="text-base text-ink">{value || "—"}</Text>
    </View>
  );
}

export default function GlosarioScreen() {
  const [busqueda, setBusqueda] = useState("");

  const itemsFiltrados = useMemo(() => {
    const query = busqueda.trim().toLowerCase();
    if (!query) return GLOSARIO_ITEMS;

    return GLOSARIO_ITEMS.filter(
      (item) =>
        item.label.toLowerCase().includes(query) ||
        item.value.toLowerCase().includes(query)
    );
  }, [busqueda]);

  return (
    <View className="flex-1 bg-surface">
      <AppHeader title="Glosario" />

      <ScrollView contentContainerClassName="px-6 pb-10 pt-6">
        <View className="w-full gap-4 rounded-3xl bg-white p-5 shadow-md">
          <Text
            className="text-center text-3xl font-bold"
            style={{ color: Colors.primaryDark }}
          >
            ¿Muy técnico? ¡Encuentra su definición simple aquí!
          </Text>

          <View className="mt-2 rounded-2xl bg-gray-100 px-4 py-3">
            <TextInput
              value={busqueda}
              onChangeText={setBusqueda}
              placeholder="Buscar término o definición..."
              placeholderTextColor="#9CA3AF"
              className="text-base text-ink"
              clearButtonMode="while-editing"
            />
          </View>

          <View className="h-px bg-gray-200" />

          {itemsFiltrados.length === 0 ? (
            <Text className="py-6 text-center text-gray-500">
              No se encontraron términos que coincidan con "{busqueda}".
            </Text>
          ) : (
            itemsFiltrados.map((item, index) => (
              <View key={item.label} className="gap-4">
                <InfoRow label={item.label} value={item.value} />
                {index < itemsFiltrados.length - 1 && (
                  <View className="h-px bg-gray-100" />
                )}
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
}
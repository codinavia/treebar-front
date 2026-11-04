import { AppHeader } from "@/components/app-header";
import { Colors } from "@/constants/colors";
import { ScrollView, Text, View } from "react-native";

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

export default function glosarioScreen() {
  return (
    <View className="flex-1 bg-surface">
      <AppHeader title="Glosario" />
      <ScrollView contentContainerClassName="px-6 pb-10 pt-6">
        {/* nada */}
        <View className="w-full gap-4 rounded-3xl bg-white p-5 shadow-md">
          <Text
            className="text-center text-3xl font-bold"
            style={{ color: Colors.primaryDark }}
          >
            {/* {} */}
            ¿Muy técnico? ¡Encuentra su definición simple aquí!
          </Text>

          <View className="h-px bg-gray-200" />

          <InfoRow
            label="RAM"
            value="Es la memoria de trabajo del aparato. Es como la mesa de la cocina: entre más grande, más cosas puedes tener a la mano al mismo tiempo sin que se amontone todo."
          />
          <InfoRow
            label="SSD"
            value="Es el cajón donde se guardan tus fotos, tus archivos y tus programas. Es moderno y muy rápido: el aparato prende y abre las cosas en un abrir y cerrar de ojos."
          />
          <InfoRow
            label="Disco duro (HDD)"
            value="También es un cajón para guardar cosas, pero más antiguo y más lento. Es como un archivero grande: cabe mucho, pero tarda más en encontrar lo que buscas."
          />
          <InfoRow
            label="Gigabyte"
            value="Es la medida del tamaño de las cosas guardadas, como los litros para el agua. Entre más GB, más fotos, videos y canciones te caben."
          />
          <InfoRow
            label="La nube"
            value="Es una bodega en internet donde guardas tus fotos y archivos. Aunque pierdas el celular, tus cosas siguen a salvo y las puedes recuperar."
          />
          <InfoRow
            label="Procesador (CPU)"
            value="Es el cerebro del aparato. Piensa, calcula y decide qué hacer. Entre más rápido, más pronto te hace caso."
          />
          <InfoRow
            label="Tarjeta gráfica (GPU)"
            value="Es el artista del aparato. Se encarga de dibujar las imágenes, los videos y los juegos en la pantalla para que se vean bonitos y sin trabarse."
          />
          <InfoRow
            label="Sistema operativo"
            value="Es el director de orquesta del aparato. Hace que todos los programas y piezas trabajen juntos. Ejemplos: Android, iPhone (iOS) y Windows."
          />
          <InfoRow
            label="Volts (V)"
            value="Es la fuerza con la que empuja la electricidad. Piensa en la presión del agua en una manguera: más volts, más empujón."
          />
          <InfoRow
            label="Amperes (A)"
            value="Es la cantidad de electricidad que pasa. Si los volts son la presión de la manguera, los amperes son qué tan gruesa es la manguera."
          />
          <InfoRow
            label="Watts (W)"
            value="Es cuánta energía gasta o da un aparato. Un foco de 60 watts gasta más que uno de 10. En un cargador, más watts significa que carga más rápido."
          />
          <InfoRow
            label="mAh"
            value="Dice qué tan grande es el tanque de la batería. Entre más mAh, más tiempo dura el celular antes de pedirte cargador."
          />
          <InfoRow
            label="Resolución (píxeles)"
            value="Son los puntitos de colores que forman la imagen. Entre más puntitos, más nítida y bonita se ve, como un cuadro bien pintado y con muchos detalles."
          />
          <InfoRow
            label="Megapíxeles (MP)"
            value="Dice qué tantos detalles puede captar la cámara. Más megapíxeles, fotos más claras y que se pueden hacer más grandes sin verse borrosas."
          />
          <InfoRow
            label="Economía circular"
            value="Es aprovechar las cosas una y otra vez en lugar de tirarlas. Es como cuando la abuela guardaba la ropa para arreglarla, heredarla o hacer trapos: nada se desperdicia, todo se vuelve a usar."
          />
          <InfoRow
            label="Obsolescencia programada"
            value="Es cuando una empresa fabrica un aparato para que dure poco, o lo deja de actualizar, para que tengas que comprar otro. Es como un zapato que a propósito se despega al año para que compres unos nuevos."
          />
          <InfoRow
            label="Derecho a reparar (Right to repair)"
            value="Es tu derecho de arreglar tus aparatos donde tú quieras, y no solo con la marca que los vendió. Es como poder llevar tu coche con el mecánico de confianza de tu colonia y que las refacciones se consigan fácil."
          />
          <InfoRow
            label="Greenwashing"
            value="Es cuando una empresa presume que es ecológica, pero en realidad no lo es tanto. Es como poner una etiqueta verde y una hojita en un frasco, nada más para que parezca natural. Conviene fijarse si lo que dicen es cierto."
          />
          <InfoRow
            label="Sustentabilidad"
            value="Es usar lo que necesitamos hoy sin acabarnos lo que ocupan los que vienen después. Es como cuidar el huerto: tomas frutas, pero también siembras para que haya el próximo año."
          />
          <InfoRow
            label="Basura electrónica"
            value="Son los aparatos viejos que ya no sirven: celulares, tele, cargadores. Contienen materiales dañinos, así que no se deben tirar con la basura normal."
          />
          <InfoRow
            label="Huella de carbono"
            value="Es la marca que deja en el planeta todo lo que hacemos, fabricamos o gastamos. Entre más grande la huella, más contaminamos."
          />
          <InfoRow
            label="Eficiencia energética"
            value="Es que un aparato haga el mismo trabajo gastando menos luz. Un foco LED alumbra igual que uno viejo, pero gasta mucho menos."
          />
        </View>
      </ScrollView>
    </View>
  );
}

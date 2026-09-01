import { Image, Text, View } from 'react-native';

/**
 * Avatar circular: mostra a foto (uri) ou a inicial sobre fundo claro.
 * `size` em px controla diâmetro; a fonte da inicial escala junto.
 */
type Props = {
  initial: string;
  uri?: string | null;
  size?: number;
};

export function Avatar({ initial, uri, size = 48 }: Props) {
  return (
    <View
      style={{ width: size, height: size, borderRadius: size / 2 }}
      className="items-center justify-center overflow-hidden bg-input"
    >
      {uri ? (
        <Image
          source={{ uri }}
          style={{ width: '100%', height: '100%' }}
          resizeMode="cover"
        />
      ) : (
        <Text
          style={{ fontSize: size * 0.4 }}
          className="font-bold text-primary"
        >
          {initial}
        </Text>
      )}
    </View>
  );
}

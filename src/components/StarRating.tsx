import { Pressable, View } from 'react-native';

import { StarIcon } from '@/components/icons';
import { color } from '@/theme/tokens';

type Props = {
  /** Nota de 0 a 5 (aceita meios: 4.5). */
  value: number;
  size?: number;
  /** Quando passado, as estrelas viram botões (avaliação). */
  onChange?: (value: number) => void;
};

/**
 * Linha de 5 estrelas. Somente leitura por padrão; interativa quando
 * `onChange` é fornecido. Estrela cheia/vazia; meia-estrela na exibição.
 */
export function StarRating({ value, size = 16, onChange }: Props) {
  return (
    <View className="flex-row gap-1" accessibilityRole="adjustable">
      {[1, 2, 3, 4, 5].map((n) => {
        const filled = value >= n;
        const half = !filled && value >= n - 0.5;
        const star = (
          <StarIcon
            size={size}
            color={filled || half ? color.accent : color.line}
            filled={filled}
          />
        );

        if (!onChange) return <View key={n}>{star}</View>;

        return (
          <Pressable
            key={n}
            onPress={() => onChange(n)}
            accessibilityRole="button"
            accessibilityLabel={`Dar ${n} ${n === 1 ? 'estrela' : 'estrelas'}`}
            hitSlop={6}
          >
            {star}
          </Pressable>
        );
      })}
    </View>
  );
}

import type { ReactNode } from 'react';
import { Pressable, Text, View } from 'react-native';

/**
 * Barra de ação fixa no rodapé das telas. O botão é centralizado e limitado
 * em largura para não encostar nas bordas curvas de telas grandes (iPhone
 * Pro Max, etc.).
 */
type Props = {
  label: string;
  onPress: () => void;
  icon?: ReactNode;
  /** Classe de fundo do botão (ex.: 'bg-primary', 'bg-accent'). */
  bgClassName?: string;
  disabled?: boolean;
  accessibilityLabel?: string;
};

export function BottomCTA({
  label,
  onPress,
  icon,
  bgClassName = 'bg-primary',
  disabled,
  accessibilityLabel,
}: Props) {
  return (
    <View className="border-t border-line bg-surface px-5 pb-2 pt-3">
      <View className="items-center">
        <Pressable
          onPress={onPress}
          disabled={disabled}
          accessibilityRole="button"
          accessibilityLabel={accessibilityLabel ?? label}
          accessibilityState={{ disabled: !!disabled }}
          className={`h-12 w-full max-w-[340px] flex-row items-center justify-center gap-2 rounded-field active:opacity-80 ${bgClassName} ${
            disabled ? 'opacity-50' : ''
          }`}
        >
          {icon}
          <Text className="text-[15px] font-semibold text-white">{label}</Text>
        </Pressable>
      </View>
    </View>
  );
}

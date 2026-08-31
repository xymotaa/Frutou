import type { ReactNode } from 'react';
import { Text, TextInput, View, type TextInputProps } from 'react-native';

import { color } from '@/theme/tokens';

/**
 * Campo de formulário padronizado: rótulo acima + input em card claro.
 * Segue o mesmo estilo visual do resto do app (bg-input, rounded-field, borda).
 */
type Props = TextInputProps & {
  label: string;
  /** Renderiza como área de texto (várias linhas). */
  multiline?: boolean;
  /** Conteúdo à direita dentro do campo (ex.: chevron de select). */
  trailing?: ReactNode;
};

export function FormField({
  label,
  multiline,
  trailing,
  style,
  ...inputProps
}: Props) {
  return (
    <View className="gap-1.5">
      <Text className="text-[13px] font-semibold text-ink">{label}</Text>
      <View
        className={`flex-row rounded-field border border-line bg-input px-3 ${
          multiline ? 'py-3' : 'h-12 items-center'
        }`}
      >
        <TextInput
          className="flex-1 text-[14px] text-ink"
          placeholderTextColor={color.muted}
          selectionColor={color.primary}
          accessibilityLabel={label}
          multiline={multiline}
          style={[multiline ? { minHeight: 88, textAlignVertical: 'top' } : null, style]}
          {...inputProps}
        />
        {trailing ? <View className="ml-2 self-center">{trailing}</View> : null}
      </View>
    </View>
  );
}

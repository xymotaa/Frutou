import { forwardRef, type ReactNode } from 'react';
import { Pressable, Text, TextInput, View, type TextInputProps } from 'react-native';

import { color } from '@/theme/tokens';

type TextFieldProps = TextInputProps & {
  label: string;
  /** Ícone à esquerda do campo. */
  icon?: ReactNode;
  /** Ação opcional à direita (ex.: mostrar/ocultar senha). */
  trailing?: {
    icon: ReactNode;
    onPress: () => void;
    accessibilityLabel: string;
  };
  error?: string;
};

export const TextField = forwardRef<TextInput, TextFieldProps>(function TextField(
  { label, icon, trailing, error, ...inputProps },
  ref,
) {
  return (
    <View className="gap-1.5">
      <Text className="text-[13px] font-medium text-muted">{label}</Text>

      <View
        className={`h-14 flex-row items-center gap-3 rounded-field border bg-input px-4 ${
          error ? 'border-danger' : 'border-line'
        }`}
      >
        {icon ? <View className="shrink-0">{icon}</View> : null}

        <TextInput
          ref={ref}
          className="flex-1 text-[15px] text-ink"
          placeholderTextColor={color.muted}
          selectionColor={color.primary}
          accessibilityLabel={label}
          {...inputProps}
        />

        {trailing ? (
          <Pressable
            onPress={trailing.onPress}
            accessibilityRole="button"
            accessibilityLabel={trailing.accessibilityLabel}
            hitSlop={8}
            className="shrink-0"
          >
            {trailing.icon}
          </Pressable>
        ) : null}
      </View>

      {error ? <Text className="text-[13px] text-danger">{error}</Text> : null}
    </View>
  );
});

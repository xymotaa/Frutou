import { ActivityIndicator, Pressable, Text, type PressableProps } from 'react-native';

import { color } from '@/theme/tokens';

type Variant = 'primary' | 'outline';

type ButtonProps = Omit<PressableProps, 'children'> & {
  label: string;
  variant?: Variant;
  loading?: boolean;
};

const base =
  'h-14 flex-1 items-center justify-center rounded-field px-4 active:opacity-80';

const styles: Record<Variant, { container: string; text: string; spinner: string }> = {
  primary: {
    container: `${base} bg-primary`,
    text: 'text-[15px] font-semibold text-white',
    spinner: '#FFFFFF',
  },
  outline: {
    container: `${base} border border-primary bg-surface`,
    text: 'text-[15px] font-semibold text-primary',
    spinner: color.primary,
  },
};

export function Button({
  label,
  variant = 'primary',
  loading = false,
  disabled,
  ...pressableProps
}: ButtonProps) {
  const s = styles[variant];
  const isDisabled = disabled || loading;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled: !!isDisabled, busy: loading }}
      disabled={isDisabled}
      className={`${s.container} ${isDisabled ? 'opacity-60' : ''}`}
      {...pressableProps}
    >
      {loading ? (
        <ActivityIndicator color={s.spinner} />
      ) : (
        <Text className={s.text}>{label}</Text>
      )}
    </Pressable>
  );
}

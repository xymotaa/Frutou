import type { ReactNode } from 'react';
import { Pressable, Switch, Text, View } from 'react-native';

import { ChevronRightIcon } from '@/components/icons';
import { color } from '@/theme/tokens';

/**
 * Linha de configuração/menu no padrão do app (card claro, ícone à esquerda).
 * - `toggle` definido → mostra um Switch à direita.
 * - `onPress` definido → linha navegável com chevron à direita.
 */
type Props = {
  icon: ReactNode;
  label: string;
  description?: string;
  onPress?: () => void;
  toggle?: { value: boolean; onValueChange: (v: boolean) => void };
  danger?: boolean;
};

export function SettingRow({
  icon,
  label,
  description,
  onPress,
  toggle,
  danger,
}: Props) {
  const body = (
    <View className="flex-row items-center gap-3 rounded-2xl bg-input px-4 py-4">
      {icon}
      <View className="flex-1">
        <Text
          className={`text-[15px] font-semibold ${
            danger ? 'text-danger' : 'text-ink'
          }`}
        >
          {label}
        </Text>
        {description ? (
          <Text className="mt-0.5 text-[12px] leading-4 text-muted">
            {description}
          </Text>
        ) : null}
      </View>

      {toggle ? (
        <Switch
          value={toggle.value}
          onValueChange={toggle.onValueChange}
          trackColor={{ false: color.line, true: color.primaryLight }}
          thumbColor="#FFFFFF"
          ios_backgroundColor={color.line}
        />
      ) : onPress ? (
        <ChevronRightIcon size={18} color={color.muted} />
      ) : null}
    </View>
  );

  if (toggle || !onPress) return body;

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={label}
      className="active:opacity-80"
    >
      {body}
    </Pressable>
  );
}

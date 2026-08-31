import type { ReactNode } from 'react';
import { Pressable, Text, View } from 'react-native';

import { SearchIcon } from '@/components/icons';
import { color } from '@/theme/tokens';

/**
 * Card de busca padronizado entre Início e Explorar.
 * Mesma altura, proporção, cantos, borda, espaçamento interno e tipografia.
 * O botão à direita (`trailing`) muda de ícone por tela, mas mantém o formato.
 */
type Props = {
  placeholder: string;
  onPress?: () => void;
  trailing?: {
    icon: ReactNode;
    onPress: () => void;
    accessibilityLabel: string;
  };
};

export function SearchBar({ placeholder, onPress, trailing }: Props) {
  return (
    <View className="flex-row items-center gap-2">
      <Pressable
        onPress={onPress}
        accessibilityRole="search"
        accessibilityLabel={placeholder}
        className="h-12 flex-1 flex-row items-center gap-2 rounded-field border border-line bg-input px-3 active:opacity-80"
      >
        <SearchIcon size={18} color={color.muted} />
        <Text className="flex-1 text-[14px] text-muted">{placeholder}</Text>
      </Pressable>

      {trailing ? (
        <Pressable
          onPress={trailing.onPress}
          accessibilityRole="button"
          accessibilityLabel={trailing.accessibilityLabel}
          className="h-12 w-12 items-center justify-center rounded-field border border-line bg-input active:opacity-80"
        >
          {trailing.icon}
        </Pressable>
      ) : null}
    </View>
  );
}

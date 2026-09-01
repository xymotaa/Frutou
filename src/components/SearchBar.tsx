import type { ReactNode } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';

import { SearchIcon } from '@/components/icons';
import { color } from '@/theme/tokens';

/**
 * Card de busca padronizado entre Início, Explorar e Conversas.
 * Mesma altura, proporção, cantos, borda, espaçamento interno e tipografia.
 *
 * - Com `value` + `onChangeText` → vira um campo de texto real (com botão
 *   "limpar" quando há conteúdo).
 * - Só com `onPress` → age como botão que leva a uma tela de busca.
 * O botão à direita (`trailing`) muda de ícone por tela, mas mantém o formato.
 */
type Props = {
  placeholder: string;
  value?: string;
  onChangeText?: (text: string) => void;
  onSubmitEditing?: () => void;
  autoFocus?: boolean;
  onPress?: () => void;
  trailing?: {
    icon: ReactNode;
    onPress: () => void;
    accessibilityLabel: string;
  };
};

function ClearButton({ onPress }: { onPress: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel="Limpar busca"
      hitSlop={8}
      className="h-5 w-5 items-center justify-center rounded-full bg-line"
    >
      <Text className="text-[11px] font-bold leading-none text-surface">✕</Text>
    </Pressable>
  );
}

export function SearchBar({
  placeholder,
  value,
  onChangeText,
  onSubmitEditing,
  autoFocus,
  onPress,
  trailing,
}: Props) {
  const isInput = typeof onChangeText === 'function';

  return (
    <View className="flex-row items-center gap-2">
      {isInput ? (
        <View className="h-12 flex-1 flex-row items-center gap-2 rounded-field border border-line bg-input px-3">
          <SearchIcon size={18} color={color.muted} />
          <TextInput
            className="flex-1 text-[14px] text-ink"
            value={value}
            onChangeText={onChangeText}
            onSubmitEditing={onSubmitEditing}
            placeholder={placeholder}
            placeholderTextColor={color.muted}
            selectionColor={color.primary}
            returnKeyType="search"
            autoCapitalize="none"
            autoCorrect={false}
            autoFocus={autoFocus}
            accessibilityLabel={placeholder}
          />
          {value ? <ClearButton onPress={() => onChangeText('')} /> : null}
        </View>
      ) : (
        <Pressable
          onPress={onPress}
          accessibilityRole="search"
          accessibilityLabel={placeholder}
          className="h-12 flex-1 flex-row items-center gap-2 rounded-field border border-line bg-input px-3 active:opacity-80"
        >
          <SearchIcon size={18} color={color.muted} />
          <Text className="flex-1 text-[14px] text-muted">{placeholder}</Text>
        </Pressable>
      )}

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

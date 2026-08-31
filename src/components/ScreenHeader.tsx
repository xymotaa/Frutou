import { Pressable, Text, View } from 'react-native';

/**
 * Cabeçalho padrão das telas principais: wordmark "frutou" à esquerda +
 * avatar à direita, sobre o fundo claro (bg-input) com borda inferior.
 * Usado em Início, Explorar, Anunciar, Mensagens e Perfil para manter a
 * mesma identidade visual e proporções entre as abas.
 */
type Props = {
  /** Inicial exibida no avatar. */
  avatarInitial: string;
  /** Ação ao tocar no avatar (abrir perfil). Opcional. */
  onPressAvatar?: () => void;
  /** Slot opcional à direita, no lugar do avatar (ex.: sino de notificações). */
  right?: React.ReactNode;
};

export function ScreenHeader({ avatarInitial, onPressAvatar, right }: Props) {
  return (
    <View className="flex-row items-center justify-between border-b border-line bg-input px-5 py-3">
      <Text
        className="text-[19px] font-bold text-primary"
        accessibilityRole="header"
      >
        frut<Text className="text-accent">ou</Text>
      </Text>

      {right ?? (
        <Pressable
          onPress={onPressAvatar}
          accessibilityRole="button"
          accessibilityLabel="Abrir seu perfil"
          disabled={!onPressAvatar}
          className="h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-line bg-surface"
        >
          <Text className="text-[15px] font-bold text-primary">
            {avatarInitial}
          </Text>
        </Pressable>
      )}
    </View>
  );
}

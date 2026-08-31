import { Text, View } from 'react-native';

/**
 * Título de tela padronizado entre Início e Explorar.
 * Mesmo tamanho, peso e espaçamento em todas as telas — só o texto muda.
 */
type Props = {
  title: string;
  subtitle?: string;
};

export function ScreenTitle({ title, subtitle }: Props) {
  return (
    <View className="gap-1">
      <Text className="text-[20px] font-bold text-ink" accessibilityRole="header">
        {title}
      </Text>
      {subtitle ? (
        <Text className="text-[14px] leading-5 text-muted">{subtitle}</Text>
      ) : null}
    </View>
  );
}

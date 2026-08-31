import { Pressable, Text, View } from 'react-native';

export type FilterOption<T extends string> = {
  value: T;
  label: string;
};

/**
 * Linha de chips de filtro que quebra em várias linhas (nunca corta rótulos).
 * Segue o padrão visual do app: chip ativo em verde da marca, inativo com
 * borda e fundo claro.
 */
type Props<T extends string> = {
  options: readonly FilterOption<T>[];
  selected: T;
  onSelect: (value: T) => void;
  /** Rótulo acessível do grupo (ex.: "Filtrar por modalidade"). */
  accessibilityLabel: string;
};

export function FilterChips<T extends string>({
  options,
  selected,
  onSelect,
  accessibilityLabel,
}: Props<T>) {
  return (
    <View
      className="flex-row flex-wrap gap-2"
      accessibilityRole="radiogroup"
      accessibilityLabel={accessibilityLabel}
    >
      {options.map((opt) => {
        const active = opt.value === selected;
        return (
          <Pressable
            key={opt.value}
            onPress={() => onSelect(opt.value)}
            accessibilityRole="radio"
            accessibilityState={{ selected: active }}
            accessibilityLabel={opt.label}
            className={`rounded-full border px-4 py-2 active:opacity-80 ${
              active
                ? 'border-primary bg-primary'
                : 'border-line bg-surface'
            }`}
          >
            <Text
              className={`text-[13px] font-semibold ${
                active ? 'text-white' : 'text-muted'
              }`}
            >
              {opt.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

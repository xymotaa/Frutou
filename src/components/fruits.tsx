import Svg, { Circle, Ellipse, Path, Rect } from 'react-native-svg';

/**
 * Ilustrações de frutas em estilo flat, na paleta da marca. Usadas como
 * imagem dos anúncios enquanto não há upload de fotos reais. Cada uma
 * preenche o container (width/height 100%) sobre um fundo de cor própria.
 */

type FruitProps = { width?: number | string; height?: number | string };

export function MangaArt({ width = '100%', height = '100%' }: FruitProps) {
  return (
    <Svg width={width} height={height} viewBox="0 0 200 140" preserveAspectRatio="xMidYMid slice">
      <Rect width={200} height={140} fill="#FBE4B0" />
      {/* corpo alongado da manga, levemente reniforme */}
      <Path
        d="M56 74c0-24 24-42 58-42 26 0 40 14 40 30 0 26-26 48-58 48-26 0-40-14-40-36Z"
        fill="#F0982A"
      />
      <Path
        d="M70 66c2-16 20-28 44-28 16 0 26 8 28 18-14-8-52-6-72 10Z"
        fill="#F7B24A"
      />
      {/* blush avermelhado */}
      <Path d="M120 40c14 0 24 6 28 14-8 2-20 0-28-14Z" fill="#E8752B" opacity={0.55} />
      {/* folha + cabinho */}
      <Path d="M126 36c10-12 26-14 34-8-6 12-22 16-34 8Z" fill="#3E7C3A" />
      <Path d="M124 38c6-5 15-7 20-4" stroke="#2E5E2C" strokeWidth={2} strokeLinecap="round" />
    </Svg>
  );
}

export function LaranjaArt({ width = '100%', height = '100%' }: FruitProps) {
  return (
    <Svg width={width} height={height} viewBox="0 0 200 140" preserveAspectRatio="xMidYMid slice">
      <Rect width={200} height={140} fill="#FFE7C2" />
      <Circle cx={100} cy={76} r={44} fill="#F5871F" />
      <Circle cx={100} cy={76} r={30} fill="#FF9F3C" />
      <Path d="M96 30c8-10 22-12 30-6-5 10-19 14-30 6Z" fill="#3E7C3A" />
      <Path d="M100 34v-8" stroke="#2E5E2C" strokeWidth={3} strokeLinecap="round" />
    </Svg>
  );
}

export function LimaoArt({ width = '100%', height = '100%' }: FruitProps) {
  return (
    <Svg width={width} height={height} viewBox="0 0 200 140" preserveAspectRatio="xMidYMid slice">
      <Rect width={200} height={140} fill="#EEF3C6" />
      <Ellipse cx={100} cy={78} rx={48} ry={38} fill="#B7CF3A" />
      <Ellipse cx={100} cy={78} rx={34} ry={26} fill="#C9DE52" />
      <Path d="M94 34c8-9 21-11 29-5-5 10-18 13-29 5Z" fill="#3E7C3A" />
      <Path d="M100 38v-8" stroke="#2E5E2C" strokeWidth={3} strokeLinecap="round" />
    </Svg>
  );
}

export function AcerolaArt({ width = '100%', height = '100%' }: FruitProps) {
  return (
    <Svg width={width} height={height} viewBox="0 0 200 140" preserveAspectRatio="xMidYMid slice">
      <Rect width={200} height={140} fill="#FBD9D9" />
      <Circle cx={84} cy={82} r={30} fill="#E23B3B" />
      <Circle cx={118} cy={82} r={30} fill="#D23131" />
      <Circle cx={101} cy={70} r={26} fill="#EC4B4B" />
      <Path d="M96 40c8-10 22-12 30-6-5 10-19 14-30 6Z" fill="#3E7C3A" />
      <Path d="M101 44v-8" stroke="#2E5E2C" strokeWidth={3} strokeLinecap="round" />
    </Svg>
  );
}

export const fruitArt = {
  manga: MangaArt,
  laranja: LaranjaArt,
  limao: LimaoArt,
  acerola: AcerolaArt,
} as const;

export type FruitKey = keyof typeof fruitArt;

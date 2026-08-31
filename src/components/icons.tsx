import Svg, { Circle, Path } from 'react-native-svg';

import { color } from '@/theme/tokens';

type IconProps = {
  size?: number;
  color?: string;
  /** Preenche o traço com a cor (para o item de aba ativo). */
  filled?: boolean;
};

/** Ícones de traço, estilo Lucide (stroke 2, cantos arredondados). */

export function UserIcon({ size = 20, color: stroke = color.muted }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 12a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Z"
        stroke={stroke}
        strokeWidth={2}
      />
      <Path
        d="M4 20.5c0-3.6 3.6-6.5 8-6.5s8 2.9 8 6.5"
        stroke={stroke}
        strokeWidth={2}
        strokeLinecap="round"
      />
    </Svg>
  );
}

export function MailIcon({ size = 20, color: stroke = color.muted }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z"
        stroke={stroke}
        strokeWidth={2}
        strokeLinejoin="round"
      />
      <Path
        d="m3.5 6.5 8.5 6 8.5-6"
        stroke={stroke}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function LockIcon({ size = 20, color: stroke = color.muted }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M6 10h12a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-9a1 1 0 0 1 1-1Z"
        stroke={stroke}
        strokeWidth={2}
        strokeLinejoin="round"
      />
      <Path
        d="M8 10V7a4 4 0 0 1 8 0v3"
        stroke={stroke}
        strokeWidth={2}
        strokeLinecap="round"
      />
    </Svg>
  );
}

export function EyeIcon({ size = 20, color: stroke = color.muted }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z"
        stroke={stroke}
        strokeWidth={2}
        strokeLinejoin="round"
      />
      <Path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" stroke={stroke} strokeWidth={2} />
    </Svg>
  );
}

export function EyeOffIcon({ size = 20, color: stroke = color.muted }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M3 3l18 18M10.6 10.6a3 3 0 0 0 4.2 4.2M9.4 5.2A9.6 9.6 0 0 1 12 5c6.5 0 10 7 10 7a17 17 0 0 1-3.2 4M6.3 6.3A17 17 0 0 0 2 12s3.5 7 10 7a9.6 9.6 0 0 0 3.3-.6"
        stroke={stroke}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function SearchIcon({ size = 20, color: stroke = color.muted }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx={11} cy={11} r={7} stroke={stroke} strokeWidth={2} />
      <Path d="m20 20-3.5-3.5" stroke={stroke} strokeWidth={2} strokeLinecap="round" />
    </Svg>
  );
}

export function SlidersIcon({ size = 20, color: stroke = color.muted }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M4 8h10M18 8h2M4 16h4M12 16h8"
        stroke={stroke}
        strokeWidth={2}
        strokeLinecap="round"
      />
      <Circle cx={15} cy={8} r={2.5} stroke={stroke} strokeWidth={2} />
      <Circle cx={9} cy={16} r={2.5} stroke={stroke} strokeWidth={2} />
    </Svg>
  );
}

export function PlusIcon({ size = 20, color: stroke = '#FFFFFF' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 5v14M5 12h14"
        stroke={stroke}
        strokeWidth={2.5}
        strokeLinecap="round"
      />
    </Svg>
  );
}

export function MapPinIcon({ size = 16, color: stroke = color.muted }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 21c4-4.5 7-8 7-11a7 7 0 1 0-14 0c0 3 3 6.5 7 11Z"
        stroke={stroke}
        strokeWidth={2}
        strokeLinejoin="round"
      />
      <Circle cx={12} cy={10} r={2.5} stroke={stroke} strokeWidth={2} />
    </Svg>
  );
}

export function HandHeartIcon({
  size = 16,
  color: stroke = color.primary,
}: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M3 13.5 8 18l7-1.5 4.5-4a1.6 1.6 0 0 0-2.2-2.3L13 13"
        stroke={stroke}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M8 18v3H3v-8h3M13.2 9.6c1-1 1-2.4.1-3.3-.9-.8-2.1-.7-3 .1l-.6.6-.6-.6c-.9-.8-2.1-.9-3-.1-.9.9-.9 2.3.1 3.3L9.7 13Z"
        stroke={stroke}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

/* ---- ícones de navegação (bottom tabs) ---- */

export function HomeIcon({
  size = 24,
  color: stroke = color.muted,
  filled,
}: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M4 10.5 12 4l8 6.5V19a1 1 0 0 1-1 1h-4v-6H9v6H5a1 1 0 0 1-1-1v-8.5Z"
        stroke={stroke}
        strokeWidth={2}
        strokeLinejoin="round"
        fill={filled ? stroke : 'none'}
      />
    </Svg>
  );
}

export function CompassIcon({
  size = 24,
  color: stroke = color.muted,
  filled,
}: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle
        cx={12}
        cy={12}
        r={9}
        stroke={stroke}
        strokeWidth={2}
        fill={filled ? stroke : 'none'}
      />
      <Path
        d="m15.5 8.5-2 5-5 2 2-5 5-2Z"
        stroke={filled ? '#FFFFFF' : stroke}
        strokeWidth={2}
        strokeLinejoin="round"
        fill={filled ? '#FFFFFF' : 'none'}
      />
    </Svg>
  );
}

export function MessageIcon({
  size = 24,
  color: stroke = color.muted,
  filled,
}: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M4 5h16a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H9l-5 4V6a1 1 0 0 1 1-1Z"
        stroke={stroke}
        strokeWidth={2}
        strokeLinejoin="round"
        fill={filled ? stroke : 'none'}
      />
    </Svg>
  );
}

export function UserTabIcon({
  size = 24,
  color: stroke = color.muted,
  filled,
}: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle
        cx={12}
        cy={9}
        r={4}
        stroke={stroke}
        strokeWidth={2}
        fill={filled ? stroke : 'none'}
      />
      <Path
        d="M4 21c0-4 3.6-7 8-7s8 3 8 7"
        stroke={stroke}
        strokeWidth={2}
        strokeLinecap="round"
      />
    </Svg>
  );
}

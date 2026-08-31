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

export function HeartIcon({
  size = 20,
  color: stroke = color.ink,
  filled,
}: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 20s-7-4.35-9.5-8.5C1 8.5 2.5 5 6 5c2 0 3.5 1.5 4 2.5C10.5 6.5 12 5 14 5c3.5 0 5 3.5 3.5 6.5C19 15.65 12 20 12 20Z"
        stroke={stroke}
        strokeWidth={2}
        strokeLinejoin="round"
        fill={filled ? stroke : 'none'}
      />
    </Svg>
  );
}

export function MicIcon({ size = 20, color: stroke = color.muted }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 4a3 3 0 0 0-3 3v5a3 3 0 0 0 6 0V7a3 3 0 0 0-3-3Z"
        stroke={stroke}
        strokeWidth={2}
        strokeLinejoin="round"
      />
      <Path
        d="M6 11a6 6 0 0 0 12 0M12 17v3"
        stroke={stroke}
        strokeWidth={2}
        strokeLinecap="round"
      />
    </Svg>
  );
}

export function BagIcon({ size = 14, color: stroke = '#FFFFFF' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M6 8h12l-1 12H7L6 8Z"
        stroke={stroke}
        strokeWidth={2}
        strokeLinejoin="round"
      />
      <Path
        d="M9 8V6a3 3 0 0 1 6 0v2"
        stroke={stroke}
        strokeWidth={2}
        strokeLinecap="round"
      />
    </Svg>
  );
}

export function TagIcon({ size = 14, color: stroke = '#FFFFFF' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M4 12.5 11.5 5H19a1 1 0 0 1 1 1v7.5L12.5 21a1 1 0 0 1-1.4 0L4 13.9a1 1 0 0 1 0-1.4Z"
        stroke={stroke}
        strokeWidth={2}
        strokeLinejoin="round"
      />
      <Circle cx={15.5} cy={9.5} r={1.5} fill={stroke} />
    </Svg>
  );
}

export function ListIcon({ size = 18, color: stroke = color.muted }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M8 6h12M8 12h12M8 18h12M4 6h.01M4 12h.01M4 18h.01"
        stroke={stroke}
        strokeWidth={2}
        strokeLinecap="round"
      />
    </Svg>
  );
}

export function MapIcon({ size = 18, color: stroke = color.muted }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="m9 4 6 2 5-2v14l-5 2-6-2-5 2V6l5-2Zm0 0v14m6-12v14"
        stroke={stroke}
        strokeWidth={2}
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function ChevronLeftIcon({
  size = 24,
  color: stroke = color.ink,
}: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="m15 5-7 7 7 7"
        stroke={stroke}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function BookmarkIcon({
  size = 20,
  color: stroke = color.muted,
  filled,
}: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M7 4h10a1 1 0 0 1 1 1v15l-6-3.5L6 20V5a1 1 0 0 1 1-1Z"
        stroke={stroke}
        strokeWidth={2}
        strokeLinejoin="round"
        fill={filled ? stroke : 'none'}
      />
    </Svg>
  );
}

export function HourglassIcon({
  size = 18,
  color: stroke = color.accent,
}: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M7 4h10M7 20h10M8 4c0 5 8 5 8 8s-8 3-8 8M16 4c0 5-8 5-8 8s8 3 8 8"
        stroke={stroke}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function ClockIcon({
  size = 18,
  color: stroke = color.accent,
}: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx={12} cy={12} r={9} stroke={stroke} strokeWidth={2} />
      <Path
        d="M12 7v5l3.5 2"
        stroke={stroke}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function StarIcon({
  size = 14,
  color: stroke = color.accent,
  filled = true,
}: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="m12 3 2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9 6.8 19.6l1-5.8L3.5 9.7l5.9-.9L12 3Z"
        stroke={stroke}
        strokeWidth={2}
        strokeLinejoin="round"
        fill={filled ? stroke : 'none'}
      />
    </Svg>
  );
}

export function WalkIcon({
  size = 18,
  color: stroke = color.accent,
}: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx={13} cy={4.5} r={1.8} fill={stroke} />
      <Path
        d="m10 21 2-6-2.5-2 1-5 3 1.5 2 3M9.5 8 6 10m6 5-3 6"
        stroke={stroke}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function CameraPlusIcon({
  size = 24,
  color: stroke = color.muted,
}: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M4 8h3l1.5-2h5L15 8h5a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Z"
        stroke={stroke}
        strokeWidth={2}
        strokeLinejoin="round"
      />
      <Path
        d="M12 16.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM19 3v4M17 5h4"
        stroke={stroke}
        strokeWidth={2}
        strokeLinecap="round"
      />
    </Svg>
  );
}

export function ImageIcon({ size = 24, color: stroke = color.line }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z"
        stroke={stroke}
        strokeWidth={2}
        strokeLinejoin="round"
      />
      <Path
        d="m4 16 5-4 4 3 3-2 4 3"
        stroke={stroke}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Circle cx={9} cy={9} r={1.5} fill={stroke} />
    </Svg>
  );
}

export function ChevronDownIcon({
  size = 20,
  color: stroke = color.muted,
}: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="m6 9 6 6 6-6"
        stroke={stroke}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function ChevronRightIcon({
  size = 20,
  color: stroke = color.muted,
}: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="m9 5 7 7-7 7"
        stroke={stroke}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function GiftIcon({
  size = 18,
  color: stroke = '#FFFFFF',
}: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M4 11h16v9a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-9ZM3 7h18v4H3V7ZM12 7v14"
        stroke={stroke}
        strokeWidth={2}
        strokeLinejoin="round"
      />
      <Path
        d="M12 7S9.5 3 7.5 3 5 6 7 7h5Zm0 0s2.5-4 4.5-4S19 6 17 7h-5Z"
        stroke={stroke}
        strokeWidth={2}
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function ArchiveIcon({
  size = 20,
  color: stroke = color.muted,
}: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M4 7h16v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7ZM3 4h18v3H3V4ZM9 12h6"
        stroke={stroke}
        strokeWidth={2}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </Svg>
  );
}

export function HistoryIcon({
  size = 20,
  color: stroke = color.muted,
}: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M4 12a8 8 0 1 0 3-6.2M4 4v3.5h3.5M12 8v4l3 2"
        stroke={stroke}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function SettingsIcon({
  size = 20,
  color: stroke = color.muted,
}: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx={12} cy={12} r={3.2} stroke={stroke} strokeWidth={2} />
      <Path
        d="M19.4 13a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-1.8-.3 1.6 1.6 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.6 1.6 0 0 0-1-1.5 1.6 1.6 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.6 1.6 0 0 0 .3-1.8 1.6 1.6 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.6 1.6 0 0 0 1.5-1 1.6 1.6 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.6 1.6 0 0 0 1.8.3H9a1.6 1.6 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.6 1.6 0 0 0 1 1.5 1.6 1.6 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0-.3 1.8V9a1.6 1.6 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.6 1.6 0 0 0-1.5 1Z"
        stroke={stroke}
        strokeWidth={2}
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function LogOutIcon({
  size = 20,
  color: stroke = color.danger,
}: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M14 4H6a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h8M16 8l4 4-4 4M20 12H9"
        stroke={stroke}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function BanIcon({ size = 18, color: stroke = color.muted }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx={12} cy={12} r={9} stroke={stroke} strokeWidth={2} />
      <Path d="m6 6 12 12" stroke={stroke} strokeWidth={2} strokeLinecap="round" />
    </Svg>
  );
}

export function PencilIcon({ size = 18, color: stroke = color.ink }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M4 20h4L19 9a2 2 0 0 0-3-3L5 17v3ZM14 6l4 4"
        stroke={stroke}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function BellIcon({ size = 20, color: stroke = color.accent }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M6 10a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6ZM10 20a2 2 0 0 0 4 0"
        stroke={stroke}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function CheckCircleIcon({
  size = 20,
  color: stroke = '#FFFFFF',
}: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx={12} cy={12} r={9} stroke={stroke} strokeWidth={2} />
      <Path
        d="m8 12 3 3 5-6"
        stroke={stroke}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

import Svg, { Path } from 'react-native-svg';

import { color } from '@/theme/tokens';

type IconProps = {
  size?: number;
  color?: string;
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

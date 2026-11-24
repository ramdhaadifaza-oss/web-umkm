import type { FoodThemeId } from '../data/sukoharjoUmkm';

interface FoodThemeIconProps {
  themeId: Exclude<FoodThemeId, 'all'>;
  className?: string;
}

export function FoodThemeIcon({ themeId, className = 'w-11 h-11' }: FoodThemeIconProps) {
  switch (themeId) {
    case 'liwet':
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
          <path
            d="M10 38C10 47.941 19.85 56 32 56C44.15 56 54 47.941 54 38H10Z"
            fill="#38BDF8"
            fillOpacity="0.18"
            stroke="#38BDF8"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          <path
            d="M15 38C15 29.716 22.611 23 32 23C41.389 23 49 29.716 49 38"
            stroke="#E2E8F0"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M23 16C23 13.5 25 11.5 25 9M32 15C32 12.5 34 10.5 34 8M41 16C41 13.5 43 11.5 43 9"
            stroke="#38BDF8"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
          <circle cx="28" cy="31" r="2.2" fill="#FBBF24" />
          <circle cx="36" cy="33" r="2.2" fill="#34D399" />
        </svg>
      );
    case 'jamu':
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
          <rect
            x="24"
            y="10"
            width="16"
            height="7"
            rx="2"
            fill="#FBBF24"
            fillOpacity="0.3"
            stroke="#FBBF24"
            strokeWidth="2.4"
          />
          <path
            d="M26 17V22L19 29C17.8 30.2 17 31.9 17 33.6V49C17 51.761 19.239 54 22 54H42C44.761 54 47 51.761 47 49V33.6C47 31.9 46.2 30.2 45 29L38 22V17"
            fill="#FBBF24"
            fillOpacity="0.14"
            stroke="#E2E8F0"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          <path d="M18 39H46" stroke="#FBBF24" strokeWidth="2.4" strokeLinecap="round" />
          <path
            d="M32 31C32 31 27 35 27 38.5C27 41.261 29.239 43.5 32 43.5C34.761 43.5 37 41.261 37 38.5C37 35 32 31 32 31Z"
            fill="#FBBF24"
          />
        </svg>
      );
    case 'bakmi':
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
          <path
            d="M11 35H53C53 45.493 43.598 54 32 54C20.402 54 11 45.493 11 35Z"
            fill="#FB923C"
            fillOpacity="0.18"
            stroke="#FB923C"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          <path
            d="M18 35C18 29 22 26 27 28C31 29.5 34 26 39 27C43 27.8 46 30.5 46 35"
            stroke="#E2E8F0"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
          <path
            d="M22 14L48 21M20 20L46 25"
            stroke="#FB923C"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M24 23V34M31 21V34M38 23V34"
            stroke="#FDE68A"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
        </svg>
      );
    case 'sate':
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
          <path
            d="M14 50L50 14"
            stroke="#94A3B8"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
          <rect
            x="21"
            y="29"
            width="12"
            height="12"
            rx="4"
            transform="rotate(-45 21 29)"
            fill="#F87171"
            fillOpacity="0.28"
            stroke="#F87171"
            strokeWidth="2.4"
          />
          <rect
            x="31"
            y="19"
            width="12"
            height="12"
            rx="4"
            transform="rotate(-45 31 19)"
            fill="#F87171"
            fillOpacity="0.28"
            stroke="#E2E8F0"
            strokeWidth="2.4"
          />
          <path
            d="M16 54H48"
            stroke="#FB923C"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M24 48C24 45.5 26 44 26 42M34 48C34 45.5 36 44 36 42M43 48C43 45.5 45 44 45 42"
            stroke="#F87171"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
        </svg>
      );
    case 'jenang':
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
          <path
            d="M12 41L32 51L52 41L32 31L12 41Z"
            fill="#F472B6"
            fillOpacity="0.2"
            stroke="#F472B6"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          <path
            d="M16 28L32 36L48 28L32 20L16 28Z"
            fill="#E2E8F0"
            fillOpacity="0.12"
            stroke="#E2E8F0"
            strokeWidth="2.4"
            strokeLinejoin="round"
          />
          <path
            d="M16 28V35L32 43L48 35V28"
            stroke="#E2E8F0"
            strokeWidth="2.4"
            strokeLinejoin="round"
          />
          <circle cx="32" cy="14" r="3" fill="#FBBF24" />
        </svg>
      );
    case 'camilan':
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
          <circle
            cx="32"
            cy="33"
            r="19"
            fill="#A78BFA"
            fillOpacity="0.16"
            stroke="#A78BFA"
            strokeWidth="2.5"
          />
          <circle
            cx="32"
            cy="33"
            r="12"
            stroke="#E2E8F0"
            strokeWidth="2"
            strokeDasharray="4 4"
          />
          <circle cx="27" cy="29" r="2.2" fill="#FBBF24" />
          <circle cx="37" cy="31" r="2.2" fill="#FBBF24" />
          <circle cx="31" cy="39" r="2.2" fill="#FBBF24" />
        </svg>
      );
    case 'sambal':
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
          <path
            d="M12 37C12 46.941 20.954 55 32 55C43.046 55 52 46.941 52 37H12Z"
            fill="#34D399"
            fillOpacity="0.16"
            stroke="#34D399"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          <path
            d="M36 16C42 16 46 21 44 28C42.5 33 38 35 33 35"
            stroke="#F87171"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M28 17L21 34"
            stroke="#E2E8F0"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <circle cx="36" cy="15" r="2.5" fill="#34D399" />
        </svg>
      );
    case 'minuman':
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
          <path
            d="M20 20H44L41 51C40.8 52.8 39.3 54 37.5 54H26.5C24.7 54 23.2 52.8 23 51L20 20Z"
            fill="#60A5FA"
            fillOpacity="0.18"
            stroke="#60A5FA"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          <path d="M35 10L31 30" stroke="#E2E8F0" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M21 31H43" stroke="#60A5FA" strokeWidth="2.2" strokeLinecap="round" />
          <circle cx="29" cy="41" r="2.5" fill="#E2E8F0" />
          <circle cx="36" cy="45" r="2" fill="#FBBF24" />
        </svg>
      );
  }
}

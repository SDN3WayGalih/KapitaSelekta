import React from 'react'

export type IconProps = React.SVGProps<SVGSVGElement> & {
  size?: number | string
}

const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

export function SchoolIcon({ size = 24, className = '', ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base} className={className} aria-hidden="true" {...props}>
      <path d="M3 21h18" />
      <path d="M5 21V9l7-4 7 4v12" />
      <path d="M9 21v-4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v4" />
      <path d="M9 10h.01" />
      <path d="M15 10h.01" />
    </svg>
  )
}

export function AwardIcon({ size = 24, className = '', ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base} className={className} aria-hidden="true" {...props}>
      <circle cx="12" cy="8" r="6" />
      <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
    </svg>
  )
}

export function ShieldCheckIcon({ size = 24, className = '', ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base} className={className} aria-hidden="true" {...props}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  )
}

export function AcademicCapIcon({ size = 24, className = '', ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base} className={className} aria-hidden="true" {...props}>
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  )
}

export function LeafIcon({ size = 24, className = '', ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base} className={className} aria-hidden="true" {...props}>
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
    </svg>
  )
}

export function PhoneIcon({ size = 18, className = '', ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base} className={className} aria-hidden="true" {...props}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  )
}

export function MailIcon({ size = 18, className = '', ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base} className={className} aria-hidden="true" {...props}>
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  )
}

export function MapPinIcon({ size = 20, className = '', ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base} className={className} aria-hidden="true" {...props}>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}

export function ClockIcon({ size = 20, className = '', ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base} className={className} aria-hidden="true" {...props}>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
}

export function ChevronDownIcon({ size = 18, className = '', ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base} className={className} aria-hidden="true" {...props}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}

export function ArrowUpIcon({ size = 20, className = '', ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base} className={className} aria-hidden="true" {...props}>
      <path d="m5 12 7-7 7 7" />
      <path d="M12 19V5" />
    </svg>
  )
}

export function ArrowRightIcon({ size = 16, className = '', ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base} className={className} aria-hidden="true" {...props}>
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  )
}

export function DownloadIcon({ size = 18, className = '', ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base} className={className} aria-hidden="true" {...props}>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" x2="12" y1="15" y2="3" />
    </svg>
  )
}

export function CloseIcon({ size = 24, className = '', ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base} className={className} aria-hidden="true" {...props}>
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}

export function CheckIcon({ size = 18, className = '', ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base} className={className} aria-hidden="true" {...props}>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

export function BookOpenIcon({ size = 24, className = '', ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base} className={className} aria-hidden="true" {...props}>
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  )
}

export function MonitorIcon({ size = 24, className = '', ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base} className={className} aria-hidden="true" {...props}>
      <rect width="20" height="14" x="2" y="3" rx="2" />
      <line x1="8" x2="16" y1="21" y2="21" />
      <line x1="12" x2="12" y1="17" y2="21" />
    </svg>
  )
}

export function SparklesIcon({ size = 24, className = '', ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base} className={className} aria-hidden="true" {...props}>
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    </svg>
  )
}

export function CompassIcon({ size = 24, className = '', ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base} className={className} aria-hidden="true" {...props}>
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </svg>
  )
}

export function ActivityIcon({ size = 24, className = '', ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base} className={className} aria-hidden="true" {...props}>
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  )
}

export function MusicIcon({ size = 24, className = '', ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base} className={className} aria-hidden="true" {...props}>
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
    </svg>
  )
}

export function PaletteIcon({ size = 24, className = '', ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base} className={className} aria-hidden="true" {...props}>
      <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
      <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
      <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
      <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.563-2.512 5.563-5.563C22 6.5 17.5 2 12 2Z" />
    </svg>
  )
}

export function UserIcon({ size = 24, className = '', ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base} className={className} aria-hidden="true" {...props}>
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}

export function ImageIcon({ size = 32, className = '', ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base} className={className} aria-hidden="true" {...props}>
      <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
      <circle cx="9" cy="9" r="2" />
      <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
    </svg>
  )
}

export function ArrowLeftIcon({ size = 16, className = '', ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base} className={className} aria-hidden="true" {...props}>
      <path d="M19 12H5" />
      <path d="m12 19-7-7 7-7" />
    </svg>
  )
}

export function ShareIcon({ size = 18, className = '', ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base} className={className} aria-hidden="true" {...props}>
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.59" x2="15.42" y1="13.51" y2="17.49" />
      <line x1="15.41" x2="8.59" y1="6.51" y2="10.49" />
    </svg>
  )
}

export function TagIcon({ size = 16, className = '', ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base} className={className} aria-hidden="true" {...props}>
      <path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z" />
      <path d="M7 7h.01" />
    </svg>
  )
}

export function CalendarIcon({ size = 18, className = '', ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base} className={className} aria-hidden="true" {...props}>
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
    </svg>
  )
}

export function QuoteIcon({ size = 28, className = '', ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base} className={className} aria-hidden="true" {...props}>
      <path d="M3 21c3 0 7-1 7-8V5c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h2c0 2-2 3-3 3" />
      <path d="M15 21c3 0 7-1 7-8V5c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h2c0 2-2 3-3 3" />
    </svg>
  )
}


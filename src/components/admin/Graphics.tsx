import React from 'react'

// Lambang kecil: kotak brand TailAdmin (#465FFF) dengan ikon toga sekolah.
const Mark = ({ size = 32 }: { size?: number }) => (
  <svg aria-hidden="true" fill="none" height={size} viewBox="0 0 32 32" width={size}>
    <rect fill="#465FFF" height="32" rx="8" width="32" />
    <path d="M6 13.5 16 8l10 5.5L16 19 6 13.5Z" fill="#fff" />
    <path
      d="M10.5 16v4.2c0 1.3 2.46 2.8 5.5 2.8s5.5-1.5 5.5-2.8V16"
      stroke="#fff"
      strokeLinecap="round"
      strokeWidth="1.8"
    />
    <path d="M26 13.5V19" stroke="#fff" strokeLinecap="round" strokeWidth="1.8" />
  </svg>
)

/** Dipakai di navigasi dan breadcrumb admin. */
export const Icon = () => <Mark size={28} />

/** Dipakai di halaman login admin. */
export const Logo = () => (
  <span className="ta-logo">
    <Mark size={40} />
    <span className="ta-logo__text">
      <strong>SDN 3 Way Galih</strong>
      <span>Panel Admin Website</span>
    </span>
  </span>
)

import React from 'react'

// Ikon garis 24px dengan gaya yang sama seperti ikon TailAdmin (stroke 1.5, ujung membulat).
const Svg = ({ children }: { children: React.ReactNode }) => (
  <svg
    aria-hidden="true"
    fill="none"
    height="24"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="1.5"
    viewBox="0 0 24 24"
    width="24"
  >
    {children}
  </svg>
)

export const IconBerita = () => (
  <Svg>
    <path d="M4 5.5A1.5 1.5 0 0 1 5.5 4h10A1.5 1.5 0 0 1 17 5.5V19a1 1 0 0 0 1 1H6a2 2 0 0 1-2-2V5.5Z" />
    <path d="M17 9h2a1 1 0 0 1 1 1v8a2 2 0 0 1-2 2" />
    <path d="M8 8h5M8 12h5M8 16h3" />
  </Svg>
)

export const IconAgenda = () => (
  <Svg>
    <rect height="16" rx="2" width="17" x="3.5" y="5" />
    <path d="M3.5 10h17M8 3v4M16 3v4" />
    <path d="M8 14h2M14 14h2M8 17h2" />
  </Svg>
)

export const IconGaleri = () => (
  <Svg>
    <rect height="16" rx="2" width="18" x="3" y="4" />
    <circle cx="9" cy="9.5" r="1.5" />
    <path d="m21 15-4.5-4.5L7 20" />
  </Svg>
)

export const IconFaq = () => (
  <Svg>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M9.75 9.5a2.25 2.25 0 1 1 3.3 2c-.6.32-1.05.86-1.05 1.5v.5" />
    <path d="M12 16.5h.01" />
  </Svg>
)

export const IconPpdb = () => (
  <Svg>
    <path d="M9 4h6l1 2h2.5A1.5 1.5 0 0 1 20 7.5v11a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 18.5v-11A1.5 1.5 0 0 1 5.5 6H8l1-2Z" />
    <path d="m9 13 2 2 4-4" />
  </Svg>
)

export const IconSekolah = () => (
  <Svg>
    <path d="M3 10 12 5l9 5-9 5-9-5Z" />
    <path d="M7 12.2V16c0 1.1 2.24 2.5 5 2.5s5-1.4 5-2.5v-3.8" />
    <path d="M21 10v5" />
  </Svg>
)

export const IconWebsite = () => (
  <Svg>
    <path d="M14 4h6v6M20 4l-8.5 8.5" />
    <path d="M18 14v4.5a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 4 18.5v-11A1.5 1.5 0 0 1 5.5 6H10" />
  </Svg>
)

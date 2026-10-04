type IconName =
  | 'book'
  | 'spark'
  | 'user'
  | 'search'
  | 'map'
  | 'arrow'
  | 'heart'
  | 'shuffle'
  | 'chevron'
  | 'clock'
  | 'utensils'
  | 'external'
  | 'plus'
  | 'check'

type IconProps = {
  name: IconName
  size?: number
  strokeWidth?: number
}

export function Icon({ name, size = 18, strokeWidth = 1.8 }: IconProps) {
  const common = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, 'aria-hidden': true }

  switch (name) {
    case 'book': return <svg {...common}><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21.5z" /><path d="M4 5.5v16M8 7h8M8 11h6" /></svg>
    case 'spark': return <svg {...common}><path d="m12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z" /><path d="m19 16 .8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8z" /></svg>
    case 'user': return <svg {...common}><circle cx="12" cy="8" r="3.5" /><path d="M4.8 20a7.2 7.2 0 0 1 14.4 0" /></svg>
    case 'search': return <svg {...common}><circle cx="10.8" cy="10.8" r="6.8" /><path d="m16 16 4.3 4.3" /></svg>
    case 'map': return <svg {...common}><path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3z" /><path d="M9 3v15M15 6v15" /></svg>
    case 'arrow': return <svg {...common}><path d="M5 12h13" /><path d="m13 6 6 6-6 6" /></svg>
    case 'heart': return <svg {...common}><path d="M20.8 8.8c0 5.5-8.8 10-8.8 10S3.2 14.3 3.2 8.8A4.6 4.6 0 0 1 12 6.4a4.6 4.6 0 0 1 8.8 2.4Z" /></svg>
    case 'shuffle': return <svg {...common}><path d="M16 3h5v5M4 7h3c3 0 4 10 7 10h2" /><path d="m18 15 3 3-3 3M4 17h3c1.1 0 1.9-.9 2.6-2M16 7h2l3-3" /></svg>
    case 'chevron': return <svg {...common}><path d="m9 18 6-6-6-6" /></svg>
    case 'clock': return <svg {...common}><circle cx="12" cy="12" r="8.5" /><path d="M12 7v5l3.5 2" /></svg>
    case 'utensils': return <svg {...common}><path d="M7 3v8M4 3v5a3 3 0 0 0 6 0V3M7 11v10M17 3c-2 2-2.5 5.7 0 7.5V21M17 3v18" /></svg>
    case 'external': return <svg {...common}><path d="M14 4h6v6M20 4l-9 9" /><path d="M19 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5" /></svg>
    case 'plus': return <svg {...common}><path d="M12 5v14M5 12h14" /></svg>
    case 'check': return <svg {...common}><path d="m5 12 4 4L19 6" /></svg>
  }
}

'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Nav() {
  const pathname = usePathname()

  return (
    <nav>
      <Link href="/" className={pathname === '/' ? 'select' : ''}>WORKS</Link>
      <Link href="/about" className={pathname === '/about' ? 'select' : ''}>ABOUT</Link>
    </nav>
  )
}

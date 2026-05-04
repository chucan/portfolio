'use client'

import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { useState } from 'react'

export default function Nav() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const currentSection = searchParams.get('section')
  const isAbout = pathname === '/about'
  const [isOpen, setIsOpen] = useState(false)

  const close = () => setIsOpen(false)

  return (
    <>
      <button className="hamburger" onClick={() => setIsOpen(!isOpen)} aria-label="メニュー">
        {isOpen ? '✕' : '☰'}
      </button>

      <nav className={isOpen ? 'open' : ''}>
        <div className="nav_group">
          <Link href="/" className={`nav_label${pathname === '/' && !currentSection ? ' select' : ''}`} onClick={close}>
            WORKS
          </Link>
          <div className="nav_sub">
            <Link href="/?section=stores" className={currentSection === 'stores' ? 'select' : ''} onClick={close}>
              STORES, inc.
            </Link>
            <Link href="/?section=freelance" className={currentSection === 'freelance' ? 'select' : ''} onClick={close}>
              Freelance
            </Link>
          </div>
        </div>
        <Link href="/about" className={`nav_label${isAbout ? ' select' : ''}`} onClick={close}>
          ABOUT
        </Link>
      </nav>
    </>
  )
}

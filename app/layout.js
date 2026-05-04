import './globals.scss'
import { Rubik } from 'next/font/google'
import Link from 'next/link'
import Nav from './components/Nav'
import { Suspense } from 'react'

const rubik = Rubik({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

export const metadata = {
  title: 'chucan｜Portfolio',
  description: 'chucan, Designer / illustrator',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body className={rubik.className}>
        <div className="layout">
          <header>
            <div className="page_title">
              <Link href="/">
                <h1>chucan</h1>
                {/* <p className="page_sub_title">designer / illustrator</p> */}
              </Link>
            </div>
            <Suspense><Nav /></Suspense>
          </header>
          {children}
          <footer>
            <p className="copyright">© chucan</p>
          </footer>
        </div>
      </body>
    </html>
  )
}

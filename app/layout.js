import './globals.scss'
import { Montserrat } from 'next/font/google'
import Link from 'next/link'
import Nav from './components/Nav'

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '600', '800'],
})

export const metadata = {
  title: 'chucan｜Portfolio',
  description: 'chucan, Designer / illustrator',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body className={montserrat.className}>
        <header>
          <div className="page_title">
            <Link href="/">
              <h1>chucan</h1>
              <p className="page_sub_title">designer / illustrator</p>
            </Link>
          </div>
          <Nav />
        </header>
        {children}
        <footer>
          <p className="copyright">© chucan</p>
        </footer>
      </body>
    </html>
  )
}

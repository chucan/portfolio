import { Suspense } from 'react'
import works from '../data/works.json'
import WorksFilter from './components/WorksFilter'

export default function Home() {
  return (
    <main>
      <Suspense>
        <WorksFilter works={works} />
      </Suspense>
    </main>
  )
}

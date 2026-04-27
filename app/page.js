import works from '../data/works.json'
import WorksFilter from './components/WorksFilter'

export default function Home() {
  return (
    <main>
      <WorksFilter works={works} />
    </main>
  )
}

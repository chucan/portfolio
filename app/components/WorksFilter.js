'use client'

import Link from 'next/link'
import { useSearchParams, useRouter } from 'next/navigation'

const SECTION_MAP = {
  'stores': 'STORES, inc.',
  'righttouch': 'RightTouch inc.',
  'freelance': 'Freelance',
}

function groupBySection(works) {
  const sections = []
  let currentSection = null
  for (const work of works) {
    if (work.section !== currentSection) {
      currentSection = work.section
      sections.push({ label: work.section, works: [] })
    }
    sections[sections.length - 1].works.push(work)
  }
  return sections
}

export default function WorksFilter({ works }) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const selectedTag = searchParams.get('tag')
  const selectedSection = searchParams.get('section')

  const filteredWorks = works
    .filter(w => !selectedSection || w.section === SECTION_MAP[selectedSection])
    .filter(w => !selectedTag || w.tags.includes(selectedTag))

  const sections = groupBySection(filteredWorks)

  const handleTagClick = (tag) => {
    const params = new URLSearchParams(searchParams)
    if (selectedTag === tag) {
      params.delete('tag')
    } else {
      params.set('tag', tag)
    }
    const query = params.toString()
    router.push(query ? `/?${query}` : '/')
  }

  return (
    <div key={`${selectedSection}-${selectedTag}`} className="works_filter_wrap">
      {sections.map((section) => (
        <div key={section.label} className="works_section">
          <h2 className="works_section_heading">{section.label}</h2>
          <div className="container">
            {section.works.map((work) => (
              <div className="works_list" key={work.slug}>
                <Link href={`/works/${work.slug}`}>
                  <div className="img_box">
                    <img src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/img/${work.thumbnail}`} alt={work.title} loading="lazy" decoding="async" />
                  </div>
                  <p className="work_title">{work.title}</p>
                </Link>
                {work.year && <span className="work_year">{work.year}</span>}
                <div className="work_tags">
                  {work.tags.map(tag => (
                    <button
                      key={tag}
                      className={`tag${selectedTag === tag ? ' active' : ''}`}
                      onClick={() => handleTagClick(tag)}
                    >#{tag}</button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

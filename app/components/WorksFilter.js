'use client'

import Link from 'next/link'
import { useState } from 'react'

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
  const [selectedTag, setSelectedTag] = useState(null)

  const filteredWorks = selectedTag
    ? works.filter(w => w.tags.includes(selectedTag))
    : works

  const sections = groupBySection(filteredWorks)

  return (
    <>
      {sections.map((section) => (
        <div key={section.label} className="section_group">
          <h2 className="section_heading">{section.label}</h2>
          <div className="container">
            {section.works.map((work) => (
              <div className="works_list" key={work.slug}>
                <Link href={`/works/${work.slug}`}>
                  <div className="img_box">
                    <img src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/img/${work.thumbnail}`} alt={work.title} />
                  </div>
                  <p className="work_title">{work.title}</p>
                </Link>
                <div className="work_tags">
                  {work.tags.map(tag => (
                    <button
                      key={tag}
                      className={`tag${selectedTag === tag ? ' active' : ''}`}
                      onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                    >{tag}</button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  )
}

import works from '../../../data/works.json'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export function generateStaticParams() {
  return works.map((work) => ({ slug: work.slug }))
}

export default async function WorkPage({ params }) {
  const { slug } = await params
  const work = works.find((w) => w.slug === slug)
  if (!work) notFound()

  return (
    <main>
      <section className="works_detail">
        <div className="title_container">
          <h2>{work.title}</h2>
          {work.year && <h3 className="date_ad">{work.year}</h3>}
          {work.tags && (
            <div className="work_tags">
              {work.tags.map(tag => (
                <Link key={tag} href={`/?tag=${tag}`} className="tag">#{tag}</Link>
              ))}
            </div>
          )}
        </div>
        <div className="work_img_box">
          {work.images.map((img, i) => (
            <img
              key={i}
              src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}${img.src}`}
              alt={img.alt}
              className={img.small ? 'img_small' : ''}
            />
          ))}
        </div>
        <div className="text_container">
          <div className="text_container_column">
            {work.scope && (
              <>
                <h3>SCOPE</h3>
                <p>{work.scope}</p>
              </>
            )}
            {work.client && (
              <>
                <h3>CLIENT</h3>
                <p>{work.client}</p>
              </>
            )}
            {work.tool && (
              <>
                <h3>Tool</h3>
                <p>{work.tool}</p>
              </>
            )}
          </div>
          <div className="text_container_column">
            {work.description.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
            {work.links && work.links.map((link, i) => (
              <p key={i}>
                <a href={link.url} target="_blank" rel="noopener noreferrer">
                  {link.label}
                </a>
              </p>
            ))}
          </div>
        </div>
      </section>
      <div className="page_back">
        <Link href="/">← BACK</Link>
      </div>
    </main>
  )
}

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

  let embedHtml = null
  if (work.embed) {
    try {
      const res = await fetch(`https://speakerdeck.com/oembed.json?url=${encodeURIComponent(work.embed)}`)
      const data = await res.json()
      embedHtml = data.html
    } catch {}
  }

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
        {work.images[0] && (
          <div className="work_img_box">
            <img
              src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}${work.images[0].src}`}
              alt={work.images[0].alt}
              className={work.images[0].small ? 'img_small' : ''}
            />
          </div>
        )}
        <div className="text_container">
          <div className="text_container_column">
            {work.scope && (
              <>
                <h3>SCOPE</h3>
                <ul>
                  {work.scope.split(' , ').map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
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
                <h3>TOOL</h3>
                <ul>
                  {work.tool.split(' , ').map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </>
            )}
          </div>
          <div className="text_container_column text_container_column--wide">
            {work.description.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
            {!work.embed && work.links && work.links.map((link, i) => (
              <p key={i}>
                <a href={link.url} target="_blank" rel="noopener noreferrer">
                  {link.label}
                </a>
              </p>
            ))}
          </div>
        </div>
        {work.images.length > 1 && (
          <div className="work_img_box">
            {work.images.slice(1).map((img, i) => (
              <figure key={i} className={img.small ? 'img_small' : ''}>
                <img
                  src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}${img.src}`}
                  alt={img.alt}
                />
                {img.caption && <figcaption>{img.caption}</figcaption>}
              </figure>
            ))}
          </div>
        )}
        {embedHtml && (
          <div className="embed_container">
            <div dangerouslySetInnerHTML={{ __html: embedHtml }} />
            {work.links && work.links.map((link, i) => (
              <p key={i}>
                <a href={link.url} target="_blank" rel="noopener noreferrer">
                  {link.label}
                </a>
              </p>
            ))}
          </div>
        )}
      </section>
      <div className="page_back">
        <Link href="/">← BACK</Link>
      </div>
    </main>
  )
}

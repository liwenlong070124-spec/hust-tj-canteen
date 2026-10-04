import Link from 'next/link'

export default function NotFound() {
  return <main className="not-found"><span className="eyebrow">404 · LOST IN THE ATLAS</span><h1>这页还没<br /><em>端上来。</em></h1><p>换个入口，回到今天的美食图鉴。</p><Link className="button button-primary" href="/">回到图鉴</Link></main>
}

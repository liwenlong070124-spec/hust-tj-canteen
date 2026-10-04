'use client'

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <main className="not-found"><span className="eyebrow">OOPS · KITCHEN PAUSE</span><h1>这口需要<br /><em>再试一次。</em></h1><p>页面暂时没有准备好，但好吃的还在。</p><button className="button button-primary" onClick={reset}>重新加载</button></main>
}

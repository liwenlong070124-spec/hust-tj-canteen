'use client'

export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <html lang="zh-CN"><body><main className="not-found"><span className="eyebrow">SYSTEM PAUSE</span><h1>厨房需要<br /><em>一点时间。</em></h1><button className="button button-primary" onClick={reset}>重新加载</button></main></body></html>
}

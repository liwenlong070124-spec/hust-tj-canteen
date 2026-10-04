import Link from 'next/link'
import { Icon } from '@/components/icons'

const colors = [
  ['橙焰 Orange', '#ed7f49', '主按钮 / 主视觉'],
  ['奶油 Cream', '#fffaf2', '页面底色 / 留白'],
  ['墨绿 Moss', '#273d35', '标题 / 深色表面'],
  ['杏仁 Almond', '#f3e6d6', '次级容器 / 标签'],
  ['浆果 Berry', '#8f4a49', '强调 / 价格'],
]

export default function PlaygroundPage() {
  return <div className="playground-page page-enter"><div className="detail-back"><Link href="/"><Icon name="arrow" size={15} /> 返回图鉴</Link><span>Design system / Playground</span></div><header className="playground-header"><div><span className="eyebrow orange-eyebrow"><span className="eyebrow-line" /> SYSTEM NOTES</span><h1>一份会呼吸的<br /><em>设计规范。</em></h1><p>字体、颜色、间距、组件和动效都在这里排练，<br />让每个页面拥有同一种“好好吃饭”的语气。</p></div><div className="playground-sign">v0.2<br /><span>WARM / TIDY / PLAYFUL</span></div></header>
    <section className="play-section"><div className="section-heading"><div><span className="eyebrow">01 · COLOR PALETTE</span><h2>像一张晒过太阳的餐桌</h2></div></div><div className="color-grid">{colors.map(([name, color, use]) => <div className="color-swatch" key={name}><div style={{ backgroundColor: color }} /><strong>{name}</strong><span>{use}</span><small>{color}</small></div>)}</div></section>
    <section className="play-section type-section"><div className="section-heading"><div><span className="eyebrow">02 · TYPE SCALE</span><h2>标题要有一点主意</h2></div></div><div className="type-samples"><div><span>Display / 26 mobile · 42 desktop</span><strong>今天，吃点好的。</strong></div><div><span>Heading / 22–28 mobile</span><h3>慢慢逛，慢慢选</h3></div><div><span>Body / 14 mobile</span><p>把每一顿饭，吃成一点小确幸。</p></div><div><span>Label / 11</span><small>EDITOR’S PICKS · CANTEEN ATLAS</small></div></div></section>
    <section className="play-section"><div className="section-heading"><div><span className="eyebrow">03 · COMPONENTS</span><h2>小组件，大语气</h2></div></div><div className="component-demo"><div className="demo-row"><button className="button button-primary">主按钮 <Icon name="arrow" size={15} /></button><button className="button button-secondary">次按钮</button><button className="button button-quiet"><Icon name="search" size={16} /> 搜索</button></div><div className="demo-row"><span className="tag tag-demo">性价比</span><span className="tag tag-demo tag-strong">早八友好</span><span className="status-chip"><span className="status-dot" /> 营业参考</span></div><div className="demo-motion"><span className="motion-dot" /><span>页面切换：420ms eased slide</span><span className="motion-arrow"><Icon name="arrow" size={15} /></span></div></div></section>
    <section className="play-principles"><div><span className="eyebrow">04 · MOBILE V0.2</span><h2>紧凑，也要<br />从容好用。</h2></div><div className="principle-list"><div><span>01</span><strong>双列优先，信息不重复</strong><p>手机端卡片与快捷入口都是双列。页面标题 22–28px，卡片标题 14px，详情正文 14px。</p></div><div><span>02</span><strong>统一的缓动滑入</strong><p>路由过渡 420ms，cubic-bezier(.16, 1, .3, 1)，横向位移 28px；系统减少动效时直接显示。</p></div><div><span>03</span><strong>把不确定说清楚</strong><p>本地 AI 图逐张对应菜品；名录、历史线索与编辑菜单分开表达。真实位置和营业状态不靠推测补齐。</p></div></div></section>
    <footer className="page-footer"><span>Designed for the next good meal.</span><Link href="/">回到图鉴 <Icon name="arrow" size={13} /></Link></footer></div>
}

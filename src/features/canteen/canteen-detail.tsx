'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Icon } from '@/components/icons'
import { FoodCard } from './food-card'
import type { Canteen, FoodItem } from './types'

export function CanteenDetail({ canteen, foods }: { canteen: Canteen; foods: FoodItem[] }) {
  const [saved, setSaved] = useState<string[]>([])

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const stored = window.localStorage.getItem('tj-food-saved')
      if (stored) setSaved(JSON.parse(stored) as string[])
    }, 0)
    return () => window.clearTimeout(timer)
  }, [])

  const toggleSaved = (slug: string) => {
    setSaved((current) => {
      const next = current.includes(slug) ? current.filter((item) => item !== slug) : [...current, slug]
      window.localStorage.setItem('tj-food-saved', JSON.stringify(next))
      return next
    })
  }

  return (
    <div className="detail-page page-enter">
      <div className="detail-back"><Link href="/"><Icon name="arrow" size={15} /> 返回图鉴</Link><span>食堂索引 / {canteen.name}</span></div>
      <section className="detail-hero">
        <div className="detail-hero-copy"><span className="eyebrow orange-eyebrow"><span className="eyebrow-line" /> {canteen.eyebrow}</span><h1>{canteen.name}<em>，今天也见。</em></h1><p>{canteen.description}</p><div className="detail-metadata"><span><Icon name="map" size={16} /> {canteen.addressHint}</span><span><Icon name="clock" size={16} /> {canteen.openTime}</span></div><a className="button button-primary" href={canteen.mapUrl} target="_blank" rel="noreferrer">打开地图 <Icon name="external" size={15} /></a></div>
        <div className="detail-hero-image" style={{ backgroundImage: `url(${canteen.image})` }}><span className="detail-image-overlay" /><span className="detail-image-label">{canteen.walkingTime}</span></div>
      </section>

      <section className="detail-stall-section"><div className="section-heading"><div><span className="eyebrow">WINDOWS & STALLS</span><h2>今天从哪一窗开始</h2></div><span className="section-note">现场营业时间可能调整 <Icon name="clock" size={14} /></span></div><div className="stall-grid">{canteen.stalls.map((stall) => <div className="stall-card" key={stall.name}><div className="stall-top"><span className="stall-floor">{stall.floor}</span><span className="stall-open"><span className="status-dot" /> 营业参考</span></div><h3>{stall.name}</h3><div className="stall-tags">{stall.specialties.map((specialty) => <span key={specialty}>{specialty}</span>)}</div><div className="stall-bottom"><strong>{stall.priceRange}</strong><span><Icon name="clock" size={14} /> {stall.openTime}</span></div></div>)}</div></section>

      <section className="detail-food-section"><div className="section-heading"><div><span className="eyebrow">TASTE NOTES</span><h2>这家可以吃什么</h2></div><span className="result-count">{foods.length} <small>种记录</small></span></div><div className="food-grid detail-food-grid">{foods.map((food) => <FoodCard key={food.slug} food={food} canteenName={canteen.name} isSaved={saved.includes(food.slug)} onToggleSaved={toggleSaved} />)}</div></section>

      <section className="source-note"><div className="source-note-icon"><Icon name="check" size={18} /></div><div><strong>这是一份持续维护的校园索引</strong><p>食堂名称、服务线索来自公开页面；菜单价格、营业时间和窗口描述是便于浏览的参考信息，欢迎在现场以最新公告为准。</p></div><div className="source-links">{canteen.sourceUrls.slice(0, 2).map((url, index) => <a href={url} target="_blank" rel="noreferrer" key={url}>公开来源 {index + 1} <Icon name="external" size={13} /></a>)}</div></section>
    </div>
  )
}

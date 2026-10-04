'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { Icon } from '@/components/icons'
import { cn } from '@/lib/cn'
import { FoodCard } from './food-card'
import type { Canteen, FoodItem, FoodTag } from './types'

const filters: Array<{ label: string; value: '全部' | FoodTag }> = [
  { label: '全部', value: '全部' },
  { label: '早八友好', value: '早八友好' },
  { label: '性价比', value: '性价比' },
  { label: '面饭', value: '面饭' },
  { label: '辣口', value: '辣口' },
  { label: '清真', value: '清真' },
]

export function FoodAtlas({ foods, canteens }: { foods: FoodItem[]; canteens: Canteen[] }) {
  const [query, setQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState<'全部' | FoodTag>('全部')
  const [saved, setSaved] = useState<string[]>([])
  const [showSearch, setShowSearch] = useState(false)

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

  const filteredFoods = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    return foods.filter((food) => {
      const matchesFilter = activeFilter === '全部' || food.tags.includes(activeFilter)
      const canteen = canteens.find((item) => item.slug === food.canteenSlug)
      const matchesQuery = !normalized || [food.name, food.stall, canteen?.name, ...food.tags].join(' ').toLowerCase().includes(normalized)
      return matchesFilter && matchesQuery
    })
  }, [activeFilter, canteens, foods, query])

  const featured = foods.filter((food) => food.featured).slice(0, 3)
  const getCanteenName = (slug: string) => canteens.find((canteen) => canteen.slug === slug)?.name ?? '同济校区'

  return (
    <div className="atlas-page page-enter">
      <header className="atlas-hero">
        <div className="hero-copy">
          <span className="eyebrow orange-eyebrow"><span className="eyebrow-line" /> 今日食谱 · 10.04</span>
          <h1>今天，<br /><em>吃点好的。</em></h1>
          <p>同济医学院校区美食图鉴<br />从下一口开始，认识校园里的烟火气。</p>
          <div className="hero-actions">
            <Link className="button button-primary" href="/eat/">帮我决定 <Icon name="arrow" size={16} /></Link>
            <button className="button button-quiet" onClick={() => setShowSearch((current) => !current)}><Icon name="search" size={16} /> 搜一搜</button>
          </div>
        </div>
        <div className="hero-art" aria-label="一碗热气腾腾的校园饭菜" role="img">
          <div className="hero-sun" />
          <div className="hero-doodle doodle-one">✦</div>
          <div className="hero-doodle doodle-two">· ·</div>
          <div className="hero-plate">
            <span className="plate-steam steam-one" /><span className="plate-steam steam-two" />
            <span className="plate-bowl">🍜</span>
          </div>
          <span className="hero-note note-one">warm<br />& tasty</span>
          <span className="hero-note note-two">同济<br />烟火气</span>
        </div>
      </header>

      <div className={cn('search-drawer', showSearch && 'is-open')}>
        <Icon name="search" size={19} />
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="搜菜名、窗口、食堂或口味" aria-label="搜索美食" autoFocus={showSearch} />
        {query && <button onClick={() => setQuery('')} aria-label="清空搜索">清除</button>}
      </div>

      <section className="section-block featured-section">
        <div className="section-heading">
          <div><span className="eyebrow">EDITOR’S PICKS</span><h2>今日值得吃</h2></div>
          <span className="section-note">先收藏，到了饭点不慌张 <Icon name="heart" size={14} /></span>
        </div>
        <div className="featured-grid">
          {featured.map((food) => <FoodCard key={food.slug} food={food} canteenName={getCanteenName(food.canteenSlug)} isSaved={saved.includes(food.slug)} onToggleSaved={toggleSaved} featured />)}
        </div>
      </section>

      <section className="section-block atlas-list-section">
        <div className="section-heading list-heading">
          <div><span className="eyebrow">THE ATLAS</span><h2>慢慢逛，慢慢选</h2></div>
          <span className="result-count">{filteredFoods.length} <small>种灵感</small></span>
        </div>
        <div className="filter-row" role="tablist" aria-label="美食筛选">
          {filters.map((filter) => <button className={cn('filter-pill', activeFilter === filter.value && 'is-active')} key={filter.value} onClick={() => setActiveFilter(filter.value)} role="tab" aria-selected={activeFilter === filter.value}>{filter.label}</button>)}
        </div>
        {filteredFoods.length > 0 ? <div className="food-grid">
          {filteredFoods.map((food) => <FoodCard key={food.slug} food={food} canteenName={getCanteenName(food.canteenSlug)} isSaved={saved.includes(food.slug)} onToggleSaved={toggleSaved} />)}
        </div> : <div className="empty-state"><span>🍚</span><h3>还没有找到这口</h3><p>换个关键词，或者先看看“全部”。</p><button className="button button-secondary" onClick={() => { setQuery(''); setActiveFilter('全部') }}>清除筛选</button></div>}
      </section>

      <section className="canteen-strip">
        <div><span className="eyebrow">CANTEEN INDEX</span><h2>先认路，再吃饭。</h2><p>把同济校区的食堂坐标收进一张小小的地图。</p></div>
        <div className="canteen-mini-list">
          {canteens.slice(0, 4).map((canteen, index) => <Link href={`/canteens/${canteen.slug}/`} className="canteen-mini" key={canteen.slug}><span className="canteen-index">0{index + 1}</span><span><strong>{canteen.name}</strong><small>{canteen.tags.slice(0, 2).join(' · ')}</small></span><Icon name="chevron" size={16} /></Link>)}
        </div>
      </section>

      <footer className="page-footer"><span>同济食光 · 给校园生活加一点好吃的注脚</span><Link href="/playground/">设计规范 <Icon name="arrow" size={13} /></Link></footer>
    </div>
  )
}

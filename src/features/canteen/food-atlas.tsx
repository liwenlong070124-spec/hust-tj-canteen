'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { Icon } from '@/components/icons'
import { cn } from '@/lib/cn'
import { useSavedFoods } from '@/lib/use-saved-foods'
import { FoodCard } from './food-card'
import type { Canteen, FoodItem, FoodTag } from './types'

const filters: Array<'全部' | FoodTag> = ['全部', '早八友好', '性价比', '面饭', '辣口', '清淡', '小吃']

export function FoodAtlas({ foods, canteens }: { foods: FoodItem[]; canteens: Canteen[] }) {
  const [query, setQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState<'全部' | FoodTag>('全部')
  const [showSearch, setShowSearch] = useState(false)
  const { saved, toggleSaved, storageError } = useSavedFoods()
  const verified = canteens.filter((item) => item.status === 'verified')
  const filteredFoods = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    return [...foods].sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured))).filter((food) => {
      const canteen = canteens.find((item) => item.slug === food.canteenSlug)
      return (activeFilter === '全部' || food.tags.includes(activeFilter)) && (!normalized || [food.name, food.stall, canteen?.name, ...food.tags].join(' ').toLowerCase().includes(normalized))
    })
  }, [activeFilter, canteens, foods, query])

  return <div className="atlas-page">
    <header className="atlas-hero">
      <div className="hero-copy">
        <span className="eyebrow orange-eyebrow">同济食光 · 校园美食图鉴</span>
        <h1>今天，<em>吃点好的。</em></h1>
        <p>一口烟火气，治愈每个普通日子。</p>
        <div className="hero-actions"><Link className="button button-primary" href="/eat/">帮我决定 <Icon name="shuffle" size={16} /></Link><button className="hero-search-button" aria-label="搜索图鉴" aria-expanded={showSearch} aria-controls="atlas-search" onClick={() => setShowSearch((current) => !current)}><Icon name="search" size={19} /></button></div>
      </div>
      <div className="hero-art" aria-hidden="true"><div className="hero-sun" /><div className="hero-plate"><span className="plate-steam steam-one" /><span className="plate-steam steam-two" /><span className="plate-bowl">🍜</span></div><span className="hero-doodle doodle-one">✦</span></div>
    </header>
    <nav className="atlas-shortcuts" aria-label="图鉴快捷入口">
      <Link href="/canteens/"><span>🏡</span><strong>食堂图谱</strong><small>{verified.length} 个公开食堂</small></Link>
      <button onClick={() => { setActiveFilter('早八友好'); setQuery('') }}><span>🥟</span><strong>早餐灵感</strong><small>赶早八也吃好</small></button>
      <Link href="/eat/"><span>🎲</span><strong>吃什么</strong><small>抽一份小惊喜</small></Link>
      <Link href="/saved/"><span>🧡</span><strong>我的收藏</strong><small>{saved.length} 道心动菜品</small></Link>
    </nav>
    {showSearch && <form id="atlas-search" className="atlas-search" role="search" onSubmit={(event) => event.preventDefault()}><Icon name="search" size={18} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="搜菜名、窗口、食堂" aria-label="搜索美食" autoFocus /><button type="button" onClick={() => { setQuery(''); setShowSearch(false) }}>收起</button></form>}
    <section className="atlas-list-section" aria-label="菜品图鉴">
      <div className="section-heading list-heading"><div><h2>{query ? '找到这几口' : activeFilter === '全部' ? '好吃的，都在这里' : `${activeFilter} · 今天的灵感`}</h2><p className="atlas-caption">编辑推荐 · 图片与价格均为示意参考</p></div><span className="result-count">{filteredFoods.length}<small> 道</small></span></div>
      <div className="filter-row" aria-label="美食筛选">{filters.map((filter) => <button className={cn('filter-pill', activeFilter === filter && 'is-active')} key={filter} onClick={() => setActiveFilter(filter)} aria-pressed={activeFilter === filter}>{filter}</button>)}</div>
      {storageError && <p role="status" className="profile-feedback">{storageError}</p>}
      {filteredFoods.length ? <div className="food-grid">{filteredFoods.map((food) => <FoodCard key={food.slug} food={food} canteenName={canteens.find((item) => item.slug === food.canteenSlug)?.name ?? '位置待核验'} isSaved={saved.includes(food.slug)} onToggleSaved={toggleSaved} />)}</div> : <div className="empty-state"><span>🍚</span><h3>还没有找到这口</h3><p>试试别的菜名，或者回到全部。</p><button className="button button-secondary" onClick={() => { setQuery(''); setActiveFilter('全部') }}>清除筛选</button></div>}
    </section>
    <section className="atlas-directory-banner"><div><Icon name="map" size={24} /><div><h2>换一家食堂，换一种心情</h2><p>完整名录、公开来源与待核验线索</p></div></div><Link href="/canteens/" className="button button-secondary">逛逛食堂 <Icon name="arrow" size={15} /></Link></section>
    <footer className="page-footer"><span>好好吃饭，也是一件重要的小事。</span><Link href="/playground/">设计规范 <Icon name="arrow" size={13} /></Link></footer>
  </div>
}

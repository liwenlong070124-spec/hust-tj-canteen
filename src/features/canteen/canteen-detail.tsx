'use client'

import Link from 'next/link'
import { Icon } from '@/components/icons'
import { FoodCard } from './food-card'
import type { Canteen, FoodItem } from './types'
import { VenueArt } from '@/components/venue-art'
import { useSavedFoods } from '@/lib/use-saved-foods'

export function CanteenDetail({ canteen, foods }: { canteen: Canteen; foods: FoodItem[] }) {
  const { saved, toggleSaved, storageError } = useSavedFoods()

  return (
    <div className="detail-page">
      <div className="detail-back"><Link href="/canteens/"><Icon name="arrow" size={15} /> 返回食堂图谱</Link><span>{canteen.status === 'historical' ? '历史线索 · 待核验' : '公开食堂名录'}</span></div>
      <section className="detail-hero">
        <div className="detail-hero-copy"><span className="eyebrow orange-eyebrow">{canteen.eyebrow}</span><h1>{canteen.name}</h1><p>{canteen.description}</p><div className="detail-metadata"><span><Icon name="map" size={16} /> {canteen.addressHint}</span><span><Icon name="clock" size={16} /> {canteen.openTime}</span></div><a className="button button-primary" href={canteen.mapUrl} target="_blank" rel="noreferrer">地图搜索 <Icon name="external" size={15} /></a></div>
        <VenueArt name={canteen.name} />
      </section>

      <section className="detail-stall-section"><div className="section-heading"><div><h2>窗口与餐厅线索</h2></div></div>{canteen.stalls.length ? <div className="stall-grid">{canteen.stalls.map((stall) => <div className="stall-card" key={stall.name}><div className="stall-top"><span className="stall-floor">{stall.floor}</span><span className="stall-open">信息待核验</span></div><h3>{stall.name}</h3><div className="stall-tags">{stall.specialties.map((specialty) => <span key={specialty}>{specialty}</span>)}</div><div className="stall-bottom"><strong>{stall.priceRange}</strong><span><Icon name="clock" size={14} /> {stall.openTime}</span></div></div>)}</div> : <div className="directory-note"><Icon name="book" size={20} /><p>还没有经过核实的窗口菜单。欢迎补充带日期的现场资料，我们不把空白补成官方信息。</p></div>}</section>

      <section className="detail-food-section">
        <div className="section-heading"><div><span className="eyebrow">TASTE NOTES</span><h2>菜品灵感记录</h2><p className="atlas-caption">编辑菜单示例，窗口关联待核验</p></div><span className="result-count">{foods.length} <small>种记录</small></span></div>
        {foods.length ? <div className="food-grid detail-food-grid">{foods.map((food) => <FoodCard key={food.slug} food={food} canteenName={canteen.name} isSaved={saved.includes(food.slug)} onToggleSaved={toggleSaved} />)}</div> : <div className="directory-note"><Icon name="utensils" size={20} /><p>菜品资料还在整理，暂不展示未经核实的推荐。带日期的菜单和实拍照片可通过开源仓库补充。</p></div>}
      </section>

      {storageError && <p role="status">{storageError}</p>}
      <section className="source-note"><div className="source-note-icon"><Icon name="check" size={18} /></div><div><strong>这是一份持续维护的校园索引</strong><p>{canteen.sourceNote} 菜单关联、参考价格与窗口示例非官方现售菜单。</p></div><div className="source-links">{canteen.sourceUrls.map((url, index) => <a href={url} target="_blank" rel="noreferrer" key={url}>公开来源 {index + 1} <Icon name="external" size={13} /></a>)}</div></section>
    </div>
  )
}

'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Icon } from '@/components/icons'
import { useSavedFoods } from '@/lib/use-saved-foods'
import type { Canteen, FoodItem } from './types'

export function FoodDetail({ food, canteen }: { food: FoodItem; canteen: Canteen }) {
  const { saved, toggleSaved, storageError } = useSavedFoods()
  const isSaved = saved.includes(food.slug)
  return <article className="food-detail-page">
    <div className="food-detail-photo"><Image src={food.image} alt={`${food.name}菜品示意`} fill sizes="(max-width: 680px) 100vw, 65vw" priority /><Link className="photo-back" href="/" aria-label="返回美食图鉴"><Icon name="arrow" size={20} /></Link><span className="photo-disclaimer">{food.imageNote}</span></div>
    <div className="food-detail-body">
      <div className="food-detail-heading"><div><span className="eyebrow orange-eyebrow">{food.category} · 一口小满足</span><h1>{food.name}</h1></div><div className="detail-price"><strong><small>¥</small>{food.price}</strong><span>{food.priceNote}</span></div></div>
      <p className="food-detail-description">{food.description}</p><div className="tag-row">{food.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div>
      <section className="food-location"><div><Icon name="map" size={21} /><div><h2>{canteen.name}</h2><p>{food.stall} · 窗口关联为编辑示例</p></div></div><Link href={`/canteens/${canteen.slug}/`}>食堂详情 <Icon name="chevron" size={16} /></Link></section>
      <dl className="meal-facts"><div><dt>位置</dt><dd>{canteen.addressHint}</dd></div><div><dt>供餐</dt><dd>{canteen.openTime}</dd></div><div><dt>信息</dt><dd>{canteen.status === 'historical' ? '历史线索，经营现状待核验' : '食堂名称有公开来源，菜品与窗口待核验'}</dd></div></dl>
      <details className="meal-disclosure"><summary>关于这份记录与图片</summary><p>菜品与窗口关联、价格均为编辑示例，并非官方菜单。图片使用 AI 生成，展示菜品风格，不代表现场分量、配料或食堂实拍。过敏原与特殊饮食需求请向窗口确认。</p><a href={canteen.sourceUrls[0]} target="_blank" rel="noreferrer">查看食堂公开来源 <Icon name="external" size={14} /></a></details>
      <div className="food-detail-actions"><button className="button button-secondary" onClick={() => toggleSaved(food.slug)} aria-pressed={isSaved}><Icon name="heart" size={18} />{isSaved ? '已收藏 · 取消' : '先收藏这一口'}</button><a className="button button-primary" href={canteen.mapUrl} target="_blank" rel="noreferrer">查找食堂 <Icon name="external" size={16} /></a></div>
      {storageError && <p role="status" className="profile-feedback">{storageError}</p>}
    </div>
  </article>
}

'use client'

import Link from 'next/link'
import { cn } from '@/lib/cn'
import { Icon } from '@/components/icons'
import type { FoodItem } from './types'

type FoodCardProps = {
  food: FoodItem
  canteenName: string
  isSaved: boolean
  onToggleSaved: (slug: string) => void
  featured?: boolean
}

export function FoodCard({ food, canteenName, isSaved, onToggleSaved, featured = false }: FoodCardProps) {
  return (
    <article className={cn('food-card', featured && 'food-card-featured')}>
      <div className="food-card-visual" style={{ backgroundImage: `url(${food.image})` }}>
        <Link className="food-card-click-area" href={`/canteens/${food.canteenSlug}/`} aria-label={`查看${canteenName}详情`}>
          <span className={`food-card-glow glow-${food.accent}`} />
          <span className="food-card-category">{food.category}</span>
          <span className="food-card-emoji" aria-hidden="true">{food.category === '早餐' ? '🥣' : food.category === '小吃' ? '🍢' : food.category === '清真' ? '🍜' : '🍱'}</span>
          <span className="food-card-view"><Icon name="arrow" size={15} /></span>
        </Link>
        <button className={cn('save-button', isSaved && 'is-saved')} onClick={() => onToggleSaved(food.slug)} aria-label={isSaved ? `取消收藏${food.name}` : `收藏${food.name}`} aria-pressed={isSaved}>
          <Icon name="heart" size={17} strokeWidth={isSaved ? 2.5 : 1.8} />
        </button>
      </div>
      <div className="food-card-body">
        <div className="food-card-title-row">
          <div>
            <p className="card-kicker">{canteenName} · {food.stall}</p>
            <h3>{food.name}</h3>
          </div>
          <span className="food-price-wrap"><strong className="food-price"><small>¥</small>{food.price}</strong><small className="food-price-note">{food.priceNote}</small></span>
        </div>
        <p className="food-description">{food.description}</p>
        <div className="tag-row">
          {food.tags.slice(0, 3).map((tag) => <span className="tag" key={tag}>{tag}</span>)}
        </div>
      </div>
    </article>
  )
}

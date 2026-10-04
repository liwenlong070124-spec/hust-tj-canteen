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
      <Link className="food-card-visual" href={`/canteens/${food.canteenSlug}/`} style={{ backgroundImage: `url(${food.image})` }} aria-label={`查看${canteenName}详情`}>
        <span className={`food-card-glow glow-${food.accent}`} />
        <span className="food-card-category">{food.category}</span>
        <span className="food-card-emoji" aria-hidden="true">{food.category === '早餐' ? '🥣' : food.category === '小吃' ? '🍢' : food.category === '清真' ? '🍜' : '🍱'}</span>
        <button className={cn('save-button', isSaved && 'is-saved')} onClick={(event) => { event.preventDefault(); onToggleSaved(food.slug) }} aria-label={isSaved ? `取消收藏${food.name}` : `收藏${food.name}`}>
          <Icon name="heart" size={17} strokeWidth={isSaved ? 2.5 : 1.8} />
        </button>
        <span className="food-card-view"><Icon name="arrow" size={15} /></span>
      </Link>
      <div className="food-card-body">
        <div className="food-card-title-row">
          <div>
            <p className="card-kicker">{canteenName} · {food.stall}</p>
            <h3>{food.name}</h3>
          </div>
          <strong className="food-price"><small>¥</small>{food.price}</strong>
        </div>
        <p className="food-description">{food.description}</p>
        <div className="tag-row">
          {food.tags.slice(0, 3).map((tag) => <span className="tag" key={tag}>{tag}</span>)}
        </div>
      </div>
    </article>
  )
}

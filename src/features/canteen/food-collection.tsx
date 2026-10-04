'use client'

import Link from 'next/link'
import { Icon } from '@/components/icons'
import { useSavedFoods } from '@/lib/use-saved-foods'
import { FoodCard } from './food-card'
import type { Canteen, FoodItem } from './types'

export function FoodCollection({ foods, canteens }: { foods: FoodItem[]; canteens: Canteen[] }) {
  const { saved, toggleSaved, storageError } = useSavedFoods()
  const items = foods.filter((food) => saved.includes(food.slug))
  return <div className="collection-page"><div className="detail-back"><Link href="/profile/"><Icon name="arrow" size={16} /> 返回我的</Link></div><header className="compact-header"><span className="eyebrow orange-eyebrow">MY FAVOURITES</span><h1>收藏的好味道</h1><p>{items.length} 道心动菜品，留给下一次饭点。</p></header>{storageError && <p role="status">{storageError}</p>}{items.length ? <div className="food-grid">{items.map((food) => <FoodCard key={food.slug} food={food} canteenName={canteens.find((item) => item.slug === food.canteenSlug)?.name ?? '位置待核验'} isSaved onToggleSaved={toggleSaved} />)}</div> : <div className="empty-state"><span>🧡</span><h2>把喜欢的先收起来</h2><p>在图鉴里点一下爱心，下一顿就有灵感了。</p><Link className="button button-primary" href="/">去逛图鉴</Link></div>}</div>
}

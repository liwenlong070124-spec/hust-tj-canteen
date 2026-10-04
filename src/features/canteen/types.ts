export type FoodTag =
  | '人气'
  | '早八友好'
  | '性价比'
  | '面饭'
  | '清真'
  | '甜口'
  | '辣口'
  | '清淡'
  | '小吃'
  | '夜宵'

export type MenuCategory = '早餐' | '主食' | '小吃' | '饮品' | '清真'

export type FoodItem = {
  slug: string
  name: string
  canteenSlug: string
  stall: string
  description: string
  price: number
  priceNote: string
  tags: FoodTag[]
  category: MenuCategory
  image: string
  imageNote?: string
  accent: string
  featured?: boolean
  sourceUrl?: string
}

export type Stall = {
  name: string
  floor: string
  specialties: string[]
  priceRange: string
  openTime: string
}

export type Canteen = {
  slug: string
  name: string
  eyebrow: string
  description: string
  addressHint: string
  walkingTime: string
  openTime: string
  tags: string[]
  image: string
  mapUrl: string
  sourceUrls: string[]
  stalls: Stall[]
  status: 'verified' | 'historical'
  sourceNote: string
}

import type { FoodItem } from '@/features/canteen/types'

export type Mood = '随便' | '想吃饱' | '想吃辣' | '想省钱'

export function getEligibleFoods(foods: FoodItem[], mood: Mood): FoodItem[] {
  return foods.filter((food) => {
    if (mood === '想吃饱') return food.category === '主食' || food.tags.includes('面饭')
    if (mood === '想吃辣') return food.tags.includes('辣口')
    if (mood === '想省钱') return food.price <= 10
    return true
  })
}

import { notFound } from 'next/navigation'
import { FoodDetail } from '@/features/canteen/food-detail'
import { foods, getFood, getCanteen } from '@/features/canteen/registry'

export function generateStaticParams() { return foods.map((food) => ({ slug: food.slug })) }
export default async function FoodPage({ params }: { params: Promise<{ slug: string }> }) {
  const food = getFood((await params).slug)
  if (!food) notFound()
  const canteen = getCanteen(food.canteenSlug)
  if (!canteen) notFound()
  return <FoodDetail food={food} canteen={canteen} />
}

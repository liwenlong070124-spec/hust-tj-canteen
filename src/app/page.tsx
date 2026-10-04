import { FoodAtlas } from '@/features/canteen/food-atlas'
import { canteens, foods } from '@/features/canteen/registry'

export default function HomePage() {
  return <FoodAtlas foods={foods} canteens={canteens} />
}

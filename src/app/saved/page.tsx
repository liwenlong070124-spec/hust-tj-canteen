import { FoodCollection } from '@/features/canteen/food-collection'
import { canteens, foods } from '@/features/canteen/registry'
export default function SavedPage() { return <FoodCollection foods={foods} canteens={canteens} /> }

import { EatRandomizer } from '@/features/eat/eat-randomizer'
import { canteens, foods } from '@/features/canteen/registry'

export default function EatPage() {
  const canteenNames = Object.fromEntries(canteens.map((canteen) => [canteen.slug, canteen.name]))
  return <EatRandomizer foods={foods} canteenNames={canteenNames} />
}

import { notFound } from 'next/navigation'
import { CanteenDetail } from '@/features/canteen/canteen-detail'
import { canteens, getCanteen, getCanteenFoods } from '@/features/canteen/registry'

export function generateStaticParams() {
  return canteens.map((canteen) => ({ slug: canteen.slug }))
}

export default async function CanteenPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const canteen = getCanteen(slug)
  if (!canteen) notFound()
  return <CanteenDetail canteen={canteen} foods={getCanteenFoods(canteen.slug)} />
}

import Link from 'next/link'
import { Icon } from '@/components/icons'
import { VenueArt } from '@/components/venue-art'
import { canteens, campusMapUrl, procurementUrl } from '@/features/canteen/registry'

export default function CanteensPage() {
  const verified = canteens.filter((item) => item.status === 'verified')
  const historical = canteens.filter((item) => item.status === 'historical')
  return <div className="directory-page"><div className="detail-back"><Link href="/"><Icon name="arrow" size={16} /> 返回图鉴</Link><a href={campusMapUrl} target="_blank" rel="noreferrer">官方校园地图 <Icon name="external" size={14} /></a></div><header className="compact-header"><span className="eyebrow orange-eyebrow">CAMPUS DINING GUIDE</span><h1>同济食堂图谱</h1><p>6 个公开列名食堂，逐个认识校园烟火气。</p></header><div className="directory-note"><Icon name="book" size={19} /><p>名录参考 2024 年采购公告和学院公开报道。下方是食堂索引，不是地理坐标图；窗口、位置和营业现状以现场为准。</p></div><div className="venue-grid">{verified.map((canteen) => <Link className="venue-card" key={canteen.slug} href={`/canteens/${canteen.slug}/`}><VenueArt name={canteen.name} /><div><h2>{canteen.name}<Icon name="chevron" size={16} /></h2><p>{canteen.tags.join(' · ')}</p><small>{canteen.stalls.length ? `${canteen.stalls.length} 条窗口线索 · 含编辑示例` : '窗口与菜单待补充'}</small></div></Link>)}</div><details className="historical-directory"><summary>历史称呼与待核验线索 · {historical.length} 条</summary><p>保留旧链接，不与已确认食堂重复计数。</p>{historical.map((canteen) => <Link key={canteen.slug} href={`/canteens/${canteen.slug}/`}><span>{canteen.name}<small>{canteen.sourceNote}</small></span><Icon name="chevron" size={18} /></Link>)}</details><footer className="page-footer"><span>资料核对：2026-10-04</span><a href={procurementUrl} target="_blank" rel="noreferrer">名录依据 <Icon name="external" size={13} /></a></footer></div>
}

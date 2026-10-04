'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Icon } from '@/components/icons'
import type { FoodItem } from '@/features/canteen/types'
import { cn } from '@/lib/cn'
import { getEligibleFoods, type Mood } from './selection'

const moodOptions: Array<{ label: Mood; emoji: string; description: string }> = [
  { label: '随便', emoji: '🎲', description: '交给今天的运气' },
  { label: '想吃饱', emoji: '🍚', description: '来一份正经主食' },
  { label: '想吃辣', emoji: '🌶️', description: '让味蕾醒一醒' },
  { label: '想省钱', emoji: '🪙', description: '参考价不超过 ¥10' },
]

export function EatRandomizer({ foods, canteenNames }: { foods: FoodItem[]; canteenNames: Record<string, string> }) {
  const [mood, setMood] = useState<Mood>('随便')
  const [result, setResult] = useState<FoodItem | null>(null)
  const [isSpinning, setIsSpinning] = useState(false)
  const [round, setRound] = useState(0)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current) }, [])
  const eligibleFoods = useMemo(() => getEligibleFoods(foods, mood), [foods, mood])
  const draw = () => {
    if (isSpinning || !eligibleFoods.length) return
    setIsSpinning(true)
    timer.current = setTimeout(() => {
      setResult(eligibleFoods[Math.floor(Math.random() * eligibleFoods.length)])
      setRound((current) => current + 1)
      setIsSpinning(false)
    }, window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 780)
  }

  return <div className="eat-page">
    <header className="eat-header"><div><span className="eyebrow orange-eyebrow">让下一顿，有一点惊喜</span><h1>今天吃什么？<br /><em>别想了，抽一个。</em></h1><p>先选心情，再交给同济食光。</p></div><div className="eat-header-badge"><span>NO.</span><strong>{String(round).padStart(2, '0')}</strong><small>today’s pick</small></div></header>
    <section className="mood-section"><div className="section-heading"><h2>现在是什么心情</h2></div><div className="mood-grid">{moodOptions.map((option) => <button className={cn('mood-card', mood === option.label && 'is-selected')} key={option.label} disabled={isSpinning} aria-pressed={mood === option.label} onClick={() => setMood(option.label)}><span className="mood-emoji">{option.emoji}</span><strong>{option.label}</strong><small>{option.description}</small>{mood === option.label && <span className="mood-check"><Icon name="check" size={13} /></span>}</button>)}</div></section>
    <section className={cn('draw-stage', isSpinning && 'is-spinning', result && 'has-result')} aria-busy={isSpinning}><div className="draw-orbit orbit-one" /><div className="draw-orbit orbit-two" /><div className="draw-card"><div className="draw-card-top"><span>{isSpinning ? '正在翻牌' : result ? '今天的答案是' : '准备好了吗'}</span><Icon name="spark" size={16} /></div>{result ? <div className="draw-result" key={round} aria-live="polite"><div className="draw-result-art"><Image src={result.image} alt={`${result.name}菜品示意`} fill sizes="300px" /><small>AI 菜品示意</small></div><h2>{result.name}</h2><p>{canteenNames[result.canteenSlug]} · {result.stall}</p><div className="draw-result-meta"><strong>¥{result.price}</strong><small>{result.priceNote}</small>{result.tags.slice(0, 2).map((tag) => <span key={tag}>{tag}</span>)}</div><Link className="button button-secondary draw-detail-link" href={`/foods/${result.slug}/`}>看看这一口 <Icon name="arrow" size={15} /></Link></div> : <div className="draw-placeholder"><span className="draw-dice">✦</span><p>按一下，让今天的选择<br /><em>有一点命中注定。</em></p></div>}<button className="draw-button" onClick={draw} disabled={isSpinning || !eligibleFoods.length}>{isSpinning ? '摇一摇…' : result ? '再抽一次' : '开始抽签'} <Icon name="shuffle" size={17} /></button></div></section>
    <footer className="eat-footer"><span>本次候选 · {eligibleFoods.length} 种</span><span>菜品与价格是编辑参考，非实时菜单</span></footer>
  </div>
}

'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { Icon } from '@/components/icons'
import type { FoodItem } from '@/features/canteen/types'
import { cn } from '@/lib/cn'

type Mood = '随便' | '想吃饱' | '想吃辣' | '想省钱'

export function EatRandomizer({ foods, canteenNames }: { foods: FoodItem[]; canteenNames: Record<string, string> }) {
  const [mood, setMood] = useState<Mood>('随便')
  const [result, setResult] = useState<FoodItem | null>(null)
  const [isSpinning, setIsSpinning] = useState(false)
  const [round, setRound] = useState(0)

  const moodOptions: Array<{ label: Mood; emoji: string; description: string }> = [
    { label: '随便', emoji: '🎲', description: '交给今天的运气' },
    { label: '想吃饱', emoji: '🍚', description: '来一份正经主食' },
    { label: '想吃辣', emoji: '🌶️', description: '让味蕾醒一醒' },
    { label: '想省钱', emoji: '🪙', description: '预算友好不将就' },
  ]

  const eligibleFoods = useMemo(() => {
    if (mood === '想吃饱') return foods.filter((food) => food.category === '主食' || food.tags.includes('面饭'))
    if (mood === '想吃辣') return foods.filter((food) => food.tags.includes('辣口'))
    if (mood === '想省钱') return foods.filter((food) => food.price <= 10 || food.tags.includes('性价比'))
    return foods
  }, [foods, mood])

  const draw = () => {
    if (isSpinning) return
    setIsSpinning(true)
    window.setTimeout(() => {
      const next = eligibleFoods[Math.floor(Math.random() * eligibleFoods.length)] ?? foods[0]
      setResult(next)
      setRound((current) => current + 1)
      setIsSpinning(false)
    }, 780)
  }

  return (
    <div className="eat-page page-enter">
      <header className="eat-header"><div><span className="eyebrow orange-eyebrow"><span className="eyebrow-line" /> DECISION MAKER</span><h1>今天吃什么？<br /><em>别想了，抽一个。</em></h1><p>给今天的胃一点小小的随机性。<br />先选心情，剩下的交给同济食光。</p></div><div className="eat-header-badge"><span>NO.</span><strong>{String(round).padStart(2, '0')}</strong><small>today’s pick</small></div></header>

      <section className="mood-section"><div className="section-heading"><div><span className="eyebrow">STEP 01</span><h2>现在是什么心情</h2></div><span className="section-note">没有正确答案，只有想吃的答案</span></div><div className="mood-grid">{moodOptions.map((option) => <button className={cn('mood-card', mood === option.label && 'is-selected')} key={option.label} onClick={() => setMood(option.label)}><span className="mood-emoji">{option.emoji}</span><strong>{option.label}</strong><small>{option.description}</small>{mood === option.label && <span className="mood-check"><Icon name="check" size={13} /></span>}</button>)}</div></section>

      <section className={cn('draw-stage', isSpinning && 'is-spinning', result && 'has-result')}><div className="draw-orbit orbit-one" /><div className="draw-orbit orbit-two" /><div className="draw-card"><div className="draw-card-top"><span>{isSpinning ? '正在翻牌' : result ? '今天的答案是' : '准备好了吗'}</span><Icon name="spark" size={16} /></div>{result ? <><div className="draw-result-art" style={{ backgroundImage: `url(${result.image})` }}><span>{result.category === '早餐' ? '🥣' : result.category === '小吃' ? '🍢' : '🍱'}</span></div><h2>{result.name}</h2><p>{canteenNames[result.canteenSlug]} · {result.stall}</p><div className="draw-result-meta"><strong>¥{result.price}</strong>{result.tags.slice(0, 2).map((tag) => <span key={tag}>{tag}</span>)}</div><Link className="button button-secondary draw-detail-link" href={`/canteens/${result.canteenSlug}/`}>去看看 <Icon name="arrow" size={15} /></Link></> : <div className="draw-placeholder"><span className="draw-dice">✦</span><p>按一下，让今天的选择<br /><em>有一点命中注定。</em></p></div>}<button className="draw-button" onClick={draw} disabled={isSpinning}>{isSpinning ? '摇一摇…' : result ? '再抽一次' : '开始抽签'} <Icon name="shuffle" size={17} /></button></div></section>

      <footer className="eat-footer"><span>本次候选 · {eligibleFoods.length} 种</span><span>每一次随机，都可能遇见新欢</span></footer>
    </div>
  )
}

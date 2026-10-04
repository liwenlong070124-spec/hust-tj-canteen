'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/cn'
import { Icon } from './icons'

const navItems = [
  { href: '/', label: '图鉴', hint: '探索吃什么', icon: 'book' as const },
  { href: '/eat/', label: '吃什么', hint: '让灵感发生', icon: 'spark' as const },
  { href: '/profile/', label: '我的', hint: '记录你的口味', icon: 'user' as const },
]

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const section = pathname.split('/')[1]
  const active = section === 'saved' ? '/profile/' : ['canteens', 'foods'].includes(section) || pathname === '/' ? '/' : `/${section}/`

  return (
    <div className="app-frame">
      <aside className="desktop-rail" aria-label="主导航">
        <Link className="brand-lockup" href="/" aria-label="同济食光首页">
          <span className="brand-mark"><Icon name="utensils" size={21} strokeWidth={2} /></span>
          <span>
            <strong>同济食光</strong>
            <small>HUST · TJMU</small>
          </span>
        </Link>

        <div className="rail-intro">
          <span className="eyebrow">CANTEEN ATLAS</span>
          <p>把每一顿饭，<br /><em>吃成一点小确幸。</em></p>
        </div>

        <nav className="rail-nav">
          {navItems.map((item) => {
            const isActive = active === item.href
            return (
              <Link className={cn('rail-link', isActive && 'is-active')} href={item.href} key={item.href} aria-current={isActive ? 'page' : undefined}>
                <span className="rail-link-icon"><Icon name={item.icon} size={19} /></span>
                <span><strong>{item.label}</strong><small>{item.hint}</small></span>
                {isActive && <span className="rail-dot" />}
              </Link>
            )
          })}
        </nav>

        <div className="rail-bottom">
          <Link className="rail-mini-link" href="/playground/">
            <span className="status-dot" /> 设计 Playground
          </Link>
          <p>v0.2 · 本地注册表<br />一起把同济的味道记下来</p>
        </div>
      </aside>

      <main className="main-column">
        <div className="page-topline">
          <span>华中科技大学 · 同济医学院校区</span>
          <span className="topline-status"><span className="status-dot" /> 数据持续更新中</span>
        </div>
        {children}
      </main>

      <nav className="mobile-nav" aria-label="移动端主导航">
        {navItems.map((item) => {
          const isActive = active === item.href
          return <Link className={cn('mobile-nav-link', isActive && 'is-active')} href={item.href} key={item.href} aria-current={isActive ? 'page' : undefined}>
            <Icon name={item.icon} size={20} />
            <span>{item.label}</span>
          </Link>
        })}
      </nav>
    </div>
  )
}

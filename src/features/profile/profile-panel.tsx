'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Icon } from '@/components/icons'

type Profile = { nickname: string; bio: string; favorite: string }
const initialProfile: Profile = { nickname: '同济饭搭子', bio: '今天也要好好吃饭。', favorite: '热干面 / 小炒 / 甜口' }

export function ProfilePanel() {
  const [profile, setProfile] = useState<Profile>(initialProfile)
  const [savedCount, setSavedCount] = useState(0)
  const [editing, setEditing] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const stored = window.localStorage.getItem('tj-profile')
      if (stored) setProfile(JSON.parse(stored) as Profile)
      const foods = window.localStorage.getItem('tj-food-saved')
      if (foods) setSavedCount((JSON.parse(foods) as string[]).length)
    }, 0)
    return () => window.clearTimeout(timer)
  }, [])

  const update = (key: keyof Profile, value: string) => setProfile((current) => ({ ...current, [key]: value }))
  const saveProfile = () => {
    window.localStorage.setItem('tj-profile', JSON.stringify(profile))
    setEditing(false)
    setSaved(true)
    window.setTimeout(() => setSaved(false), 1800)
  }

  const addKeyword = () => {
    const keyword = window.prompt('想记录哪一个口味关键词？')?.trim()
    if (keyword && !profile.favorite.includes(keyword)) update('favorite', `${profile.favorite} / ${keyword}`)
  }

  return (
    <div className="profile-page page-enter">
      <header className="profile-header"><div><span className="eyebrow orange-eyebrow"><span className="eyebrow-line" /> YOUR TABLE</span><h1>我的饭桌，<br /><em>由我来记录。</em></h1><p>没有登录，没有复杂设置。<br />只是把属于你的同济味道留在这里。</p></div><div className="profile-stamp">TJ<br /><span>eat well</span></div></header>

      <section className="profile-card"><div className="profile-card-top"><div className="profile-avatar">🍊</div><div className="profile-id"><span className="eyebrow">LOCAL PROFILE</span><h2>{profile.nickname}</h2><p>{profile.bio}</p></div><button className="icon-button" onClick={() => setEditing((current) => !current)} aria-label={editing ? '关闭编辑' : '编辑资料'}><Icon name={editing ? 'check' : 'plus'} size={18} /></button></div>{editing ? <div className="profile-form"><label>昵称<input value={profile.nickname} onChange={(event) => update('nickname', event.target.value)} maxLength={18} /></label><label>一句话介绍<input value={profile.bio} onChange={(event) => update('bio', event.target.value)} maxLength={32} /></label><label>我的口味关键词<input value={profile.favorite} onChange={(event) => update('favorite', event.target.value)} maxLength={40} /></label><button className="button button-primary" onClick={saveProfile}>{saved ? '已保存' : '保存这张饭桌'} <Icon name={saved ? 'check' : 'arrow'} size={15} /></button></div> : <div className="profile-stats"><div><strong>{savedCount}</strong><span>收藏菜品</span></div><div><strong>03</strong><span>常去食堂</span></div><div><strong>∞</strong><span>好好吃饭</span></div></div>}</section>

      <section className="profile-grid"><div className="profile-preference"><div className="section-heading"><div><span className="eyebrow">TASTE PROFILE</span><h2>我的口味关键词</h2></div><Icon name="spark" size={18} /></div><div className="preference-cloud">{profile.favorite.split(/[ /、,，]+/).filter(Boolean).map((item) => <span key={item}>{item}</span>)}<button onClick={addKeyword} aria-label="添加口味关键词"><Icon name="plus" size={15} /></button></div><p className="muted-note">这些信息只保存在当前浏览器，不会上传。</p></div><div className="profile-open"><span className="eyebrow">OPEN SOURCE NOTE</span><h2>这份图鉴，<br />欢迎一起补全。</h2><p>如果你知道一个好窗口、一个新菜单，欢迎在仓库里提交修改。</p><a href="https://github.com/liwenlong070124-spec/hust-tj-canteen" target="_blank" rel="noreferrer" className="text-link">查看项目仓库 <Icon name="external" size={14} /></a></div></section>

      <section className="notice-card"><div className="notice-icon"><Icon name="book" size={19} /></div><div><span className="eyebrow">小公告 · 01</span><h3>价格和营业时间，记得以现场为准</h3><p>这是一个由学生视角整理的本地索引。我们会持续补充公开信息，也欢迎你把最新变化告诉我们。</p></div><Link href="/playground/" className="button button-quiet">了解规范 <Icon name="arrow" size={15} /></Link></section>
    </div>
  )
}

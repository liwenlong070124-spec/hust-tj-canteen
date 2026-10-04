'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Icon } from '@/components/icons'
import { appendKeyword, initialProfile, keywords, readProfile, readSavedCount, type Profile } from './model'

export function ProfilePanel() {
  const [profile, setProfile] = useState<Profile>(initialProfile)
  const [draft, setDraft] = useState<Profile>(initialProfile)
  const [savedCount, setSavedCount] = useState(0)
  const [editing, setEditing] = useState(false)
  const [addingKeyword, setAddingKeyword] = useState(false)
  const [keyword, setKeyword] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const stored = readProfile(window.localStorage.getItem('tj-profile'))
        setProfile(stored)
        setDraft(stored)
        setSavedCount(readSavedCount(window.localStorage.getItem('tj-food-saved')))
      } catch {
        setMessage('浏览器存储不可用，暂时无法保存资料。')
      }
    }, 0)
    return () => window.clearTimeout(timer)
  }, [])

  const update = (key: keyof Profile, value: string) => setDraft((current) => ({ ...current, [key]: value }))
  const persist = (next: Profile): boolean => {
    try {
      window.localStorage.setItem('tj-profile', JSON.stringify(next))
      setProfile(next)
      setDraft(next)
      setMessage('已保存在当前浏览器。')
      return true
    } catch {
      setMessage('保存失败，请检查浏览器是否允许本地存储。')
      return false
    }
  }
  const saveProfile = () => {
    if (persist(draft)) setEditing(false)
  }
  const toggleEditing = () => {
    setDraft(profile)
    setEditing((current) => !current)
    setAddingKeyword(false)
    setMessage('')
  }
  const addKeyword = () => {
    const next = appendKeyword(profile, keyword)
    if (next.error) {
      setMessage(next.error)
    } else if (persist(next.profile)) {
      setAddingKeyword(false)
      setKeyword('')
    }
  }

  return (
    <div className="profile-page page-enter">
      <header className="profile-header"><div><span className="eyebrow orange-eyebrow"><span className="eyebrow-line" /> YOUR TABLE</span><h1>我的饭桌，<br /><em>由我来记录。</em></h1><p>没有登录，没有复杂设置。<br />只是把属于你的同济味道留在这里。</p></div><div className="profile-stamp">TJ<br /><span>eat well</span></div></header>

      <section className="profile-card">
        <div className="profile-card-top">
          <div className="profile-avatar">🍊</div>
          <div className="profile-id"><span className="eyebrow">LOCAL PROFILE</span><h2>{profile.nickname}</h2><p>{profile.bio}</p></div>
          <button className="icon-button" onClick={toggleEditing} aria-label={editing ? '取消编辑' : '编辑资料'} aria-expanded={editing} aria-controls="profile-editor"><Icon name={editing ? 'close' : 'plus'} size={18} /></button>
        </div>
        {editing ? (
          <form id="profile-editor" className="profile-form" onSubmit={(event) => { event.preventDefault(); saveProfile() }}>
            <label>昵称<input value={draft.nickname} onChange={(event) => update('nickname', event.target.value)} maxLength={18} required /></label>
            <label>一句话介绍<input value={draft.bio} onChange={(event) => update('bio', event.target.value)} maxLength={32} /></label>
            <label>我的口味关键词<input value={draft.favorite} onChange={(event) => update('favorite', event.target.value)} maxLength={40} /></label>
            <button className="button button-primary" type="submit">保存这张饭桌 <Icon name="arrow" size={15} /></button>
          </form>
        ) : (
          <div className="profile-stats"><div><strong>{savedCount}</strong><span>收藏菜品</span></div><div><strong>03</strong><span>常去食堂</span></div><div><strong>∞</strong><span>好好吃饭</span></div></div>
        )}
      </section>

      <section className="profile-grid">
        <div className="profile-preference">
          <div className="section-heading"><div><span className="eyebrow">TASTE PROFILE</span><h2>我的口味关键词</h2></div><Icon name="spark" size={18} /></div>
          <div className="preference-cloud">
            {keywords(profile.favorite).map((item) => <span key={item}>{item}</span>)}
            <button onClick={() => { setAddingKeyword(true); setEditing(false); setMessage('') }} aria-label="添加口味关键词" aria-expanded={addingKeyword} aria-controls="keyword-editor"><Icon name="plus" size={15} /></button>
          </div>
          {addingKeyword && (
            <form id="keyword-editor" className="keyword-form" onSubmit={(event) => { event.preventDefault(); addKeyword() }}>
              <label htmlFor="keyword-input">新增口味</label>
              <input id="keyword-input" value={keyword} onChange={(event) => setKeyword(event.target.value)} maxLength={20} placeholder="例如：酸辣" autoFocus required />
              <div><button className="button button-primary" type="submit">保存口味</button><button className="button button-quiet" type="button" onClick={() => { setAddingKeyword(false); setKeyword(''); setMessage('') }}>取消</button></div>
            </form>
          )}
          <p className="profile-feedback" role="status">{message}</p>
          <p className="muted-note">这些信息只保存在当前浏览器，不会上传。</p>
        </div>
        <div className="profile-open"><span className="eyebrow">OPEN SOURCE NOTE</span><h2>这份图鉴，<br />欢迎一起补全。</h2><p>如果你知道一个好窗口、一个新菜单，欢迎在仓库里提交修改。</p><a href="https://github.com/liwenlong070124-spec/hust-tj-canteen" target="_blank" rel="noreferrer" className="text-link">查看项目仓库 <Icon name="external" size={14} /></a></div>
      </section>

      <section className="notice-card"><div className="notice-icon"><Icon name="book" size={19} /></div><div><span className="eyebrow">小公告 · 01</span><h3>价格和营业时间，记得以现场为准</h3><p>这是一个由学生视角整理的本地索引。我们会持续补充公开信息，也欢迎你把最新变化告诉我们。</p></div><Link href="/playground/" className="button button-quiet">了解规范 <Icon name="arrow" size={15} /></Link></section>
    </div>
  )
}

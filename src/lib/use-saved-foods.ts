'use client'

import { useEffect, useState } from 'react'

export function useSavedFoods() {
  const [saved, setSaved] = useState<string[]>([])
  const [storageError, setStorageError] = useState('')

  useEffect(() => {
    const read = () => {
      try {
        const data: unknown = JSON.parse(localStorage.getItem('tj-food-saved') ?? '[]')
        setSaved(Array.isArray(data) ? [...new Set(data.filter((item): item is string => typeof item === 'string'))] : [])
      } catch { setSaved([]) }
    }
    const timer = window.setTimeout(read, 0)
    window.addEventListener('storage', read)
    return () => { window.clearTimeout(timer); window.removeEventListener('storage', read) }
  }, [])

  const toggleSaved = (slug: string) => {
    const next = saved.includes(slug) ? saved.filter((item) => item !== slug) : [...saved, slug]
    try {
      localStorage.setItem('tj-food-saved', JSON.stringify(next))
      setSaved(next)
      setStorageError('')
    } catch { setStorageError('收藏未保存，请允许浏览器使用本地存储。') }
  }
  return { saved, toggleSaved, storageError }
}

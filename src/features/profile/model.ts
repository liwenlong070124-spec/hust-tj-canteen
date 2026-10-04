export type Profile = { nickname: string; bio: string; favorite: string }

export const initialProfile: Profile = {
  nickname: '同济饭搭子', bio: '今天也要好好吃饭。', favorite: '热干面 / 小炒 / 甜口',
}

export function keywords(value: string): string[] {
  return [...new Set(value.split(/[ /、,，]+/).filter(Boolean))]
}

export function readProfile(raw: string | null): Profile {
  try {
    const value: unknown = JSON.parse(raw ?? 'null')
    if (!value || typeof value !== 'object') return initialProfile
    const candidate = value as Record<string, unknown>
    if (typeof candidate.nickname !== 'string' || typeof candidate.bio !== 'string' || typeof candidate.favorite !== 'string') return initialProfile
    return { nickname: candidate.nickname.slice(0, 18), bio: candidate.bio.slice(0, 32), favorite: candidate.favorite.slice(0, 40) }
  } catch {
    return initialProfile
  }
}

export function readSavedCount(raw: string | null): number {
  try {
    const value: unknown = JSON.parse(raw ?? 'null')
    return Array.isArray(value) ? new Set(value.filter((item) => typeof item === 'string')).size : 0
  } catch {
    return 0
  }
}

export function appendKeyword(profile: Profile, input: string): { profile: Profile; error?: string } {
  const next = [...keywords(profile.favorite), ...keywords(input)]
  const unique = [...new Set(next)]
  if (!keywords(input).length) return { profile, error: '请先填写一个口味关键词。' }
  if (unique.length === keywords(profile.favorite).length) return { profile, error: '这个口味已经记在饭桌上了。' }
  const favorite = unique.join(' / ')
  if (favorite.length > 40) return { profile, error: '口味关键词总长度不能超过 40 字，请在编辑资料中精简。' }
  return { profile: { ...profile, favorite } }
}

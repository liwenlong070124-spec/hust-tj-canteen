import type { Metadata } from 'next'
import './globals.css'
import { AppShell } from '@/components/app-shell'

export const metadata: Metadata = {
  title: '同济食光 · HUST TJMU Canteen Atlas',
  description: '华中科技大学同济医学院校区的轻量美食图鉴。',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body><AppShell>{children}</AppShell></body></html>
}

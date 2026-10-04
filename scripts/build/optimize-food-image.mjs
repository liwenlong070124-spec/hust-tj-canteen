// Format/size optimization only; never changes the image subject or composition.
import { createRequire } from 'node:module'
import { mkdir } from 'node:fs/promises'
import path from 'node:path'

const require = createRequire(import.meta.url)
const nextRequire = createRequire(require.resolve('next/package.json'))
const sharp = nextRequire('sharp')
const [source, slug] = process.argv.slice(2)
if (!source || !slug || !/^[a-z0-9-]+$/.test(slug)) throw new Error('Usage: node scripts/build/optimize-food-image.mjs source.png food-slug')
const folder = path.resolve('public/images/foods')
await mkdir(folder, { recursive: true })
const output = path.join(folder, `${slug}.webp`)
await sharp(source).resize({ width: 960, withoutEnlargement: true }).webp({ quality: 82 }).toFile(output)
console.log(output)

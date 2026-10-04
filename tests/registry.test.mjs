import { readFile, stat } from 'node:fs/promises'
import { test } from 'node:test'
import assert from 'node:assert/strict'
import ts from 'typescript'

const source = await readFile(new URL('../src/features/canteen/registry.ts', import.meta.url), 'utf8')
const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ES2022, target: ts.ScriptTarget.ES2022 } })
const { foods, canteens } = await import(`data:text/javascript;base64,${Buffer.from(outputText).toString('base64')}`)

test('six sourced venues are separate from historical aliases', () => {
  assert.deepEqual(canteens.filter((item) => item.status === 'verified').map((item) => item.name), ['同沁园', '丁香园', '杏林园', '济沁园', '同德园', '同华园'])
  assert.equal(canteens.filter((item) => item.status === 'historical').length, 2)
  assert.equal(new Set(canteens.map((item) => item.slug)).size, canteens.length)
  for (const canteen of canteens) {
    assert.ok(canteen.sourceUrls.length)
    assert.ok(canteen.sourceNote)
    assert.ok(canteen.addressHint.includes('待核验'))
    assert.ok(canteen.openTime.includes('待核验'))
  }
})

test('every food has one corresponding local, bounded illustrative asset', async () => {
  assert.equal(new Set(foods.map((item) => item.image)).size, foods.length)
  for (const food of foods) {
    assert.equal(food.image, `/canteen/images/foods/${food.slug}.webp`)
    assert.ok(food.imageNote.includes('非食堂实拍'))
    assert.equal(food.priceNote, '参考价')
    assert.ok(canteens.some((item) => item.slug === food.canteenSlug))
    const file = await stat(new URL(`../public/images/foods/${food.slug}.webp`, import.meta.url))
    assert.ok(file.size < 250_000, `${food.slug}: image too large`)
  }
})

import { readFile } from 'node:fs/promises'
import { test } from 'node:test'
import assert from 'node:assert/strict'
import ts from 'typescript'

const source = await readFile(new URL('../src/features/eat/selection.ts', import.meta.url), 'utf8')
const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ES2022, target: ts.ScriptTarget.ES2022 } })
const { getEligibleFoods } = await import(`data:text/javascript;base64,${Buffer.from(outputText).toString('base64')}`)
const sample = [
  { slug: 'cheap', price: 10, category: '主食', tags: [] },
  { slug: 'expensive-value-tag', price: 12, category: '主食', tags: ['性价比'] },
  { slug: 'spicy', price: 15, category: '小吃', tags: ['辣口'] },
  { slug: 'breakfast', price: 5, category: '早餐', tags: ['面饭'] },
]

test('budget recommendation is a hard price ceiling, not a subjective tag', () => {
  assert.deepEqual(getEligibleFoods(sample, '想省钱').map((item) => item.slug), ['cheap', 'breakfast'])
})

test('mood filters do not silently fall back to incompatible foods', () => {
  assert.deepEqual(getEligibleFoods(sample, '想吃辣').map((item) => item.slug), ['spicy'])
  assert.deepEqual(getEligibleFoods(sample, '想吃饱').map((item) => item.slug), ['cheap', 'expensive-value-tag', 'breakfast'])
  assert.deepEqual(getEligibleFoods(sample, '随便'), sample)
  assert.deepEqual(getEligibleFoods([], '想吃辣'), [])
  assert.equal(sample.length, 4)
})

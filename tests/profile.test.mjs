import { readFile } from 'node:fs/promises'
import { test } from 'node:test'
import assert from 'node:assert/strict'
import ts from 'typescript'

// Compile the dependency-free TS model in memory; no extra test runtime required.
const source = await readFile(new URL('../src/features/profile/model.ts', import.meta.url), 'utf8')
const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ES2022, target: ts.ScriptTarget.ES2022 } })
const { initialProfile, readProfile, readSavedCount, keywords, appendKeyword } = await import(`data:text/javascript;base64,${Buffer.from(outputText).toString('base64')}`)

test('missing, corrupt, or incompatible storage falls back safely', () => {
  for (const value of [null, '{', 'null', '[]', '{"nickname":12}', '{"favorite":null}']) {
    assert.deepEqual(readProfile(value), initialProfile)
  }
  assert.equal(readSavedCount('{'), 0)
  assert.equal(readSavedCount('"not-an-array"'), 0)
  assert.equal(readSavedCount('["a","a",4,"b"]'), 2)
})

test('saved profile round-trips and respects input bounds', () => {
  const profile = { nickname: '饭搭子', bio: '认真吃饭', favorite: '酸辣' }
  assert.deepEqual(readProfile(JSON.stringify(profile)), profile)
  assert.equal(readProfile(JSON.stringify({ ...profile, nickname: '长'.repeat(50) })).nickname.length, 18)
})

test('keyword matching is exact, normalized, unique and persistent', () => {
  assert.deepEqual(keywords('辣口 / 辣口、清淡，面饭'), ['辣口', '清淡', '面饭'])
  const profile = { ...initialProfile, favorite: '酸辣' }
  const added = appendKeyword(profile, '辣')
  assert.equal(added.profile.favorite, '酸辣 / 辣')
  assert.deepEqual(readProfile(JSON.stringify(added.profile)), added.profile)
  assert.ok(appendKeyword(added.profile, '辣').error)
  assert.ok(appendKeyword(profile, ' ').error)
  assert.ok(appendKeyword({ ...profile, favorite: '长'.repeat(40) }, '清淡').error)
})

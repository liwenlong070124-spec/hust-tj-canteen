# 数据注册表说明

> Created: 2026-10-04
> Updated: 2026-10-04
> Status: accepted for v0.2

## 背景

当前版本不接入云数据库，所有食堂、窗口、菜品和来源信息都维护在 `src/features/canteen/registry.ts`。这样可以让站点保持静态导出，也便于后续通过一次代码修改完成校区信息更新。

## 数据边界

- 食堂名称、校区服务和公开活动线索：优先采用同济医学院、华中科技大学新闻网等公开页面。
- 公开名录：2024-04-18 采购代理公告列出杏林园、丁香园、同沁园、同德园、济沁园、同华园；学院 2024–2026 报道用于补充佐证。不是实时开门列表。
- 菜品与窗口关联：没有经核实的现售菜单，全部按编辑示例表达；同沁园一楼蒸菜、三楼餐厅等公开线索单独标注。
- 价格保留参考口径；不再给出推测营业时间、精确位置和步行距离，没有依据时直接标记待核验。
- `status: 'verified'` 表示名称有依据，`historical` 表示历史称呼/待核验线索。清真旧称不与同德园重复计数，也不推断当前饮食保障。
- 图片：11 张一一对应的本地 AI 菜品示意图，不是食堂实拍；详情与卡片均展示说明。生成提示词见 [素材说明](../design/food-assets-v2.md)。
- 建筑插画是代码绘制的通用示意，不表示真实立面或地理坐标；定位使用地图名称搜索，图谱提供官方校园地图入口。

## 添加一个食堂

1. 在 `canteens` 添加唯一 `slug`、展示文案、`status`、`sourceNote`、地址提示和来源链接，使用 `venue()` 辅助函数可继承待核验默认值。
2. 使用 `stalls` 描述楼层/窗口、特色、参考价位与时段。
3. 在 `foods` 中通过 `canteenSlug` 关联菜品。
4. 为菜单价格和变化频繁的信息保留“参考价”口径。
5. 执行 `pnpm lint && pnpm tsc && pnpm build && pnpm test`，更新名录数量测试。新 slug 会生成食堂/菜品静态详情页。

## 添加一个菜品

```ts
{
  slug: 'new-food',
  name: '菜品名称',
  canteenSlug: 'tongqin-yuan',
  stall: '一楼快餐',
  description: '一句适合卡片展示的描述。',
  price: 10,
  priceNote: '参考价',
  tags: ['性价比'],
  category: '主食',
  image: '/canteen/images/foods/new-food.webp',
  imageNote: 'AI 菜品示意，非食堂实拍',
  accent: 'orange',
  sourceUrl: 'https://example.com/public-source',
}
```

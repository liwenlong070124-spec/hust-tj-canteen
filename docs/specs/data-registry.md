# 数据注册表说明

> Created: 2026-10-04
> Updated: 2026-10-04
> Status: accepted for v0.1

## 背景

当前版本不接入云数据库，所有食堂、窗口、菜品和来源信息都维护在 `src/features/canteen/registry.ts`。这样可以让站点保持静态导出，也便于后续通过一次代码修改完成校区信息更新。

## 数据边界

- 食堂名称、校区服务和公开活动线索：优先采用同济医学院、华中科技大学新闻网等公开页面。
- 菜品名称和窗口组织：以公开推荐菜单/校园指南为线索，由项目维护者整理成便于浏览的编辑版。
- 价格、营业时间、步行时间：v0.1 统一标为参考信息，不代表学校或窗口的官方定价；现场公告优先。
- 外部图片：使用 Unsplash 固定图片地址作为视觉占位，后续可替换为已获授权的校园实拍或本地压缩素材。

## 添加一个食堂

1. 在 `canteens` 添加唯一 `slug`、展示文案、地址提示和来源链接。
2. 使用 `stalls` 描述楼层/窗口、特色、参考价位与时段。
3. 在 `foods` 中通过 `canteenSlug` 关联菜品。
4. 为菜单价格和变化频繁的信息保留“参考价”口径。
5. 执行 `pnpm lint && pnpm tsc && pnpm build`。

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
  image: image('photo-id'),
  accent: 'orange',
  sourceUrl: 'https://example.com/public-source',
}
```


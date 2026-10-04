# v0.2 菜品素材

使用内置 imagegen 工具分别生成 11 张素材，不是实拍。最终产物在 `public/images/foods/<slug>.webp`，960px 宽、WebP quality 82；仅进行尺寸/格式优化，没有改变菜品内容。卡片使用懒加载，详情首图优先加载。每张图在界面中明确标注“AI 菜品示意”。

## 共用生成提示词

Use case: photorealistic-natural. Asset type: square food catalogue photo for a Chinese university canteen atlas. Subject: <见下表>. Single meal only. Appetizing believable everyday canteen portions, close-up three-quarter overhead angle, centered entire dish, warm pale cream tabletop, soft natural daylight, orange accents, clean editorial photography, no people, no text, no logos, no watermark. This is a clearly labeled illustrative food photo, not a real campus photo. Square composition, 768px if possible.

## 各图 Subject

- `you-po-mian.webp`：Chinese Shaanxi oil-splashed wide flat noodles, chili flakes, chopped scallions and garlic on top, white bowl
- `huang-men-ji.webp`：Chinese huangmenji braised chicken chunks with potatoes green peppers in rich golden-brown sauce, black clay pot and small white rice bowl
- `re-gan-mian.webp`：Wuhan reganmian dry hot noodles coated in thick sesame paste, finely chopped pickled radish and scallions, no broth, white ceramic bowl
- `zi-xuan-pei-cai.webp`：Chinese canteen vegetable rice meal in a divided stainless steel tray, steamed rice, broccoli, stir-fried cabbage and mapo tofu
- `tang-mian.webp`：Chinese clear broth thin wheat noodle soup with green bok choy, scallions and a soft boiled egg, white ceramic bowl
- `mi-la-ma-la-tang.webp`：Chinese malatang spicy red broth soup with tofu puffs leafy vegetables lotus root slices mushrooms and fish balls, large white bowl
- `niu-rou-mian.webp`：Chinese beef noodle soup with thin hand-pulled noodles, sliced braised beef, coriander and clear amber broth, white ceramic bowl, no pork
- `guo-qiao-mi-xian.webp`：Chinese rice noodles soup in a black clay pot, white rice noodles with tomato mushrooms and leafy greens
- `dou-jiang-bao-zi.webp`：Chinese breakfast of fluffy steamed pork buns in a bamboo steamer alongside a plain ceramic cup of soy milk
- `chao-fan.webp`：Chinese golden egg fried rice with diced carrots green peas and chopped scallions in white bowl
- `jiang-xiang-ji-pai.webp`：Chinese crispy sliced boneless fried chicken cutlet with glossy soy glaze, on a small white plate

## 后续替换

使用已获授权、能核实对应菜品的现场图片，记录拍摄日期和授权；更新 `registry.ts` 的 `image` 与 `imageNote`。不要用未核实的餐厅、披萨或通用食物图片冒充食堂实景。

压缩命令：`node scripts/build/optimize-food-image.mjs source.png food-slug`。原始生成图保留在 Codex 默认生成目录，本项目不依赖那些机器本地路径。

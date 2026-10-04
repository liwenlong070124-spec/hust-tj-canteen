import type { Canteen, FoodItem } from './types'

const image = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=86`

export const canteens: Canteen[] = [
  {
    slug: 'tongqin-yuan',
    name: '同沁园',
    eyebrow: '日常主场 · 三餐稳定',
    description: '熟悉的楼下烟火气，适合把一日三餐安排得稳稳当当。',
    addressHint: '学子苑生活区一带 · 同沁园北侧',
    walkingTime: '从校门步行约 8 分钟',
    openTime: '约 06:30 — 21:30',
    tags: ['窗口多', '日常', '性价比'],
    image: image('photo-1515003197210-e0cd71810b5f'),
    mapUrl: 'https://uri.amap.com/search?keyword=华中科技大学同济医学院同沁园',
    sourceUrls: [
      'https://www.tjmu.edu.cn/info/1106/12102.htm',
      'https://news.hust.edu.cn/info/1004/34762.htm',
    ],
    stalls: [
      { name: '一楼快餐', floor: '1F', specialties: ['自选菜', '时蔬', '蒸菜'], priceRange: '¥5–15', openTime: '06:30–21:30' },
      { name: '面点窗口', floor: '1F', specialties: ['热干面', '汤面', '包子'], priceRange: '¥3–12', openTime: '06:30–20:30' },
      { name: '同沁小炒', floor: '2F', specialties: ['小炒', '套餐', '汤饭'], priceRange: '¥12–28', openTime: '10:30–20:30' },
    ],
  },
  {
    slug: 'dingxiang-yuan',
    name: '丁香园',
    eyebrow: '选择丰富 · 下课去吃',
    description: '从麻辣烫到盖饭，适合在选择困难时沿着一楼慢慢逛一圈。',
    addressHint: '学子苑生活区中段 · 同沁园与丁香园之间有连接小路',
    walkingTime: '从同沁园步行约 3 分钟',
    openTime: '约 06:20 — 21:30',
    tags: ['选择多', '面饭', '夜宵'],
    image: image('photo-1517248135467-4c7edcad34c4'),
    mapUrl: 'https://uri.amap.com/search?keyword=华中科技大学同济医学院丁香园食堂',
    sourceUrls: [
      'https://www.tjmu.edu.cn/info/1106/12102.htm',
      'https://m.dianping.com/shop/93307673?msource=applemaps',
      'https://www.gbpxw.com/show/18444.html',
    ],
    stalls: [
      { name: '风味自选', floor: '1F', specialties: ['自选餐', '蒸菜', '小吃'], priceRange: '¥6–18', openTime: '06:20–21:30' },
      { name: '面食档', floor: '1F', specialties: ['油泼面', '臊子面', '米线'], priceRange: '¥8–18', openTime: '10:00–21:00' },
      { name: '二楼盖饭', floor: '2F', specialties: ['黄焖鸡', '水煮肉片', '铁板饭'], priceRange: '¥14–28', openTime: '10:30–20:30' },
    ],
  },
  {
    slug: 'xinglin-yuan',
    name: '杏林园',
    eyebrow: '医学生的熟悉坐标',
    description: '把“杏林”二字的温度留在饭点里，适合快速吃完再回图书馆。',
    addressHint: '医学院校区内 · 靠近教学与科研生活区',
    walkingTime: '从校门步行约 10 分钟',
    openTime: '约 07:00 — 21:00',
    tags: ['快餐', '一人食', '午间友好'],
    image: image('photo-1504674900247-0877df9cc836'),
    mapUrl: 'https://uri.amap.com/search?keyword=华中科技大学同济医学院杏林园',
    sourceUrls: ['https://www.tjmu.edu.cn/info/1106/11908.htm'],
    stalls: [
      { name: '杏林自选', floor: '1F', specialties: ['套餐', '蒸菜', '时蔬'], priceRange: '¥6–18', openTime: '07:00–21:00' },
      { name: '能量补给站', floor: '1F', specialties: ['鸡排', '小吃', '饮品'], priceRange: '¥5–20', openTime: '10:00–20:30' },
    ],
  },
  {
    slug: 'jiqin-yuan',
    name: '济沁园',
    eyebrow: '清晨第一口热气',
    description: '想吃一口热乎乎的早餐，就从这里开始一天。',
    addressHint: '同济校区生活区内 · 济沁园食堂',
    walkingTime: '从生活区步行约 4 分钟',
    openTime: '约 06:30 — 20:30',
    tags: ['早餐', '清淡', '早八友好'],
    image: image('photo-1498837167922-ddd27525d352'),
    mapUrl: 'https://uri.amap.com/search?keyword=华中科技大学同济医学院济沁园',
    sourceUrls: ['https://www.tjmu.edu.cn/info/1106/12102.htm'],
    stalls: [
      { name: '早餐档', floor: '1F', specialties: ['热干面', '豆浆', '包子'], priceRange: '¥2–10', openTime: '06:30–10:00' },
      { name: '轻食窗口', floor: '1F', specialties: ['汤粉', '粥', '蒸点'], priceRange: '¥4–15', openTime: '07:00–20:30' },
    ],
  },
  {
    slug: 'yixi-wangxi-meishi',
    name: '忆往昔美食城',
    eyebrow: '小吃街模式 · 逛着吃',
    description: '把选择困难变成逛吃路线，适合和朋友一起边看边决定。',
    addressHint: '航空路校区生活配套区 · 以公开校园指南线索为准',
    walkingTime: '从同沁园步行约 6 分钟',
    openTime: '约 10:00 — 22:00',
    tags: ['小吃', '朋友聚餐', '晚间'],
    image: image('photo-1565299624946-b28f40a0ae38'),
    mapUrl: 'https://uri.amap.com/search?keyword=华中科技大学同济医学院美食城',
    sourceUrls: ['https://www.sohu.com/a/238958838_673149'],
    stalls: [
      { name: '风味小吃街', floor: '1F', specialties: ['水饺', '麻辣烫', '鸡排'], priceRange: '¥8–25', openTime: '10:00–22:00' },
      { name: '朋友小聚', floor: '1F', specialties: ['盖饭', '小炒', '饮品'], priceRange: '¥12–35', openTime: '10:30–21:30' },
    ],
  },
  {
    slug: 'qingzhen-shitang',
    name: '清真食堂',
    eyebrow: '安心选择 · 风味鲜明',
    description: '单独收好一份清真窗口索引，方便有明确饮食需求的同学快速找到。',
    addressHint: '同济校区生活区附近 · 以现场标识为准',
    walkingTime: '从生活区步行约 7 分钟',
    openTime: '约 07:00 — 21:00',
    tags: ['清真', '面饭', '风味'],
    image: image('photo-1513104890138-7c749659a591'),
    mapUrl: 'https://uri.amap.com/search?keyword=华中科技大学同济医学院清真食堂',
    sourceUrls: ['https://www.sohu.com/a/238958838_673149'],
    stalls: [
      { name: '清真面饭', floor: '1F', specialties: ['牛肉面', '大盘鸡', '拌饭'], priceRange: '¥8–25', openTime: '07:00–21:00' },
    ],
  },
]

export const foods: FoodItem[] = [
  { slug: 'you-po-mian', name: '油泼面', canteenSlug: 'dingxiang-yuan', stall: '面食档', description: '面条筋道，辣油和葱蒜把香气一层层推上来。', price: 9, priceNote: '参考价', tags: ['人气', '面饭', '辣口'], category: '主食', image: image('photo-1569718212165-3a8278d5f624'), accent: 'saffron', featured: true, sourceUrl: 'https://m.dianping.com/shop/93307673?msource=applemaps' },
  { slug: 'huang-men-ji', name: '黄焖鸡米饭', canteenSlug: 'dingxiang-yuan', stall: '二楼盖饭', description: '一勺热乎的酱汁拌开米饭，适合需要快速回血的午间。', price: 16, priceNote: '参考价', tags: ['人气', '性价比', '面饭'], category: '主食', image: image('photo-1603133872878-684f208fb84b'), accent: 'tomato', featured: true, sourceUrl: 'https://m.dianping.com/shop/93307673?msource=applemaps' },
  { slug: 're-gan-mian', name: '热干面', canteenSlug: 'jiqin-yuan', stall: '早餐档', description: '芝麻酱香和碱面口感，是赶早八时最稳的选择。', price: 5, priceNote: '参考价', tags: ['早八友好', '性价比', '面饭'], category: '早餐', image: image('photo-1569718212165-3a8278d5f624'), accent: 'cream', featured: true, sourceUrl: 'https://www.tjmu.edu.cn/info/1106/12102.htm' },
  { slug: 'zi-xuan-pei-cai', name: '时蔬自选', canteenSlug: 'tongqin-yuan', stall: '一楼快餐', description: '想吃清爽一点就自己配，米饭、蔬菜和荤菜都能灵活组合。', price: 11, priceNote: '参考价', tags: ['性价比', '清淡'], category: '主食', image: image('photo-1547592180-85f173990554f'), accent: 'leaf', featured: true, sourceUrl: 'https://www.tjmu.edu.cn/info/1106/12102.htm' },
  { slug: 'tang-mian', name: '鲜汤面', canteenSlug: 'tongqin-yuan', stall: '面点窗口', description: '汤底清亮，适合晚自习前后吃一碗有热气的面。', price: 8, priceNote: '参考价', tags: ['早八友好', '面饭', '清淡'], category: '主食', image: image('photo-1562565652-a0d8f0c59eb4'), accent: 'sky', featured: false, sourceUrl: 'https://news.hust.edu.cn/info/1004/34762.htm' },
  { slug: 'mi-la-ma-la-tang', name: '麻辣烫', canteenSlug: 'dingxiang-yuan', stall: '风味自选', description: '蔬菜、豆制品、丸子自由组合，今天想吃什么自己挑。', price: 15, priceNote: '参考价', tags: ['人气', '辣口', '夜宵'], category: '小吃', image: image('photo-1515003197210-e0cd71810b5f'), accent: 'berry', featured: true, sourceUrl: 'https://m.dianping.com/shop/93307673?msource=applemaps' },
  { slug: 'niu-rou-mian', name: '清真牛肉面', canteenSlug: 'qingzhen-shitang', stall: '清真面饭', description: '汤鲜面顺，赶时间也能吃到一份完整的热饭。', price: 12, priceNote: '参考价', tags: ['清真', '面饭', '性价比'], category: '清真', image: image('photo-1569718212165-3a8278d5f624'), accent: 'jade', featured: true, sourceUrl: 'https://www.sohu.com/a/238958838_673149' },
  { slug: 'guo-qiao-mi-xian', name: '砂锅米线', canteenSlug: 'yixi-wangxi-meishi', stall: '风味小吃街', description: '一锅一锅冒着热气，搭配酸辣口很适合阴雨天。', price: 14, priceNote: '参考价', tags: ['小吃', '辣口', '夜宵'], category: '小吃', image: image('photo-1563245372-f21724e3856d'), accent: 'orange', featured: false, sourceUrl: 'https://www.sohu.com/a/238958838_673149' },
  { slug: 'dou-jiang-bao-zi', name: '豆浆 + 鲜肉包', canteenSlug: 'jiqin-yuan', stall: '早餐档', description: '两三分钟带走，给早八留一点余裕。', price: 6, priceNote: '参考价', tags: ['早八友好', '性价比'], category: '早餐', image: image('photo-1498837167922-ddd27525d352'), accent: 'peach', featured: false, sourceUrl: 'https://www.tjmu.edu.cn/info/1106/12102.htm' },
  { slug: 'chao-fan', name: '锅气炒饭', canteenSlug: 'xinglin-yuan', stall: '杏林自选', description: '颗粒分明的炒饭，配一份小菜就是完整的一餐。', price: 12, priceNote: '参考价', tags: ['性价比', '面饭'], category: '主食', image: image('photo-1512058564366-18510be2db19'), accent: 'sunset', featured: false, sourceUrl: 'https://www.tjmu.edu.cn/info/1106/11908.htm' },
  { slug: 'jiang-xiang-ji-pai', name: '酱香鸡排', canteenSlug: 'xinglin-yuan', stall: '能量补给站', description: '外酥里嫩，适合课间补一口，也可以和朋友分着吃。', price: 10, priceNote: '参考价', tags: ['小吃', '甜口'], category: '小吃', image: image('photo-1527477396000-e27163b481c2'), accent: 'coral', featured: false, sourceUrl: 'https://www.tjmu.edu.cn/info/1106/11908.htm' },
]

export const getCanteen = (slug: string) => canteens.find((canteen) => canteen.slug === slug)
export const getFood = (slug: string) => foods.find((food) => food.slug === slug)
export const getCanteenFoods = (slug: string) => foods.filter((food) => food.canteenSlug === slug)


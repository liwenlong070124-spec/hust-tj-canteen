import type { Canteen, FoodItem } from './types'

export const campusMapUrl = 'https://cs.hust.edu.cn/info/1131/2215.htm'
export const procurementUrl = 'https://www.hbghzb.com/bidding/zbgg/041829261.html'
const serviceUrl = 'https://www.tjmu.edu.cn/info/1106/12102.htm'
const innovationUrl = 'https://www.tjmu.edu.cn/info/1106/4174.htm'
const laborUrl = 'https://www.tjmu.edu.cn/info/1106/10731.htm'
const foodImage = (slug: string) => `/canteen/images/foods/${slug}.webp`

// These sources verify venue names, not live menus, hours or coordinates.
function venue(value: Pick<Canteen, 'slug' | 'name' | 'description' | 'tags' | 'stalls'> & Partial<Canteen>): Canteen {
  return {
    eyebrow: '同济校区 · 公开食堂名录',
    addressHint: '同济医学院航空路校区 · 精确位置待核验',
    walkingTime: '距离未实测，不提供推测步行时间',
    openTime: '营业时间待核验，以现场公告为准',
    image: '',
    mapUrl: `https://uri.amap.com/search?keyword=${encodeURIComponent(`华中科技大学同济医学院${value.name}`)}`,
    sourceUrls: [procurementUrl], status: 'verified',
    sourceNote: '2024-04-18 采购代理公告列名；不代表实时营业状态。',
    ...value,
  }
}

export const canteens: Canteen[] = [
  venue({ slug: 'tongqin-yuan', name: '同沁园', tags: ['蒸菜', '自选', '日常'],
    description: '公开报道记录了同沁园一楼小碗蒸菜与三楼餐厅。窗口会调整，先看记录，再到现场确认。',
    sourceUrls: [serviceUrl, innovationUrl, procurementUrl],
    sourceNote: '2026-09-09 学院报道提及一楼食堂；2024 菜品创新报道提及一楼蒸菜和三楼餐厅。',
    stalls: [
      { name: '小碗蒸菜（公开线索）', floor: '1F', specialties: ['蒸鸡蛋', '粉蒸肉', '时蔬'], priceRange: '参考 ¥5–15', openTime: '待现场核验' },
      { name: '面点窗口（编辑示例）', floor: '楼层待核验', specialties: ['热干面', '汤面', '包子'], priceRange: '参考 ¥3–12', openTime: '待现场核验' },
      { name: '三楼餐厅（公开线索）', floor: '3F', specialties: ['宴席接待', '手工菜'], priceRange: '以现场菜单为准', openTime: '请向餐厅咨询' },
    ],
  }),
  venue({ slug: 'dingxiang-yuan', name: '丁香园', tags: ['面饭', '风味', '自选'],
    description: '2026 年学院餐饮保障报道提及的学生食堂。面饭和盖饭记录为编辑示例，具体窗口以现场为准。',
    sourceUrls: [serviceUrl, procurementUrl],
    sourceNote: '2026-09-09 学院报道提及丁香园；2024 采购公告列名。',
    stalls: [
      { name: '风味自选（编辑示例）', floor: '楼层待核验', specialties: ['自选餐', '麻辣烫'], priceRange: '参考 ¥6–18', openTime: '待现场核验' },
      { name: '面食档（编辑示例）', floor: '楼层待核验', specialties: ['油泼面', '汤面'], priceRange: '参考 ¥8–18', openTime: '待现场核验' },
      { name: '盖饭窗口（编辑示例）', floor: '楼层待核验', specialties: ['黄焖鸡', '盖饭'], priceRange: '参考 ¥14–28', openTime: '待现场核验' },
    ],
  }),
  venue({ slug: 'xinglin-yuan', name: '杏林园', tags: ['自选', '快餐', '家常'],
    description: '公开采购公告中的“杏林园学生食堂”，学院 2024 年报道也介绍了这里的家常菜研发。',
    sourceUrls: [innovationUrl, laborUrl, procurementUrl],
    stalls: [
      { name: '自选餐（编辑示例）', floor: '楼层待核验', specialties: ['套餐', '时蔬', '炒饭'], priceRange: '参考 ¥6–18', openTime: '待现场核验' },
      { name: '小吃窗口（编辑示例）', floor: '楼层待核验', specialties: ['鸡排', '小吃'], priceRange: '参考 ¥5–20', openTime: '待现场核验' },
    ],
  }),
  venue({ slug: 'jiqin-yuan', name: '济沁园', tags: ['早餐', '面点', '日常'],
    description: '学院 2026 年服务报道与 2024 年采购公告均提及济沁园。早餐搭配是编辑记录，不代表现售菜单。',
    sourceUrls: [serviceUrl, procurementUrl],
    stalls: [{ name: '早餐档（编辑示例）', floor: '楼层待核验', specialties: ['热干面', '豆浆', '包子'], priceRange: '参考 ¥2–10', openTime: '待现场核验' }],
  }),
  venue({ slug: 'tongde-yuan', name: '同德园', tags: ['家常菜', '公开名录'],
    description: '补入原目录遗漏的同德园。2025 年学院报道介绍了这里的厨师与家常菜；清真服务的历史称呼需现场确认。',
    sourceUrls: [laborUrl, procurementUrl, 'https://m.thepaper.cn/newsDetail_forward_7746557'],
    sourceNote: '2024 采购公告、2025-05-01 学院报道确认名称；2020 报道曾称“同德园（清真食堂）”，当前服务需核实。',
    stalls: [],
  }),
  venue({ slug: 'tonghua-yuan', name: '同华园', tags: ['公开名录', '待补菜单'],
    description: '补入 2024 年同济校区食堂采购公告列出的同华园。尚无可核验的现行窗口菜单，欢迎补充带日期的现场信息。',
    stalls: [],
  }),
  venue({ slug: 'yixi-wangxi-meishi', name: '忆往昔美食城', status: 'historical', tags: ['历史线索', '待核验'],
    description: '旧版美食城线索，本次未核实其经营现状。保留入口，但不计入已核实食堂数量。',
    sourceUrls: ['https://www.sohu.com/a/238958838_673149'],
    sourceNote: '2018 年校园指南线索；当前名称、位置、经营状态和窗口均待核验。', stalls: [],
  }),
  venue({ slug: 'qingzhen-shitang', name: '清真食堂（旧称线索）', status: 'historical', tags: ['历史称呼', '勿重复计数'],
    description: '2020 年报道将同德园称为清真食堂，因此不再将旧称作为一家新增的独立食堂。饮食需求请向现场确认。',
    sourceUrls: ['https://m.thepaper.cn/newsDetail_forward_7746557'],
    sourceNote: '历史称呼指向同德园，不据此认定当前认证、独立场所或全部菜品。', stalls: [],
  }),
]

// Menu-to-window associations and prices are editorial examples, not official menus.
const entries: FoodItem[] = [
  { slug: 'you-po-mian', name: '油泼面', canteenSlug: 'dingxiang-yuan', stall: '面食档', description: '宽面裹上辣油、葱蒜与辣椒，拌开后每一口都有香气。', price: 9, priceNote: '参考价', tags: ['人气', '面饭', '辣口'], category: '主食', image: foodImage('you-po-mian'), accent: 'saffron', featured: true },
  { slug: 'huang-men-ji', name: '黄焖鸡米饭', canteenSlug: 'dingxiang-yuan', stall: '盖饭窗口', description: '鸡肉与土豆炖出浓郁酱汁，拌上一碗白米饭很满足。', price: 16, priceNote: '参考价', tags: ['人气', '面饭'], category: '主食', image: foodImage('huang-men-ji'), accent: 'tomato', featured: true },
  { slug: 're-gan-mian', name: '热干面', canteenSlug: 'jiqin-yuan', stall: '早餐档', description: '浓厚芝麻酱裹住碱面，萝卜丁和葱花点亮武汉的清晨。', price: 5, priceNote: '参考价', tags: ['早八友好', '性价比', '面饭'], category: '早餐', image: foodImage('re-gan-mian'), accent: 'cream', featured: true },
  { slug: 'zi-xuan-pei-cai', name: '时蔬自选', canteenSlug: 'tongqin-yuan', stall: '自选餐', description: '米饭、青菜与豆腐自由搭配，给忙碌的一天留一点清爽。', price: 11, priceNote: '参考价', tags: ['性价比', '清淡'], category: '主食', image: foodImage('zi-xuan-pei-cai'), accent: 'leaf' },
  { slug: 'tang-mian', name: '鲜汤面', canteenSlug: 'tongqin-yuan', stall: '面点窗口', description: '细面、青菜与鸡蛋浸在清亮汤底里，是热乎又轻盈的一餐。', price: 8, priceNote: '参考价', tags: ['早八友好', '面饭', '清淡'], category: '主食', image: foodImage('tang-mian'), accent: 'sky' },
  { slug: 'mi-la-ma-la-tang', name: '麻辣烫', canteenSlug: 'dingxiang-yuan', stall: '风味自选', description: '豆腐、蔬菜、菌菇和丸子在红汤里相遇，麻辣香气很过瘾。', price: 15, priceNote: '参考价', tags: ['人气', '辣口', '夜宵'], category: '小吃', image: foodImage('mi-la-ma-la-tang'), accent: 'berry', featured: true },
  { slug: 'niu-rou-mian', name: '牛肉面', canteenSlug: 'tongde-yuan', stall: '面饭窗口（待核验）', description: '细面、牛肉片与香菜搭配清汤。清真服务请以现场标识为准。', price: 12, priceNote: '参考价', tags: ['面饭'], category: '主食', image: foodImage('niu-rou-mian'), accent: 'jade' },
  { slug: 'guo-qiao-mi-xian', name: '砂锅米线', canteenSlug: 'yixi-wangxi-meishi', stall: '风味小吃（历史线索）', description: '白米线与番茄、菌菇同煮在砂锅里。所属经营地点仍待核验。', price: 14, priceNote: '参考价', tags: ['小吃', '辣口', '夜宵'], category: '小吃', image: foodImage('guo-qiao-mi-xian'), accent: 'orange' },
  { slug: 'dou-jiang-bao-zi', name: '豆浆 + 鲜肉包', canteenSlug: 'jiqin-yuan', stall: '早餐档', description: '一笼热包子配一杯豆浆，简单的早餐也值得认真对待。', price: 6, priceNote: '参考价', tags: ['早八友好', '性价比'], category: '早餐', image: foodImage('dou-jiang-bao-zi'), accent: 'peach' },
  { slug: 'chao-fan', name: '锅气炒饭', canteenSlug: 'xinglin-yuan', stall: '自选餐', description: '金黄蛋炒饭配胡萝卜、豌豆与葱花，颗粒分明，刚刚好。', price: 12, priceNote: '参考价', tags: ['性价比', '面饭'], category: '主食', image: foodImage('chao-fan'), accent: 'sunset' },
  { slug: 'jiang-xiang-ji-pai', name: '酱香鸡排', canteenSlug: 'xinglin-yuan', stall: '小吃窗口', description: '酥脆鸡排切成小块，淋上酱汁，和朋友分着吃也不错。', price: 10, priceNote: '参考价', tags: ['小吃', '甜口'], category: '小吃', image: foodImage('jiang-xiang-ji-pai'), accent: 'coral' },
]
export const foods = entries.map((food) => ({ ...food, imageNote: 'AI 菜品示意，非食堂实拍' }))
export const getCanteen = (slug: string) => canteens.find((canteen) => canteen.slug === slug)
export const getFood = (slug: string) => foods.find((food) => food.slug === slug)
export const getCanteenFoods = (slug: string) => foods.filter((food) => food.canteenSlug === slug)

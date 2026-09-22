export interface MockMezmurCategory {
  id: number;
  name: string;
}

export interface MockMezmur {
  id: number;
  title: string;
  description: string | null;
  categoryId: number;
  thumbnailUrl: string;
  mezmurPoem: string;
  createdAt: string;
  updatedAt: string;
  category: MockMezmurCategory;
}

const thumbnailUrl = 'https://res.cloudinary.com/demo/image/upload/sample.jpg';

export const mezmurCategories: MockMezmurCategory[] = [
  { id: 1, name: 'ምስጋና' },
  { id: 2, name: 'ጸሎት' },
  { id: 3, name: 'እምነት' },
];

export const mezmurs: MockMezmur[] = [
  {
    id: 1,
    title: 'የህይወት ብርሃን',
    description: 'በእግዚአብሔር ብርሃን ስለምንመላለስ የሚያስታውስ የምስጋና መዝሙር።',
    categoryId: 1,
    thumbnailUrl,
    mezmurPoem: 'የህይወት ብርሃን አንተ ነህ፣\nመንገዴን አብራልኝ።\nበምስጋና እዘምራለሁ፣\nስምህን አከብራለሁ።',
    createdAt: '2026-09-20T08:00:00.000Z',
    updatedAt: '2026-09-20T08:00:00.000Z',
    category: mezmurCategories[0],
  },
  {
    id: 2,
    title: 'ጸጋህ ይበቃኛል',
    description: 'በፈተና ጊዜ በጌታ ጸጋ እንድንታመን የሚጠራ መዝሙር።',
    categoryId: 3,
    thumbnailUrl,
    mezmurPoem: 'ጸጋህ ይበቃኛል፣ ጌታዬ፣\nበድካሜ ኃይል ትሆነኛለህ።\nበአንተ እታመናለሁ፣\nበፍቅርህ እኖራለሁ።',
    createdAt: '2026-09-19T10:30:00.000Z',
    updatedAt: '2026-09-19T10:30:00.000Z',
    category: mezmurCategories[2],
  },
  {
    id: 3,
    title: 'ምስጋና ለልዑል',
    description: 'ለልዑል እግዚአብሔር የምስጋና እና የውዳሴ መዝሙር።',
    categoryId: 1,
    thumbnailUrl,
    mezmurPoem: 'ምስጋና ለልዑል፣ ክብር ለንጉሥ፣\nምሕረቱ ለዘላለም ነው።\nልባችን በደስታ ይዘምር፣\nስሙን ሁልጊዜ እናክብር።',
    createdAt: '2026-09-18T14:15:00.000Z',
    updatedAt: '2026-09-18T14:15:00.000Z',
    category: mezmurCategories[0],
  },
  {
    id: 4,
    title: 'በጸሎት እንቅረብ',
    description: 'በጸሎት ወደ እግዚአብሔር እንድንቀርብ የሚያበረታታ መዝሙር።',
    categoryId: 2,
    thumbnailUrl,
    mezmurPoem: 'በጸሎት እንቅረብ፣ በእምነት እንጸና፣\nየልባችንን ቃል እንናገር።\nእርሱ ይሰማናል፣ ይመራናል፣\nበሰላሙም ያሳርፈናል።',
    createdAt: '2026-09-17T09:45:00.000Z',
    updatedAt: '2026-09-17T09:45:00.000Z',
    category: mezmurCategories[1],
  },
];

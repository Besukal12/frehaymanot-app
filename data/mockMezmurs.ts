export interface MockMezmurCategory {
  id: number;
  name: string;
  imageUrl: string | null;
}

export interface MockMezmur {
  id: number;
  title: string;
  description: string | null;
  categoryId: number;
  mezmurPoem: string;
  createdAt: string;
  updatedAt: string;
  category: MockMezmurCategory;
}

const categoryImageUrl = 'https://res.cloudinary.com/demo/image/upload/sample.jpg';

export const mezmurCategories: MockMezmurCategory[] = [
  { id: 1, name: 'ምስጋና', imageUrl: categoryImageUrl },
  { id: 2, name: 'ጸሎት', imageUrl: categoryImageUrl },
  { id: 3, name: 'እምነት', imageUrl: categoryImageUrl },
];

export const mezmurs: MockMezmur[] = [
  {
    id: 1,
    title: 'የህይወት ብርሃን',
    description: 'በእግዚአብሔር ብርሃን ስለምንመላለስ የሚያስታውስ የምስጋና መዝሙር።',
    categoryId: 1,
    mezmurPoem:
      'የህይወት ብርሃን አንተ ነህ፣\n    መንገዴን አብራልኝ።\n    በምስጋና እዘምራለሁ፣\n    ስምህን አከብራለሁ።\n\n    በጸጋህ እቆማለሁ፣\n    በፍቅርህ እኖራለሁ።',
    createdAt: '2026-09-20T08:00:00.000Z',
    updatedAt: '2026-09-20T08:00:00.000Z',
    category: mezmurCategories[0],
  },
  {
    id: 2,
    title: 'ጸጋህ ይበቃኛል',
    description: 'በፈተና ጊዜ በጌታ ጸጋ እንድንታመን የሚጠራ መዝሙር።',
    categoryId: 3,
    mezmurPoem:
      'ጸጋህ ይበቃኛል፣ ጌታዬ፣\n    በድካሜ ኃይል ትሆነኛለህ።\n    በአንተ እታመናለሁ፣\n    በፍቅርህ እኖራለሁ።\n\n    በምሕረትህ እታደሳለሁ፣\n    በቃልህ እጸናለሁ።',
    createdAt: '2026-09-19T10:30:00.000Z',
    updatedAt: '2026-09-19T10:30:00.000Z',
    category: mezmurCategories[2],
  },
  {
    id: 3,
    title: 'ምስጋና ለልዑል',
    description: 'ለልዑል እግዚአብሔር የምስጋና እና የውዳሴ መዝሙር።',
    categoryId: 1,
    mezmurPoem:
      'ምስጋና ለልዑል፣ ክብር ለንጉሥ፣\n    ምሕረቱ ለዘላለም ነው።\n    ልባችን በደስታ ይዘምር፣\n    ስሙን ሁልጊዜ እናክብር።\n\n    በቤቱ ደስታ ይሙላ፣\n    በምስጋና ድምፃችን ይሰማ።',
    createdAt: '2026-09-18T14:15:00.000Z',
    updatedAt: '2026-09-18T14:15:00.000Z',
    category: mezmurCategories[0],
  },
  {
    id: 4,
    title: 'በጸሎት እንቅረብ',
    description: 'በጸሎት ወደ እግዚአብሔር እንድንቀርብ የሚያበረታታ መዝሙር።',
    categoryId: 2,
    mezmurPoem:
      'በጸሎት እንቅረብ፣ በእምነት እንጸና፣\n    የልባችንን ቃል እንናገር።\n    እርሱ ይሰማናል፣ ይመራናል፣\n    በሰላሙም ያሳርፈናል።\n\n    በጨለማ መካከል፣\n    ብርሃኑ ይመራናል።',
    createdAt: '2026-09-17T09:45:00.000Z',
    updatedAt: '2026-09-17T09:45:00.000Z',
    category: mezmurCategories[1],
  },
];

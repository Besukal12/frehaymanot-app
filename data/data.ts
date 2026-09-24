import { mezmurCategories } from "./mockMezmurs";

export const QUICK_ACTIONS = [
  { key: 'mezmurs', label: 'መዝሙሮች', icon: 'musical-notes' as const, route: '/mezmurs' },
  { key: 'courses', label: 'ኮርሶች', icon: 'book' as const, route: '/courses' },
  { key: 'feedback', label: 'አስተያየት', icon: 'chatbubble-ellipses' as const, route: '/feedback' },
];

export const LATEST_MEZMURS = [
  {
    id: 1,
    title: 'የጥበብ ሰዎች መጡ',
    description: null,
    categoryId: 1,
    mezmurPoem:
      'ሰማይና ምድር የማይወስኑት (፪)\nተወስኖ አየነው በጠባብ ደረት (፪)\nዘጠና ዘጠኙን መላዕክትን ትቶ (፪)\nአገኘነው ዛሬ ከበረት ተኝቶ (፪)\n\nየጥበብ ሰዎች መጡ (፪) ሰምተውት በዜና\nእያበራላቸው ኮከቡ እንደፋና (፪)\n\nድንግል እመቤቴ ሰላምታ ይድረስሽ (፪)\nለአምላክ ወገኖች መመኪያቸው የሆንሽ (፪)\nካንቺ ተወለደ የዓለም መድኅን (፪)\nኩነኔን አጥፍቶ ክብሩን ሊያወርሰን (፪)\n\nጌታችን ሲወለድ በቤተልሔም (፪)\nሐዘን ተደምስሶ ሰፈነ ሰላም (፪)\nእንጨቶች አፈሩ ፍሬ በረከት (፪)\nወንዞች ሁሉ ሆኑ ማርና ወተት (፪)\n\nሰብአሰገል መጡ ሊሰግዱ በሙሉ (፪)\nየእስራኤል ንጉስ ወዴት አለ እያሉ (፪)\nእጅ መንሻውን ሰጡት እንደየስርዓቱ (፪)\nእጣኑን ለክህነት ወርቁን ለመንግስቱ ከርቤውን ለሞቱ',
    createdAt: '2026-01-05T08:00:00.000Z',
    updatedAt: '2026-01-05T08:00:00.000Z',
    category: mezmurCategories.find((c) => c.id === 1)!,
  },
  {
    id: 2,
    title: 'የአለም መድኃኒት የተወለደብሽ',
    description: null,
    categoryId: 1,
    mezmurPoem:
      'የአለም መድኃኒት የተወለደብሽ\nአንቺ ቤተልሄም የተቀደሽ ነሽ\n\nየአማልክት አምላክ ንጉሰ ነገስት\nሀያላን በሙሉ የሚሰግዱለት\nበጨርቅ ተጠቅልሎ ተኛ በበረት\n\nየጥበብ ሰዎች በቅን ሀሳባቸው\nወደ አንቺ ተጓዙ ኮከብ ሲመራቸው /2/\n\nለተከታይ ትውልድ ምሳሌ በመሆን\nሰግደው ገበሩለት ወርቅ እጣን ከርቤን/2/\n\nየሚያድለው ጌታ እውቀት ለህፃናት\nየሚመሰገነው በአፈ መላእክት\nከእንሰሣት ጋራ አደረ በበረት\n\nበስጋ ተገልጦ በረቂቅ ሚስጢሩ\nሰው እና መላዕክት አንድ ላይ ዘመሩ/2/',
    createdAt: '2026-01-05T08:00:00.000Z',
    updatedAt: '2026-01-05T08:00:00.000Z',
    category: mezmurCategories.find((c) => c.id === 1)!,
  },
  {
    id: 3,
    title: 'ስብሐት ለእግዚአብሔር',
    description: null,
    categoryId: 1,
    mezmurPoem:
      'ስብሐት ለእግዚአብሔር በሰማያት /2/\nወሰላም በምድር ስምረቱ ለሰብእ ሃሌ ሉያ (3) አሜን\nሃሌ ሉያ (2)\n\nትርጉም ፦ እግዚአብሔር በሰማያት ምስጋና ይገባዋል\nበምድር እርቅ ተጀመረ ለሰው ግዕዚኑ /ነጻነቱ/ ሊሰጠው',
    createdAt: '2026-01-05T08:00:00.000Z',
    updatedAt: '2026-01-05T08:00:00.000Z',
    category: mezmurCategories.find((c) => c.id === 1)!,
  },
  {
    id: 4,
    title: 'እም ሰማያት',
    description: null,
    categoryId: 1,
    mezmurPoem: 'እም ሰማያት ወረደ ወእምማርያም ተወልደ/2/\nከመ ይኩን ቤዛ /2/ ለኩሉ ዓለም ለብሰ ስጋ ማርያም',
    createdAt: '2026-01-05T08:00:00.000Z',
    updatedAt: '2026-01-05T08:00:00.000Z',
    category: mezmurCategories.find((c) => c.id === 1)!,
  },
];

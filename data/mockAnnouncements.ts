export interface MockAnnouncement {
  id: number;
  title: string;
  slug: string;
  content: string;
  thumbnailUrl: string | null;
  postedAt: string;
  createdAt: string;
  updatedAt: string;
}

const thumbnailUrl = 'https://res.cloudinary.com/demo/image/upload/sample.jpg';

export const announcements: MockAnnouncement[] = [
  {
    id: 1,
    title: 'የእሁድ የጋራ አምልኮ መርሃ ግብር',
    slug: 'sunday-worship-program',
    content: 'የዚህ ሳምንት የጋራ አምልኮ መርሃ ግብር እሁድ ከጠዋቱ 3:00 ጀምሮ ይካሄዳል። ሁላችሁም በደስታ እንድትሳተፉ በፍቅር እንጋብዛለን።',
    thumbnailUrl,
    postedAt: '2026-09-21T08:00:00.000Z',
    createdAt: '2026-09-21T08:00:00.000Z',
    updatedAt: '2026-09-21T08:00:00.000Z',
  },
  {
    id: 2,
    title: 'የመጽሐፍ ቅዱስ ጥናት ሳምንታዊ ስብሰባ',
    slug: 'weekly-bible-study-meeting',
    content: 'የመጽሐፍ ቅዱስ ጥናታችን በየረቡዕ ምሽት ከ11:00 ጀምሮ ይካሄዳል። የዚህ ሳምንት ጥናት በተስፋ እና በእምነት ላይ ያተኩራል።',
    thumbnailUrl,
    postedAt: '2026-09-19T12:30:00.000Z',
    createdAt: '2026-09-19T12:30:00.000Z',
    updatedAt: '2026-09-19T12:30:00.000Z',
  },
  {
    id: 3,
    title: 'የወጣቶች የጸሎት ምሽት',
    slug: 'youth-prayer-night',
    content:
      'የወጣቶች የጸሎት ምሽት ቅዳሜ ከምሽቱ 12:00 ጀምሮ ይካሄዳል። ወጣቶች በጸሎት፣ በውይይት እና በምስጋና እንድትሳተፉ እንጠብቃችኋለን።',
    thumbnailUrl: null,
    postedAt: '2026-09-17T09:15:00.000Z',
    createdAt: '2026-09-17T09:15:00.000Z',
    updatedAt: '2026-09-17T09:15:00.000Z',
  },
  {
    id: 4,
    title: 'የአዲስ ዓመት ምስጋና መርሃ ግብር',
    slug: 'new-year-thanksgiving-program',
    content: 'አዲሱን ዓመት በምስጋና ለመቀበል ልዩ የምስጋና መርሃ ግብር ተዘጋጅቷል። በዚህ የተባረከ ጊዜ አብረን እንድንሆን እንጋብዛለን።',
    thumbnailUrl,
    postedAt: '2026-09-12T07:45:00.000Z',
    createdAt: '2026-09-12T07:45:00.000Z',
    updatedAt: '2026-09-12T07:45:00.000Z',
  },
];

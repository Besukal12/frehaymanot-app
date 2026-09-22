export interface MockCourse {
  id: number;
  title: string;
  description: string | null;
  grade: number;
  thumbnailUrl: string | null;
  pdfUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

export const courses: MockCourse[] = [
  {
    id: 1,
    title: 'የእምነት መሠረቶች',
    description: 'ለአዲስ አማኞች የተዘጋጀ የእምነት መሠረታዊ ትምህርት።',
    grade: 1,
    thumbnailUrl: null,
    pdfUrl: 'https://example.com/courses/faith-foundations.pdf',
    createdAt: '2026-09-20T08:00:00.000Z',
    updatedAt: '2026-09-20T08:00:00.000Z',
  },
  {
    id: 2,
    title: 'የመጽሐፍ ቅዱስ ጥናት',
    description: 'መጽሐፍ ቅዱስን በማዋቀር፣ በማንበብ እና በመረዳት ላይ የሚያተኩር ኮርስ።',
    grade: 2,
    thumbnailUrl: null,
    pdfUrl: 'https://example.com/courses/bible-study.pdf',
    createdAt: '2026-09-18T10:30:00.000Z',
    updatedAt: '2026-09-18T10:30:00.000Z',
  },
  {
    id: 3,
    title: 'የጸሎት ሕይወት',
    description: 'በየዕለቱ ጸሎት ውስጥ ለማደግ የሚረዱ መርሆችን ይማሩ።',
    grade: 1,
    thumbnailUrl: null,
    pdfUrl: 'https://example.com/courses/prayer-life.pdf',
    createdAt: '2026-09-16T07:15:00.000Z',
    updatedAt: '2026-09-16T07:15:00.000Z',
  },
  {
    id: 4,
    title: 'የአገልግሎት ኃላፊነት',
    description: 'በቤተክርስቲያን እና በማኅበረሰብ ውስጥ በታማኝነት ማገልገል።',
    grade: 3,
    thumbnailUrl: null,
    pdfUrl: 'https://example.com/courses/service-responsibility.pdf',
    createdAt: '2026-09-12T13:45:00.000Z',
    updatedAt: '2026-09-12T13:45:00.000Z',
  },
];

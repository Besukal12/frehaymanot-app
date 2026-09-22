export const QUICK_ACTIONS = [
  { key: 'mezmurs', label: 'መዝሙሮች', icon: 'musical-notes' as const, route: '/mezmurs' },
  { key: 'courses', label: 'ኮርሶች', icon: 'book' as const, route: '/courses' },
  { key: 'feedback', label: 'አስተያየት', icon: 'chatbubble-ellipses' as const, route: '/feedback' },
];

export const LATEST_MEZMURS = [
  {
    id: '1',
    title: 'የህይወት ብርሃን',
    subtitle: 'ሙሉ ጊዜ • 4:12',
    image: require('../assets/teklehaymanot.jpg'),
  },
  {
    id: '2',
    title: 'ጸጋህ ይበቃኛል',
    subtitle: 'ሙሉ ጊዜ • 3:47',
    image: require('../assets/teklehaymanot.jpg'),
  },
  {
    id: '3',
    title: 'ምስጋና ለልዑል',
    subtitle: 'ሙሉ ጊዜ • 5:02',
    image: require('../assets/teklehaymanot.jpg'),
  },
];

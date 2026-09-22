export type ThemeId = 'heritage' | 'forest' | 'ocean' | 'midnight';

export interface AppTheme {
  id: ThemeId;
  name: string;
  description: string;
  colors: {
    primary: string;
    accent: string;
    background: string;
    ink: string;
    muted: string;
    white: string;
    border: string;
  };
}

export const themes: AppTheme[] = [
  {
    id: 'heritage',
    name: 'ባህላዊ',
    description: 'የአሁኑ የፍሬ ሀይማኖት ቀለም',
    colors: {
      primary: '#8B1E3F',
      accent: '#C9A227',
      background: '#FBF7F1',
      ink: '#241C15',
      muted: '#9C8F80',
      white: '#FFFFFF',
      border: '#E9DED0',
    },
  },
  {
    id: 'forest',
    name: 'የደን አረንጓዴ',
    description: 'ረጋ ያለ እና ተፈጥሯዊ',
    colors: {
      primary: '#245C4A',
      accent: '#B58B32',
      background: '#F3F8F3',
      ink: '#17251F',
      muted: '#74857B',
      white: '#FFFFFF',
      border: '#D6E5D9',
    },
  },
  {
    id: 'ocean',
    name: 'የባሕር ሰማያዊ',
    description: 'ንጹህ እና ሰላማዊ',
    colors: {
      primary: '#175A78',
      accent: '#D28B36',
      background: '#F1F8FA',
      ink: '#17252B',
      muted: '#718995',
      white: '#FFFFFF',
      border: '#D4E5EB',
    },
  },
  {
    id: 'midnight',
    name: 'የሌሊት ሰማይ',
    description: 'ጥልቅ፣ ረጋ ያለ እና ዘመናዊ',
    colors: {
      primary: '#D8A7C8',
      accent: '#E5B957',
      background: '#15131D',
      ink: '#F5EFF7',
      muted: '#AAA1B4',
      white: '#24202D',
      border: '#3B3447',
    },
  },
];

export const colors = {
  primary: '#8B1E3F',
  accent: '#C9A227',
  background: '#FBF7F1',
  ink: '#241C15',
  muted: '#9C8F80',
  white: '#FFFFFF',
  border: '#E9DED0',
};

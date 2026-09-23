export type ThemeId = 'default' | 'green' | 'blue' | 'dark';

export interface AppTheme {
  id: ThemeId;
  name: string;
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
    id: 'default',
    name: 'መደበኛ',
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
    id: 'green',
    name: 'አረንጓዴ',
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
    id: 'blue',
    name: 'ሰማያዊ',
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
    id: 'dark',
    name: 'ጥቁር',
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

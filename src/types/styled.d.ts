import { Theme as MUITheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface CustomTheme extends MUITheme {
    // Add any custom theme properties here
  }
  interface Theme extends CustomTheme {}
  interface ThemeOptions extends Partial<CustomTheme> {}
} 
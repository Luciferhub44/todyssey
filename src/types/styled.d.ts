import { Theme as MuiTheme, ThemeOptions as MuiThemeOptions } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface CustomThemeExtension {
    // Add any custom theme properties here
  }
  
  interface Theme extends MuiTheme, CustomThemeExtension {}
  interface ThemeOptions extends MuiThemeOptions, CustomThemeExtension {}
} 
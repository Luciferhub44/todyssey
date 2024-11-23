import { Theme as MuiTheme, ThemeOptions as MuiThemeOptions, ThemeOptions } from '@mui/material/styles';
import { extend } from 'lodash';

declare module '@mui/material/styles' {
  interface CustomThemeExtension {
    // Add any custom theme properties here
  }
  interface CustomTheme extends MuiTheme {
    // Your custom theme properties
  }
  interface Theme extends MuiTheme, CustomTheme, CustomThemeExtension {}
  interface ThemeOptions extends MuiThemeOptions, CustomThemeExtension {}
} 
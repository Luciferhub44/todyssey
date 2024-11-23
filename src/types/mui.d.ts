import { GridProps as MuiGridProps } from '@mui/material';
import { ElementType } from 'react';

declare module '@mui/material' {
  interface GridProps extends Omit<MuiGridProps, 'component'> {
    component?: ElementType;
    children?: React.ReactNode;
    container?: boolean;
    item?: boolean;
    spacing?: number;
    xs?: number | boolean;
    sm?: number | boolean;
    md?: number | boolean;
    lg?: number | boolean;
    xl?: number | boolean;
    justifyContent?: string;
    alignItems?: string;
  }
} 
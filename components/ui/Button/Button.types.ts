import * as React from 'react';
import { type VariantProps } from 'class-variance-authority';
import { buttonVariants } from './Button';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /**
   * If set to `true`, the button will be rendered as a child within the component.
   * This child component must be a valid React component.
   */
  asChild?: boolean;
  
  /**
   * If set to `true`, the button will show a loading spinner and be disabled.
   */
  loading?: boolean;
}
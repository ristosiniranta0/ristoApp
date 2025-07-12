import { BorderColor } from '../../../helpers/constants/design-system';
import type { AvatarBaseStyleUtilityProps } from '../avatar-base/avatar-base.types';
import { PolymorphicComponentPropWithRef } from '../box';
import { IconProps } from '../icon';

export enum AvatarFaviconSize {
  Xs = 'xs',
  Sm = 'sm',
  Md = 'md',
  Lg = 'lg',
  Xl = 'xl'
}

export type AvatarFaviconStyleUtilityProps = Omit<AvatarBaseStyleUtilityProps, 'size' | 'children'> & {
  src?: string;
  name: string;
  fallbackIconProps?: IconProps<'span'>;
  size?: AvatarFaviconSize;
  borderColor?: BorderColor;
  className?: string;
}

export type AvatarFaviconProps<C extends React.ElementType> = PolymorphicComponentPropWithRef<C, AvatarFaviconStyleUtilityProps>;

export type AvatarFaviconComponent = <C extends React.ElementType = 'span'>(
  props: AvatarFaviconProps<C>
) => React.ReactElement | null;

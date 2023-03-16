import { type PropsWithChildren } from 'react';

type BaseFCTypes = {
  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
};

export type ReactFC<P = BaseFCTypes> = React.FC<PropsWithChildren<P & BaseFCTypes>>;

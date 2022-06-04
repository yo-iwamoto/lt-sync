import type { ReactNode, FC } from 'react';

type Props = {
  children: ReactNode;
};

export const Layout: FC<Props> = ({ children }) => <div>{children}</div>;

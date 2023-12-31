import { createContext, useContext } from 'react';

export const HeaderLayoutContext = createContext(95);

export const { Provider: HeaderLayoutProvider } = HeaderLayoutContext;

export const useHeaderLayout = () => useContext(HeaderLayoutContext);

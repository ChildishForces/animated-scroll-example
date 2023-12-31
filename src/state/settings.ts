import { atom, useAtom } from 'jotai';

export const binaryTabBarAtom = atom(false);

export const useBinaryTabBar = () => useAtom(binaryTabBarAtom);

import { atom } from 'recoil';

export const menuState = atom<boolean>({
    key: 'menuState',
    default: false,
    });
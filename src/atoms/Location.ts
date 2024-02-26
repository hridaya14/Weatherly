import {atom} from 'recoil';

export const locationState = atom<string>({
    key: 'locationState',
    default: 'Delhi,In',
    });



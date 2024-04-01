import {atom} from 'recoil';

export const user = atom  ({
    key : "user",
    default : "User"
});

export const userAuthStatus = atom ({
    key : "userAuthStatus",
    default : false
})


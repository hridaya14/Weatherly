import {atom} from 'recoil';

export type CoordinateType = {
    latitude: string,
    longitude: string,

}

export const locationState = atom<string>({
    key: 'locationState',
    default: 'Delhi,In',
    });


export const locationCoordinates = atom <CoordinateType>({
    key: 'locationCoordinates',
    default: {
        latitude : '+28.6139',
        longitude : '+77.2090'
    }
})


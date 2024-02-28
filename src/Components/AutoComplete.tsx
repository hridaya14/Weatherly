import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { locationState } from '../atoms/index';

const Complete = async (value: string) => {
    try {
        const response = await axios.get(`https://api.geocode.earth/v1/autocomplete?api_key=ge-373e629b344c35ed&text=${value}`);
        const data = response.data;
        const features = data.features;
        return features;
    } catch (err) {
        console.log(err);
        return [];
    }
}

const AutoComplete = (props: { text: string, handler : Function }) => {
    const [suggestions, setSuggestions] = useState<Array<object>>([]);
    const [location, setLocation] = useRecoilState(locationState);

    useEffect(() => {
        Complete(props.text).then((data) => { setSuggestions(data) });
    }, [props.text]);

    return (
        <div className=' w-full backdrop-blur-sm p-2 mt-1 rounded-lg absolute top-10 z-50'>
            {suggestions?.map((suggestion: any) => (
                <div key={suggestion.properties.id}>
                    <button className="text-white block w-full text-left" onClick={() => props.handler(`${suggestion.properties.name},${suggestion.properties.country_code}`)}>
                        {suggestion.properties.name}, {suggestion.properties.country_code}
                    </button>
                </div>
            ))}
        </div>
    );
}

export default AutoComplete;

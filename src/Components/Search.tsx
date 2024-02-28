import {useState} from 'react';
import { useRecoilState } from 'recoil';
import { locationState } from '../atoms/index';
import AutoComplete from './AutoComplete';



const Search = () => {
    const [location, setLocation] = useRecoilState(locationState);
    const [value, setValue] = useState<string>('');
    const [isActive , setIsActive] = useState<boolean>(false);

    const handleValue = (text: string) => {
        setValue(text);
        setIsActive(false);
    };

    const handleSubmit = (e : any) => {
        e.preventDefault();
        setLocation(value);
    };
    return(
    <form
                className="w-full max-w-md lg:max-w-sm mx-auto lg:mx-0 flex flex-col relative my-auto"
                onSubmit={handleSubmit} 
            >
                <input
                    className="bg-[#1A1B1D] h-12 rounded-lg p-2 w-full text-white"
                    placeholder="Search City"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    style={{ paddingRight: '2rem' }} 
                    onFocus={() => setIsActive(true)}
                />
                <button className='absolute right-0 top-0 bottom-0 flex items-center px-2'  type = {'submit'}>
                    <img src="/menu/search.png" className="h-6 w-6" alt="Search" />
                </button>

                {isActive ? <AutoComplete text = {value} handler={handleValue} />: null}

            </form>
    );
}

export default Search;
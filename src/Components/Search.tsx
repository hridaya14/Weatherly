import { useState, useRef, useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { locationState, locationCoordinates } from '../atoms/index';
import AutoComplete from './AutoComplete';

const Search = () => {
    const setLocation = useSetRecoilState(locationState);
    const setCoordinates = useSetRecoilState(locationCoordinates);
    const [value, setValue] = useState<string>('');
    const [isActive, setIsActive] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleValue = (text: string) => {
        setValue(text);
        setIsActive(true); // Open the dropdown when typing
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLocation(value);
        setIsActive(false); // Close the dropdown after submitting
    };

    const handleClickOutside = (e: MouseEvent) => {
        // Close the dropdown only if the click is outside the input box and dropdown
        if (
            inputRef.current && !inputRef.current.contains(e.target as Node) &&
            dropdownRef.current && !dropdownRef.current.contains(e.target as Node)
        ) {
            setIsActive(false); // Close the dropdown
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <form
            className="w-full max-w-md lg:max-w-sm mx-auto lg:mx-0 flex flex-col relative my-auto"
            onSubmit={handleSubmit}
        >
            <input
                ref={inputRef} // Attach the ref to the input element
                className="bg-[#1A1B1D] h-12 rounded-lg p-2 w-full text-white"
                placeholder="Search City"
                value={value}
                onChange={(e) => handleValue(e.target.value)}
                style={{ paddingRight: '2rem' }}
                onFocus={() => setIsActive(true)} // Open dropdown when focus is gained
            />
            <button className="absolute right-0 top-0 bottom-0 flex items-center px-2" type="submit" disabled>
                <img src="/menu/search.png" className="h-6 w-6" alt="Search" />
            </button>

            {isActive && (
                <AutoComplete
                    text={value}
                    handler={setLocation}
                    setCoordinates={setCoordinates}
                    setSearchValue={setValue}
                    setIsActive={setIsActive}  // Pass the setter to close the dropdown after selection
                    dropdownRef={dropdownRef} // Pass the dropdown ref to AutoComplete
                />
            )}
        </form>
    );
};

export default Search;

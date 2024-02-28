
import { useRecoilState } from 'recoil';
import { menuState,locationState } from '../atoms/index';
import { MobileNav } from '.';
import { ReactEventHandler, useState } from 'react';
import Search from './Search';



const Header = () => {
    const [isOpen, setIsOpen] = useRecoilState(menuState);
    
    const toggle = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="flex flex-col gap-6 lg:flex-row mt-8 lg:justify-between">
            <div className="flex justify-between">
                <img src="/avatar.png" className="hidden lg:inline" />
                <span className="text-white mx-4">
                    <h2 className="text-[0.85rem] lg:text-[0.875rem]">Howdy,</h2>
                    <h2 className="text-[1.3rem] lg:text-[1.75rem]">Username</h2>
                </span>
                <button onClick={toggle} className="z-50">
                    <img src="/menu.png" className="lg:hidden h-8 w-8" />
                </button>
            </div>
            <Search/>
            {isOpen ? <MobileNav /> : null}
        </div>
    );
};

export default Header;


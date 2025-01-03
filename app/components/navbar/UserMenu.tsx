'use client';
import { AiOutlineMenu } from 'react-icons/ai';
import Avatar from '../Avatar';
import { useCallback, useState } from 'react';
import MenuItem from './MenuItem';

const UserMenu = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = useCallback(() => {
        setIsDropdownOpen((prev) => !prev);
    }, []);

    return (
        <div className="relative">
            <div className="flex flex-row items-center gap-3">
                <div
                    onClick={() => {}}
                    className="
                        hidden
                        md:block
                        text-sm
                        font-semibold
                        py-3 
                        px-4
                        rounded-full
                        hover:bg-neutral-100
                        transition
                        cursor-pointer
                    "
                >
                    Airbnb your home
                </div>
                <div
                    onClick={toggleDropdown}
                    className="
                        p-4
                        md:py-1
                        md:px-2
                        border-[1px]
                        border-neutral-200
                        flex
                        flex-row
                        items-center
                        gap-3
                        rounded-full
                        cursor-pointer
                        hover:shadow-md
                        transition
                    "
                >
                    <AiOutlineMenu />
                    <div className="hidden md:block">
                        <Avatar />
                    </div>
                </div>
                {isDropdownOpen && (
                    <div
                        className="
                            absolute
                            rounded-xl
                            shadow-sm
                            w-max
                            bg-white
                            overflow-hidden
                            right-0
                            top-12
                            text-sm
                        "
                    >
                        <div className="flex flex-col cursor-pointer">
                            <MenuItem onClick={() => {}} label="Login" />
                            <MenuItem onClick={() => {}} label="Sign up" />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserMenu;

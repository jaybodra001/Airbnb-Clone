'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";

const Logo = () => {
    const router = useRouter();

    return (
        <Image 
            src="/images/Logo.png" 
            className="md:block cursor-pointer" 
            alt="Logo" 
            width={100} 
            height={100} 
        />
    );
}

export default Logo;

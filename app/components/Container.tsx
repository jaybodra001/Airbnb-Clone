'use client';

interface ContainerProps {
    children: React.ReactNode;
}

const Container : React.FC<ContainerProps> = ({ children }) => {
    return ( 
        <div className="max-w-[2520px] mx-auto xl:px-20 sm:px-2 px-4">
            <h1>{children}</h1>
        </div>
     );
}
 
export default Container;
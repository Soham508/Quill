import React from 'react';
import Header from './Header';
//import { BiMessageSquareDots } from 'react-icons/bi';
import UsersCard from "@/components/UsersCard";
import LeftBar from '../LeftBar';

const Layout = ({ children }: { children: React.ReactNode }) => {


    return (
        <>
            <div className='min-h-screen w-full flex justify-center bg-slate-200'>
                <div className='h-full w-[90%] flex flex-col'>
                    <Header />
                    <div className='h-full w-full z-0 flex flex-row gap-2 mb-6'>

                        <div className='h-80 w-1/4  flex justify-center mt-4 drop-shadow-lg rounded-xl mb-4  bg-slate-100'>
                            <LeftBar />
                        </div>

                        <div className='h-full w-1/2 flex justify-center '>
                            {children}
                        </div>
                        <div className='h-1/2 w-1/4  flex justify-center mt-4 p-4 drop-shadow-lg rounded-xl bg-slate-100'>
                            <UsersCard />
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Layout
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { GoHome, GoSearch } from 'react-icons/go';
import { BiMessageSquareDots } from 'react-icons/bi';
import { IoNotificationsOutline } from 'react-icons/io5';


const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <div className='h-full w-full flex justify-center bg-slate-200'>
                <div className='h-full w-[90%] flex flex-col'>
                    <Header />
                    <div className='h-screen w-full flex flex-row gap-2 mb-6'>
                        <div className='h-full w-1/5  flex justify-center mt-4 p-2 drop-shadow-lg rounded-xl mb-4  bg-slate-100'>
                            <div className='h-screen w-full bg-zinc-100 p-2 gap-2 rounded-lg flex flex-col justify-start items-center'>
                                <div className='w-full h-14 p-2 flex flex-row gap-4 justify-start items-center rounded-lg hover:bg-zinc-200 cursor-pointer bg-slate-100'>
                                    <GoHome color='grey' size={28} />
                                    <span className='text-xl text-[grey] font-semibold'> Home</span>
                                </div>
                                <div className='w-full h-14 p-2 flex flex-row gap-4 justify-start items-center rounded-lg hover:bg-zinc-200 cursor-pointer bg-slate-100'>
                                    <GoSearch color='grey' size={28} />
                                    <span className='text-xl text-[grey] font-semibold'> Search</span>
                                </div>
                                <div className='w-full h-14 p-2 flex flex-row gap-4 justify-start items-center rounded-lg hover:bg-zinc-200 cursor-pointer bg-slate-100'>
                                    <BiMessageSquareDots color='grey' size={28} />
                                    <span className='text-xl text-[grey] font-semibold'> Messages</span>
                                </div>
                                <div className='w-full h-14 p-2 flex flex-row gap-4 justify-start items-center rounded-lg hover:bg-zinc-200 cursor-pointer bg-slate-100'>
                                    <IoNotificationsOutline color='grey' size={28} />
                                    <span className='text-xl text-[grey] font-semibold'> Notification</span>
                                </div>
                            </div>
                        </div>
                        <div className='h-full w-4/5 flex justify-center'>
                            {children}
                        </div>
                    </div>

                    <Footer />
                </div>
            </div>
        </>
    )
}

export default Layout
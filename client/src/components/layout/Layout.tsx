import React from 'react';
import Header from './Header';
import { GoHome, GoSearch } from 'react-icons/go';
import { BiMessageSquareDots } from 'react-icons/bi';
import { IoCreateOutline, IoNotificationsOutline } from 'react-icons/io5';
import UsersCard from "@/components/UsersCard";
import { useNavigate } from 'react-router-dom';

const Layout = ({ children }: { children: React.ReactNode }) => {
    const navigate = useNavigate();

    return (
        <>
            <div className='h-full w-full flex justify-center bg-slate-200'>
                <div className='h-full w-[90%] flex flex-col'>
                    <Header />
                    <div className='h-screen w-full z-0 flex flex-row gap-2 mb-6'>
                        <div className='h-1/2 w-1/4  flex justify-center mt-4 drop-shadow-lg rounded-xl mb-4  bg-slate-100'>
                            <div className='h-full w-full bg-zinc-100 p-2 gap-2 rounded-lg flex flex-col items-center'>
                                <div className='w-full h-14 p-2 flex flex-row gap-4 justify-start items-center rounded-lg hover:bg-zinc-200 cursor-pointer bg-slate-100'
                                    onClick={() => { navigate("/") }}>
                                    <GoHome color='grey' size={28} />
                                    <span className='text-xl text-[grey] font-semibold'> Home</span>
                                </div>
                                <div className='w-full h-14 p-2 flex flex-row gap-4 justify-start items-center rounded-lg hover:bg-zinc-200 cursor-pointer bg-slate-100'
                                    onClick={() => { navigate("/search") }}>
                                    <GoSearch color='grey' size={28} />
                                    <span className='text-xl text-[grey] font-semibold'> Search</span>
                                </div>
                                <div className='w-full h-14 p-2 flex flex-row gap-4 justify-start items-center rounded-lg hover:bg-zinc-200 cursor-pointer bg-slate-100'
                                    onClick={() => { navigate("/message") }}
                                >
                                    <BiMessageSquareDots color='grey' size={28} />
                                    <span className='text-xl text-[grey] font-semibold'> Messages</span>
                                </div>
                                <div className='w-full h-14 p-2 flex flex-row gap-4 justify-start items-center rounded-lg hover:bg-zinc-200 cursor-pointer bg-slate-100'>
                                    <IoNotificationsOutline color='grey' size={28} />
                                    <span className='text-xl text-[grey] font-semibold'> Notification</span>
                                </div>
                                <div className='w-full h-14 p-2 flex flex-row gap-4 justify-start items-center rounded-lg hover:bg-zinc-200 cursor-pointer bg-slate-100'
                                    onClick={() => { navigate("/post") }}>
                                    <IoCreateOutline color='grey' size={28} />
                                    <span className='text-xl text-[grey] font-semibold'> Create Post</span>
                                </div>
                            </div>
                        </div>
                        <div className='h-full w-1/2 flex justify-center'>
                            {children}
                        </div>
                        <div className='h-full w-1/4  flex justify-center mt-4 p-2 drop-shadow-lg rounded-xl mb-4  bg-slate-100'>
                            <UsersCard />
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Layout
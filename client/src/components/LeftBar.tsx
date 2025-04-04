import { IoCreateOutline, IoNotificationsOutline } from 'react-icons/io5';
import { GoHome, GoSearch } from 'react-icons/go';
import { useNavigate } from 'react-router-dom';


const LeftBar = () => {
    const navigate = useNavigate();
    return (
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
    )
}

export default LeftBar
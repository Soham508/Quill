import { IoCreateOutline, IoNotificationsOutline } from 'react-icons/io5';
import { GoHome, GoSearch } from 'react-icons/go';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/Auth';
import { Tooltip } from 'flowbite-react';


const LeftBar = () => {
    const navigate = useNavigate();
    const [auth] = useAuth();

    return (
        <div className="h-full w-full bg-zinc-100 p-2 gap-2 rounded-lg flex flex-col items-center">
            <div
                className="w-full h-14 p-2 flex flex-row gap-4 justify-start items-center rounded-lg hover:bg-zinc-200 cursor-pointer bg-slate-100"
                onClick={() => {
                    navigate("/");
                }}
            >
                <GoHome color="grey" size={28} />
                <span className="text-xl text-[grey] font-semibold"> Home</span>
            </div>
            <div
                className="w-full h-14 p-2 flex flex-row gap-4 justify-start items-center rounded-lg hover:bg-zinc-200 cursor-pointer bg-slate-100"
                onClick={() => {
                    navigate("/search");
                }}
            >
                <GoSearch color="grey" size={28} />
                <span className="text-xl text-[grey] font-semibold"> Search</span>
            </div>

            <div
                className={`w-full h-14 p-2 flex flex-row gap-4 justify-start items-center rounded-lg hover:bg-zinc-200 ${auth.user ? "cursor-pointer" : "cursor-not-allowed"
                    } bg-slate-100`}
            >
                <IoNotificationsOutline color="grey" size={28} />
                <Tooltip
                    content={"Please login to use this feature"}
                    placement="top"
                    style="dark"
                    arrow={false}
                    className={`${auth.user ? "hidden" : ""}`}
                    animation="duration-1000"
                >
                    <span className="text-xl text-[grey] font-semibold">
                        {" "}
                        Notification
                    </span>
                </Tooltip>
            </div>
            <div
                className={`w-full h-14 p-2 flex flex-row gap-4 justify-start items-center rounded-lg hover:bg-zinc-200 ${auth.user ? "cursor-pointer" : "cursor-not-allowed"
                    } bg-slate-100`}
                onClick={() => {
                    if (auth.user) {

                        navigate("/post");
                    }
                }}
            >
                <IoCreateOutline color="grey" size={28} />
                <Tooltip
                    content={"Please login to use this feature"}
                    placement="top"
                    style="dark"
                    className={`${auth.user ? "hidden" : ""}`}
                    arrow={false}
                    animation="duration-1000"
                >
                    <span className="text-xl text-[grey] font-semibold">
                        {" "}
                        Create Post
                    </span>
                </Tooltip>
            </div>
        </div>
    );
}

export default LeftBar
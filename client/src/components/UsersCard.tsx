import { Button, Card, Tooltip } from "flowbite-react";
//import userLogo from "./../../public/user1.jpg"
//import PopoverProfile from "./PopoverProfile";
import { FaUserCircle } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/Auth";
import toast, { Toaster } from "react-hot-toast"
import axios from "axios";


const UsersCard = () => {
    const [auth] = useAuth();
    interface User {
        user_id: number;
        username: string;
        email: string;
        full_name?: string | null;
        bio?: string | null;
        profile_picture_url?: string | null;
        created_at: string;
        updated_at: string;
    }

    const [following, setFollowing] = useState<User[] | null>()

    useEffect(() => {
        const fetchFollowers = async () => {
            try {
                const userId = auth.user?.user_id
                const res = await axios.get(`https://blog-vista-psi.vercel.app/api/v1/user/followings/${userId}`);

                if (res) {
                    console.log(res.data);
                    setFollowing(res.data.following)

                } else {
                    toast.error("Failed to Fetch user")
                }

            } catch (err) {
                console.log(err)
            }
        }

        fetchFollowers();

    }, [auth.user?.user_id])


    return (
        <>
            <Card className="w-9/12 h-1/2 overflow-y-scroll m-2 ">
                <div className="flex justify-between">
                    <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Followings</h5>
                    <a href="#" className="text-sm font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                        View all
                    </a>
                </div>
                <div className="flow-root">
                    <ul className="divide-y divide-gray-200 dark:divide-gray-700 ">
                        {
                            following?.map((user) => (
                                <li className="py-3 sm:py-4" key={user.user_id}>
                                    <div className="flex items-center justify-between space-x-4">
                                        <div className="flex flex-row gap-4 items-center">
                                            <div className="shrink-0 cursor-pointer">
                                                <FaUserCircle size={36} />
                                            </div>

                                            <div className="min-w-0 flex-1">
                                                <p className="truncate text-sm font-medium text-gray-900 dark:text-white">{user.username}</p>
                                                <p className="truncate text-sm text-gray-500 dark:text-gray-400">{user.full_name}</p>
                                            </div>
                                        </div>
                                        <Tooltip content="Tap to view profile" placement="top" arrow={false} style="dark" animation='duration-1000'>
                                            <Button className="bg-gradient-to-r from-zinc-600 via-zinc-800 to-zinc-900 text-white focus:ring-4 focus:ring-zinc-400 enabled:hover:bg-gradient-to-br dark:focus:ring-zinc-700 ">
                                                View
                                            </Button>
                                        </Tooltip>
                                    </div>
                                </li>
                            ))
                        }

                    </ul>
                </div>
            </Card>
            <Toaster />
        </>
    )
}

export default UsersCard
import { Button, Card, Tooltip, Popover } from "flowbite-react";
import userLogo from "./../../public/user1.jpg"
import PopoverProfile from "./PopoverProfile";
import { FaUserCircle } from "react-icons/fa";



const UsersCard = () => {

    const users = [
        { id: 1, name: 'Neil Sims', username: 'email@windster.com' },
        { id: 2, name: 'Sam wade', username: 'sam@windster.com' },
        { id: 3, name: 'ryan colman', username: 'ryan@windster.com' },
        { id: 4, name: 'Harshit Singh', username: 'lodu@windster.com' },
        { id: 5, name: 'orunesh tomar', username: 'orunesh@windster.com' },

    ]

    return (
        <>
            <Card className="w-auto h-1/2 overflow-y-scroll m-2 ">
                <div className="flex items-center mt-8 justify-between">
                    <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Suggested</h5>
                    <a href="#" className="text-sm font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                        View all
                    </a>
                </div>
                <div className="flow-root">
                    <ul className="divide-y divide-gray-200 dark:divide-gray-700 ">
                        {
                            users?.map((user) => (
                                <li className="py-3 sm:py-4" key={user.id}>
                                    <div className="flex items-center space-x-4">
                                        <Popover content={<PopoverProfile user={user} profile_pic={userLogo} />} placement="left" trigger="hover">
                                            <div className="shrink-0 cursor-pointer">
                                                <FaUserCircle size={36} />
                                            </div>
                                        </Popover>
                                        <div className="min-w-0 flex-1">
                                            <p className="truncate text-sm font-medium text-gray-900 dark:text-white">{user.name}</p>
                                            <p className="truncate text-sm text-gray-500 dark:text-gray-400">{user.username}</p>
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
        </>
    )
}

export default UsersCard
import { Button, Card, Tooltip, Popover } from "flowbite-react";
import userLogo from "./../../public/user1.jpg"
import PopoverProfile from "./PopoverProfile";



const UsersCard = () => {

    const users = [
        { id: 1, name: 'Neil Sims', username: 'email@windster.com' },
        { id: 2, name: 'Sam wade', username: 'sam@windster.com' },
        { id: 3, name: 'ryan colman', username: 'ryan@windster.com' },
        { id: 4, name: 'Harshit Singh', username: 'harshit@windster.com' },
        { id: 5, name: 'orunesh tomar', username: 'orunesh@windster.com' },

    ]

    return (
        <>
            <Card className="max-w-sm overflow-y-hidden">
                <div className="mb-4 flex items-center justify-between">
                    <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Latest Customers</h5>
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
                                                <img
                                                    alt="Neil image"
                                                    height="32"
                                                    src={userLogo}
                                                    width="32"
                                                    className="rounded-full"
                                                />
                                            </div>
                                        </Popover>
                                        <div className="min-w-0 flex-1">
                                            <p className="truncate text-sm font-medium text-gray-900 dark:text-white">{user.name}</p>
                                            <p className="truncate text-sm text-gray-500 dark:text-gray-400">{user.username}</p>
                                        </div>
                                        <Tooltip content="Tap to view profile" placement="top" arrow={false} style="dark" animation='duration-1000'>
                                            <Button gradientMonochrome="info">
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
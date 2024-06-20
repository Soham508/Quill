
const PopoverProfile = ({ user }: {
    user: {
        user_id: number;
        username: string;
        email: string;
        full_name?: string | null;
        bio?: string | null;
        profile_picture_url?: string | null;
        created_at: string;
        updated_at: string;
    }
}) => {

    return (
        <div className="w-64 p-3 flex flex-col">
            <div className="mb-2 flex items-center justify-between">
                <a href="#">
                    <img
                        className="h-10 w-10 rounded-full"
                        src={user.profile_picture_url as string}
                        alt={user.username}
                    />
                </a>
                <div>
                    <button
                        type="button"
                        className="rounded-lg bg-blue-700 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Follow
                    </button>
                </div>
            </div>
            <p id="profile-popover" className="text-base font-semibold flex justify-start leading-none text-gray-900 dark:text-white">
                <a href="#">{user.full_name}</a>
            </p>
            <p className="mb-3 text-sm font-normal flex self-start">
                <a href="#" className="hover:underline">
                    {user.username}
                </a>
            </p>
            <p className="mb-3 text-sm font-normal -ml-2 flex self-start">
                <a>
                    {user.bio}
                </a>
            </p>
            <ul className="flex text-sm justify-between">
                <li className="me-2">
                    <a href="#" className="hover:underline flex gap-1">
                        <span className="font-semibold text-gray-900 dark:text-white">799</span>
                        <span>Following</span>
                    </a>
                </li>
                <li>
                    <a href="#" className="hover:underline flex gap-1">
                        <span className="font-semibold text-gray-900 dark:text-white">3,758</span>
                        <span>Followers</span>
                    </a>
                </li>
            </ul>
        </div>
    )
}

export default PopoverProfile
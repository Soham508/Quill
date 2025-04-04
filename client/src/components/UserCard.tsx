import { useAuth } from "@/context/Auth";
import { BACKEND_URL } from "@/types";
import axios from "axios";
import { Button, Card } from "flowbite-react"
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom"

interface UserCardProps {
    username: string;
    id: number;
    isFollowed: boolean;
}

const UserCard = ({ username, id, isFollowed }: UserCardProps) => {
    const navigate = useNavigate();
    const [auth] = useAuth();

    const handleFollow = async () => {
        try {
            const res = await axios.post(`${BACKEND_URL}/api/v1/user/follow`, {
                follower_id: auth.user?.user_id,
                followee_id: id,
            });
            if (res) {
                console.log(res.data.success);
                toast.success(`You're  now following ${username}`);
                setTimeout(() => {
                    window.location.reload();
                }, 1200)
            } else {
                toast.error("Failed to Fetch user");
            }
        } catch (err) {
            toast.error("Something went wrong");
            console.log(err);
        }
    };
    const handleUnFollow = async () => {
        try {
            const res = await axios.post(`${BACKEND_URL}/api/v1/user/unfollow`, {
                follower_id: auth.user?.user_id,
                followee_id: id,
            });
            if (res.data.success) {
                console.log(res.data);
                toast.success(`You have unfollowed ${username}`);
                setTimeout(() => {
                    window.location.reload();
                }, 1200)
            } else {
                toast.error("Failed to Fetch user");
            }
        } catch (err) {
            toast.error("Something went wrong");
            console.log(err);
        }
    };

    return (
        <Card className="flex flex-col h-full w-full rounded-lg bg-slate-100 shadow-xl hover:shadow-2xl hover:scale-105 gap-2 items-center justify-between p-4 cursor-pointer transition-all duration-500 ease-in-out">
            <div className="flex justify-end px-4 pt-4"></div>
            <div className="flex flex-col items-center pb-10">
                <img
                    alt="Bonnie image"
                    height="96"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDPJEa7PNyWhTAsdzJpTxwGnjbTnK_qylSIJjp3XTZM9r59DUWoMaqjj6z-4Q5dn0PRPY&usqp=CAU"
                    width="96"
                    className="mb-3 rounded-full shadow-lg"
                />
                <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                    {username}
                </h5>
                <div className="mt-4 flex space-x-3 lg:mt-6">
                    {isFollowed ? (<Button className="bg-gradient-to-r from-red-400 via-red-500 to-red-600 text-white hover:bg-gradient-to-br focus:ring-red-300 dark:focus:ring-red-800" onClick={handleUnFollow}>
                        Unfollow
                    </Button>) : (
                        <Button className="bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 text-white hover:bg-gradient-to-br focus:ring-cyan-300 dark:focus:ring-cyan-800" onClick={handleFollow}>
                            Follow
                        </Button>
                    )}

                    <Button
                        color="dark"
                        onClick={() => {
                            navigate(`/message/${id}`);
                        }}
                    >
                        Message
                    </Button>
                </div>
            </div>
        </Card >
    );
};

export default UserCard
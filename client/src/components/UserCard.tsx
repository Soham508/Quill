import { useAuth } from "@/context/Auth";
import axios from "axios";
import { Button, Card } from "flowbite-react"
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom"

const UserCard = ({ username, id }: { username: string, id: number }) => {
    const navigate = useNavigate();
    const [auth] = useAuth();

    const handleFollow = async () => {
        try {
            const res = await axios.post('https://blog-vista-psi.vercel.app/api/v1/user/follow', {
                follower_id: auth.user?.user_id, followee_id: id
            })
            if (res) {
                console.log(res.data);
                toast.success(`You're  now following ${username}`)
            } else {
                toast.error("Failed to Fetch user")
            }

        } catch (err) {
            toast.error("Something went wrong")
            console.log(err)
        }
    }


    return (
        <Card className="max-w-sm">
            <div className="flex justify-end px-4 pt-4">

            </div>
            <div className="flex flex-col items-center pb-10">
                <img
                    alt="Bonnie image"
                    height="96"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDPJEa7PNyWhTAsdzJpTxwGnjbTnK_qylSIJjp3XTZM9r59DUWoMaqjj6z-4Q5dn0PRPY&usqp=CAU"
                    width="96"
                    className="mb-3 rounded-full shadow-lg"
                />
                <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{username}</h5>
                <span className="text-sm text-gray-500 dark:text-gray-400">Visual Designer</span>
                <div className="mt-4 flex space-x-3 lg:mt-6">
                    <Button gradientMonochrome="cyan" onClick={handleFollow}>
                        Follow
                    </Button>
                    <Button color="dark" onClick={() => { navigate(`/message/${id}`) }}>
                        Message
                    </Button>
                </div>
            </div>

        </Card>
    )
}

export default UserCard
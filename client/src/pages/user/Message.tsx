/* eslint-disable @typescript-eslint/no-explicit-any */
import Layout from "@/components/layout/Layout"
import { useAuth } from "@/context/Auth"
import { Avatar, Button } from "flowbite-react"
import userIcon from "./../../../public/user1.jpg"
import { BsSendFill } from "react-icons/bs"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import toast, { Toaster } from "react-hot-toast"
import axios from "axios";
import { db } from "./../../firebaseConfig"
import { collection, addDoc, query, orderBy, serverTimestamp, onSnapshot } from 'firebase/firestore';
import { generateChatRoomId } from "@/lib/utils"

const Message = () => {
    const [auth] = useAuth()
    const { id } = useParams();
    const [user, setUser] = useState<User | null>()
    const [message, setMessage] = useState<string>('')
    const [chats, setChats] = useState<any[]>([])

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

    async function addMessage(chatRoomId: string, text: string, senderId: number) {
        try {
            const messagesRef = collection(db, 'messages', chatRoomId, 'messages');
            const newMessageRef = await addDoc(messagesRef, {
                text: text,
                senderId: senderId,
                timestamp: serverTimestamp(),
            });
            console.log('Message added with ID: ', newMessageRef.id);
            setMessage('');
        } catch (error) {
            console.error('Error adding message: ', error);
            toast.error("Could not send the message");
        }
    }

    function subscribeToMessages(chatRoomId: string, callback: any) {
        const messagesRef = collection(db, 'messages', chatRoomId, 'messages');
        const q = query(messagesRef, orderBy('timestamp', 'asc'));

        return onSnapshot(q, (querySnapshot) => {
            const messages: any = [];
            querySnapshot.forEach((doc) => {
                messages.push({
                    id: doc.id,
                    ...doc.data()
                });
            });
            callback(messages);
        });
    }

    useEffect(() => {
        if (auth.user && user) {
            const chatRoomId = generateChatRoomId(auth.user.username, user.username);
            const unsubscribe = subscribeToMessages(chatRoomId, (fetchedMessages: any) => {
                setChats(fetchedMessages);
                console.log(fetchedMessages)

            });


            return () => unsubscribe();
        }
    }, [auth.user, user]);



    useEffect(() => {
        const fetchuser = async () => {
            try {
                const res = await axios.get(`https://blog-vista-psi.vercel.app/api/v1/user/id/${id}`);

                if (res) {

                    setUser(res.data)
                } else {
                    toast.error("Failed to Fetch user")
                }

            } catch (err) {
                toast.error("Something went wrong")
                console.log(err)
            }

        }

        fetchuser();
    }, [id])


    return (

        <Layout>
            <div className="flex flex-col justify-between h-4/5 w-4/5 gap-y-6 mt-4 p-2 drop-shadow-lg rounded-xl mb-4 bg-slate-100">
                <div className="h-full w-full overflow-y-scroll">
                    <div className="flex w-full flex-col gap-4">
                        <h1 className="text-2xl text-zinc-500 font-semibold m-2"> Message </h1>

                        {
                            chats?.map((chat) => (
                                <div className="w-full overflow-y-scroll p-2 flex flex-col" key={chat.id}>
                                    <div className={`flex w-auto gap-2 flex-col p-2 bg-zinc-300 self-start ${chat.senderId == auth.user?.user_id ? 'bg-slate-300 self-end rounded-l-xl rounded-br-xl' : 'bg-zinc-300 self-start rounded-r-xl rounded-bl-xl'} rounded-r-xl rounded-bl-xl`}>
                                        <div className="flex flex-row gap-2 justify-between items-center">
                                            <Avatar img={(chat.senderId == auth.user?.user_id ? auth.user?.profile_picture_url as string : userIcon)} size="sm" alt="avatar of Jese" rounded />

                                        </div>
                                        <div className="flex justify-start">
                                            {chat.text}
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="flex w-full gap-2 items-center justify-center bottom-0">
                    <input type="text" value={message} onChange={(e) => { setMessage(e.target.value) }} placeholder="Type something..." className="border w-auto border-gray-400 rounded-md px-4 py-2 focus:outline-zinc-400 focus:ring-0 focus:border-0" />
                    <Button color="dark"
                        onClick={() => {
                            const room_id = generateChatRoomId(auth.user?.username as string, user?.username as string);
                            addMessage(room_id, message, auth.user?.user_id as number)
                        }}>
                        Send
                        <BsSendFill className="ml-2 h-5 w-5" />
                    </Button>
                </div>
            </div>
            <Toaster />
        </Layout>
    )
}

export default Message
/* eslint-disable @typescript-eslint/no-explicit-any */
import Layout from "@/components/layout/Layout";
import PostCard from "@/components/PostCard";
import { useAuth } from "@/context/Auth";
import { BACKEND_URL } from "@/types";
import axios from "axios";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast"
import { HiOutlineArrowDown } from "react-icons/hi";

const Home = () => {
    const [auth] = useAuth();
    const [feed, setFeed] = useState<any[]>([]);
    const [pageId, setPageId] = useState(1);



    const getFeed = async () => {
        try {
            const user_id = auth.user?.user_id || 5;
            const response = await axios.get(`${BACKEND_URL}/api/v1/post/feed/${user_id}?page=${pageId}&limit=10`);
            console.log("New Post:", response.data);
            if (response.data.posts.length === 0) {
                toast.error("No more posts to load");
                return;
            }
            setFeed((prevFeed) => [...prevFeed, ...response.data.posts]);
        } catch (error) {
            console.error("Error creating post:", error);
        }
    };

    useEffect(() => {
        getFeed();
    }, [pageId]);

    return (
        <Layout>
            <div className="flex flex-col w-full items-center gap-y-6 mt-4 mb-4 bg-slate-100 rounded-xl drop-shadow-lg">
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 p-4">
                    {feed?.map((post, index) => (
                        <PostCard
                            key={index}
                            title={post.title}
                            content={post.content}
                            image_url={post.thumbnail}
                            likes={post.likes}
                            username={post.username}
                            full_name={post.full_name}
                        />
                    ))}
                </div>
                <button
                    onClick={() => {
                        setPageId((prevPageId) => prevPageId + 1);
                    }}
                    color="dark"
                    className="w-16 h-16 bg-black hover:bg-black/80 rounded-full shadow-xl shadow-slate-800 p-4 hover:scale-105 transition-all duration-500 ease-in-out flex items-center justify-center mb-4"
                >
                    <HiOutlineArrowDown className="w-full h-full" color="white" />
                </button>
                {pageId}
            </div>
            <Toaster />
        </Layout>
    );
};

export default Home;
/* eslint-disable @typescript-eslint/no-explicit-any */
import Layout from "@/components/layout/Layout";
import PostCard from "@/components/PostCard";
import { useAuth } from "@/context/Auth";
import axios from "axios";
import { useEffect, useState } from "react";

const Home = () => {
    const [auth] = useAuth();
    const [feed, setFeed] = useState<any[]>([]);

    const getFeed = async () => {
        try {
            const user_id = auth.user?.user_id || 5;
            const response = await axios.get(`http://localhost:8000/api/v1/post/feed/${user_id}`);
            console.log("New Post:", response.data);
            setFeed(response.data.posts);
        } catch (error) {
            console.error("Error creating post:", error);
        }
    };

    useEffect(() => {
        getFeed();
    }, []);

    return (
        <Layout>
            <div className="flex flex-col w-full gap-y-6 mt-4 mb-4 bg-slate-100 rounded-xl drop-shadow-lg">

                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 p-4">
                    {feed?.map((post, index) => (
                        <PostCard
                            key={index}
                            title={post.title}
                            content={post.content}
                            image_url={post.thumbnail}
                        />
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default Home;
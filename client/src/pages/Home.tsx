/* eslint-disable @typescript-eslint/no-explicit-any */
import Layout from "@/components/layout/Layout";
import PostCard from "@/components/PostCard";
import { useAuth } from "@/context/Auth";
import axios from "axios";
import { useEffect, useState } from "react";

//import UsersCard from "@/components/UsersCard";
//import SearchModel from "@/components/SearchModel";



const Home = () => {
    const [auth] = useAuth();
    const [feed, setFeed] = useState<any[]>([]);

    //const getFeed = async () => {
    //
    //    try {
    //        const user_id = auth.user?.user_id || 5
    //        const response = await axios.get(`http://localhost:8000/api/v1/post/feed/${user_id}`);
    //        console.log('New Post:', response.data);
    //        setFeed(response.data);
    //
    //    } catch (error) {
    //        console.error('Error creating post:', error);
    //    }
    //};
    //
    //useEffect(() => {
    //    getFeed();
    //}, [])

    return (
        <Layout>
            <div className="flex flex-col w-full gap-y-6 mt-4 p-2 drop-shadow-lg rounded-xl mb-4 h-full bg-slate-100">

                <div className="h-full grid grid-cols-6 w-full gap-4">

                    <div className="h-full bg-zinc-200 overflow-y-scroll overflow-x-hidden flex-col flex items-center col-span-6">
                        <div className="h-full w-full flex flex-col items-center gap-4 p-2  rounded-lg m-2">
                            {
                                feed?.map((post) => (
                                    <PostCard title={post.title} content={post.content} image_url={post.thumbnail} />
                                ))
                            }
                        </div>
                    </div>

                </div>

            </div>

        </Layout>
    )
}

export default Home
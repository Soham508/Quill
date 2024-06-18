import Layout from "@/components/layout/Layout";
import PostCard from "@/components/PostCard";
import UsersCard from "@/components/UsersCard";
//import SearchModel from "@/components/SearchModel";



const Home = () => {


    return (
        <Layout>
            <div className="flex flex-col w-full gap-y-6 mt-4 p-2 drop-shadow-lg rounded-xl mb-4 h-full bg-slate-100">

                <div className="h-full grid grid-cols-6 w-full gap-4">

                    <div className="h-full bg-zinc-200 overflow-y-scroll flex justify-center col-span-4">
                        <div className="h-full w-4/5 flex flex-col items-center gap-4 p-2  rounded-lg m-2">
                            <PostCard />
                            <PostCard />
                            <PostCard />
                        </div>
                    </div>
                    <div className="bg-zinc-200 flex col-span-2 justify-center">
                        <UsersCard />
                    </div>
                </div>

            </div>

        </Layout>
    )
}

export default Home
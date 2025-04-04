/* eslint-disable @typescript-eslint/no-explicit-any */
import Layout from "@/components/layout/Layout"
import axios from "axios"
import { Button, Spinner } from "flowbite-react"
import { useState } from "react"
import toast, { Toaster } from "react-hot-toast"
import { GoSearch } from "react-icons/go"
import UserCard from "@/components/UserCard"
import { useAuth } from "./../context/Auth"



const Search = () => {
    const [auth] = useAuth()
    const [search, setSearch] = useState<string>('')
    const [results, setResults] = useState<any>([])
    const [loading, setLoading] = useState(false)


    const handleSearch = async () => {
        if (!search) return;

        try {
            setLoading(true);

            const res = await axios.get("http://localhost:8000/api/v1/user/search", {
                params: {
                    q: search,
                    follower_id: auth?.user?.user_id
                }
            });

            if (res?.data) {
                console.log(res.data);
                setResults(res.data.users);
            } else {
                toast.error("Failed to fetch users");
            }
        } catch (err) {
            toast.error("Something went wrong");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout>
            <div className="flex flex-col w-full gap-y-6 mt-4 p-2 drop-shadow-lg rounded-xl mb-4 bg-slate-100 transition-all duration-500 ease-in-out">
                <div className="w-full items-center justify-center">
                    <h1 className="text-3xl font-semibold"> Search for users</h1>
                </div>

                <div className="w-full flex flex-row gap-2 items-center justify-center">
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                        }}
                        placeholder="Type something..."
                        className="border w-auto border-gray-800 rounded-md px-4 py-2 focus:outline-zinc-700 focus:ring-0 focus:border-0"
                    />

                    <Button
                        color="dark"
                        className=" focus:ring-zinc-400 "
                        onClick={handleSearch}
                    >
                        {" "}
                        {loading && (
                            <Spinner
                                color="gray"
                                className=" mr-2 mb-1 h-5 w-5"
                                size="lg"
                            />
                        )}{" "}
                        Search
                        <GoSearch className="ml-2 h-5 w-5" />
                    </Button>
                </div>
                <div
                    className="w-full grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 p-4 items-center"
                >
                    {results.length > 0 &&
                        results.map((user: any) => (
                            <UserCard
                                key={user?.user_id}
                                username={user?.username}
                                id={user?.user_id}
                                isFollowed={user?.is_followed}
                            />

                        ))}
                </div>
            </div>
            <Toaster />
        </Layout>
    );
}

export default Search

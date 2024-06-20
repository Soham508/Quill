/* eslint-disable @typescript-eslint/no-explicit-any */
import Layout from "@/components/layout/Layout"
import axios from "axios"
import { Button, Spinner } from "flowbite-react"
import { useState } from "react"
import toast, { Toaster } from "react-hot-toast"
import { GoSearch } from "react-icons/go"
import UserCard from "@/components/UserCard"
import { useAuth } from "@/context/Auth"


const Search = () => {
    const [auth] = useAuth();
    const [search, setSearch] = useState<string>('')
    const [results, setResults] = useState<any>({})
    const [loading, setLoading] = useState(false)

    const handleFollow = async () => {
        try {
            const res = await axios.post('https://blog-vista-psi.vercel.app/api/v1/user/follow', {
                follower_id: auth.user?.user_id, followee_id: results.user_id
            })
            if (res) {
                console.log(res.data);
                toast.success(`You're  now following ${results?.username}`)
            } else {
                toast.error("Failed to Fetch user")
            }

        } catch (err) {
            toast.error("Something went wrong")
            console.log(err)
        }
    }

    const handleSearch = async () => {

        try {
            setLoading(true)
            const res = await axios.get(`https://blog-vista-psi.vercel.app/api/v1/user/${search}`);

            if (res) {
                console.log(res.data);
                setResults(res.data)
                setLoading(false)
            } else {
                toast.error("Failed to Fetch user")
                setLoading(false)
            }

        } catch (err) {
            toast.error("Something went wrong")
            console.log(err)
            setLoading(false)
        }

    }

    return (
        <Layout>
            <div className="flex flex-col h-4/5 w-4/5 gap-y-6 mt-4 p-2 drop-shadow-lg rounded-xl mb-4 bg-slate-100">
                <div className="w-full items-center justify-center">
                    <h1 className="text-3xl font-semibold"> Search for users</h1>
                </div>

                <div className="w-full flex flex-row gap-2 items-center justify-center">
                    <input type="text" value={search} onChange={(e) => { setSearch(e.target.value) }} placeholder="Type something..." className="border w-auto border-gray-800 rounded-md px-4 py-2 focus:outline-zinc-700 focus:ring-0 focus:border-0" />

                    <Button color="dark" className=" focus:ring-zinc-400" onClick={handleSearch}> {loading && <Spinner color="gray" className=" mr-2 mb-1 h-5 w-5" size="lg" />} Search<GoSearch className="ml-2 h-5 w-5" /></Button>
                </div>
                {results.user_id &&
                    <div className="flex w-full items-center justify-center">
                        <UserCard username={results?.username} id={results.user_id} />
                    </div>
                }
            </div>
            <Toaster />
        </Layout>
    )
}

export default Search

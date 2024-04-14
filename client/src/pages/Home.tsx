import Layout from "@/components/layout/Layout";
import { Carousel } from "flowbite-react";
import carausel from "./../../public/carouse.svg"
import UsersCard from "@/components/UsersCard";
import SearchModel from "@/components/SearchModel";



const Home = () => {


    return (
        <Layout>
            <div className="flex flex-col w-full gap-y-6 mt-4 p-2 h-screen bg-slate-100">
                <SearchModel />
                <div className="w-full grid grid-cols-2 h-2/5 gap-4">
                    <div className="flex justify-center col-span-1 ">
                        <Carousel slideInterval={5000} className="h-full w-3/4">
                            <img src={carausel} alt="..." />
                            <img src={carausel} alt="..." />
                            <img src={carausel} alt="..." />
                            <img src={carausel} alt="..." />
                            <img src={carausel} alt="..." />
                        </Carousel>
                    </div>
                    <div className="bg-zinc-100 flex justify-end mr-10">
                        <UsersCard />
                    </div>
                </div>

            </div>

        </Layout>
    )
}

export default Home
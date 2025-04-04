import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "@/context/Auth";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Spinner } from "flowbite-react";
import toast, { Toaster } from 'react-hot-toast';



export default function PrivateRoute() {
    const [ok, setOk] = useState(false);
    const [auth] = useAuth();
    const navigate = useNavigate();

    useEffect(() => {

        const authCheck = async () => {
            const data = localStorage.getItem("auth");

            if (data) {
                const parseData = JSON.parse(data);
                const res = await axios.get(
                    "http://localhost:8000/api/v1/auth/user-auth",
                    {
                        headers: {
                            "Authorization": parseData.token
                        }
                    }
                );
                console.log(auth)
                if (res.data.ok) {
                    setOk(true);
                }
                else {
                    setOk(false);
                    toast.error("Failed to authenticate!")
                    setTimeout(() => {
                        navigate('/login')
                    }, 1500);
                }
            }
            else {
                setOk(false);
                navigate('/')
                toast.error("Failed to authenticate, please login!")
                setTimeout(() => {
                    navigate('/login')
                }, 1500);
            }
        };
        authCheck();
    }, []);

    return ok ? <Outlet /> :
        <>
            <div className="flex flex-col gap-4 items-center justify-center ">
                <Spinner aria-label="Extra large spinner example Center-aligned" className="h-24 w-24 mt-40" size="" />
                <span className="text-[40px] text-cyan-600 font-semibold">Loading...</span>
            </div>
            <Toaster />
        </>;
}

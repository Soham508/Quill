//import { Avatar, Dropdown, Navbar } from "flowbite-react";
import logo from "./../../../public/logo.jpg";
import user from "./../../../public/user1.jpg"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Button, Dropdown, Avatar, Tooltip } from "flowbite-react";
import { useAuth } from "@/context/Auth";
import toast, { Toaster } from 'react-hot-toast';
import { IoCreateOutline } from "react-icons/io5";


const Header = () => {
    const [auth] = useAuth();
    const navigate = useNavigate();
    const logOut = () => {
        localStorage.removeItem('auth');
        toast.success('Logged out')
        setTimeout(() => {
            window.location.href = "/";
        }, 1000);
    }

    return (
        <>
            <div className="w-full h-auto flex flex-row z-10 justify-between p-4 mt-2 drop-shadow-xl bg-zinc-100 rounded-xl pr-4">
                <div className="flex md:flex-row items-center gap-6">
                    <img src={logo} className="h-12 w-20 rounded-lg" alt="URL not found" />
                    <h1 className="font-bold text-3xl font-serif bg-gradient-to-r from-black to-zinc-500 bg-clip-text text-transparent"> Quill </h1>
                </div>

                <div className="flex max-md:bg-red-200 self-center flex-row items-center gap-10">
                    <Link to='/user/create-post'>
                        <Tooltip className="font-normal" content="Click here to write and publish your article " placement="bottom" animation="duration-1000" arrow={false} style="dark">
                            <Button color="dark" className="flex items-center" size='md'>
                                <IoCreateOutline className="self-center mr-1" size={18} />
                                Create a post
                            </Button>
                        </Tooltip>
                    </Link>

                </div>

                <div className="flex items-center gap-10 mr-8" >

                    {
                        auth.user ?
                            <>
                                <Dropdown
                                    className="w-36 rounded-xl drop-shadow-xl p-2 outline-3 outline-double outline-zinc-300 ring-slate-200"
                                    arrowIcon={false}
                                    inline
                                    label={
                                        <Avatar alt="User settings" img={auth.user.profile_picture_url != null ? auth.user.profile_picture_url : user} rounded />
                                    }
                                >
                                    <Dropdown.Header>
                                        <span className="block text-sm">{auth?.user?.full_name}</span>
                                        <span className="block truncate text-sm font-medium">{auth?.user?.username}</span>
                                    </Dropdown.Header>
                                    <Dropdown.Item className="hover:bg-zinc-200 rounded-xl" onClick={() => { navigate('/user/profile') }}>  Profile </Dropdown.Item>
                                    <Dropdown.Item className="hover:bg-zinc-200 rounded-xl">Dashboard</Dropdown.Item>
                                    <Dropdown.Item className="hover:bg-zinc-200 rounded-xl">Settings</Dropdown.Item>
                                    <Dropdown.Divider />
                                    <Dropdown.Item className="hover:bg-white">
                                        <Button color="failure" pill className="flex items-center" onClick={logOut}>
                                            Log out
                                        </Button>
                                    </Dropdown.Item>
                                </Dropdown>

                            </>
                            :
                            <div className="flex flex-row gap-2 mr-10 items-center">
                                <Button color="success" className="font-bold text-3xl" size={'md'} onClick={() => { navigate('/login') }}>Log in</Button>
                            </div>
                    }
                </div>
            </div>
            <Toaster />
        </>
    )
}

export default Header
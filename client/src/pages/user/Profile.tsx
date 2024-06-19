import Layout from "@/components/layout/Layout";
import { Button, Label, Textarea, TextInput } from "flowbite-react";
import { useAuth } from "@/context/Auth";
import userLogo from "./../../../public/user.jpg"
import { HiMail } from "react-icons/hi";
import { useEffect, useState } from "react";
import { User } from "@/types";
import toast, { Toaster } from "react-hot-toast"
import { GrUpdate } from "react-icons/gr";
import axios from "axios";




const Profile = () => {
    const [auth] = useAuth();
    type UserProfile = Pick<User, 'username' | 'email' | 'full_name' | 'bio' | 'password' | 'profile_picture_url'>

    const [file, setFile] = useState<File>();
    const [user, setUser] = useState<UserProfile>({
        username: "",
        email: "",
        password: "",
        full_name: "",
        profile_picture_url: null,
        bio: '',
    });

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();

        try {
            const res = await axios.post("http://localhost:8000/api/v1/user/update-profile", {
                username: user.username,
                full_name: user.full_name,
                email: user.email,
                bio: user.bio,
                profile_picture_url: user.profile_picture_url
            });

            if (res && res.data.success) {
                console.log(res.data);
                toast.success("Successfully updated!")
                setUser({ ...user, full_name: res.data.full_name, email: res.data.email, bio: res.data.bio })
                setTimeout(() => {
                    window.location.reload();
                }, 1500);
            } else {
                toast.error("Failed to update!")
            }

        } catch (err) {
            toast.error("Something went wrong")
            console.log(err)
        }

    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setFile(event.target.files[0]);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
        console.log(user)

    };

    useEffect(() => {
        const fetchuser = async () => {
            try {
                const res = await axios.get(`https://blog-vista-psi.vercel.app/api/v1/user/id/${auth.user?.user_id}`);

                if (res) {
                    console.log(res.data);
                    setUser({ ...user, username: res.data.username, full_name: res.data.full_name, email: res.data.email, bio: res.data.bio })

                } else {
                    toast.error("Failed to Fetch user")
                }

            } catch (err) {
                toast.error("Something went wrong")
                console.log(err)
            }

        }

        fetchuser();

    }, []);


    return (
        <Layout>
            <div className="flex h-full w-full items-center justify-center">
                <div className="flex flex-col max-h-full gap-4 overflow-y-scroll justify-between w-1/3 p-4 rounded-xl drop-shadow-xl bg-slate-100 mt-10">
                    <div>
                        <h1 className="font-bold text-cyan-600 text-3xl"> Profile </h1>
                    </div>
                    <div className="flex flex-col gap-4 ">
                        <div>

                            <label htmlFor="file-upload" className="flex flex-col gap-2 cursor-pointer items-center">
                                <h1 className="font-sans text-slate-500 font-semibold ">Profile picture</h1>
                                <img src={auth.user?.profile_picture_url ? auth.user.profile_picture_url : (file ? URL.createObjectURL(file) : userLogo)} className="rounded-[100%] h-36 w-36" alt="" />
                            </label>

                            <input
                                className="hidden"
                                type="file"
                                id="file-upload"
                                accept="image/*"
                                onChange={handleFileChange}
                            />
                        </div>

                        <div className="flex flex-col">
                            <div className="mb-2 block self-start">
                                <Label htmlFor="username" value="Username" />
                            </div>
                            <TextInput id="username" className="font-bold " disabled value={user.username} addon="@" color={'gray'} required />
                        </div>
                        <div className="flex flex-col">
                            <div className="mb-2 block self-start">
                                <Label htmlFor="email" value="Your email" />
                            </div>
                            <TextInput id="email" name="email" type="email" icon={HiMail} value={user.email} onChange={handleInputChange} shadow required />
                        </div>
                        <div className="flex flex-col">
                            <div className="mb-2 block self-start">
                                <Label htmlFor="full_name" value="Your Full name" />
                            </div>
                            <TextInput id="full_name" onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setUser({ ...user, full_name: e.target.value }) }} value={user.full_name ? user.full_name : ''} shadow required />
                        </div>
                        <div className="flex flex-col">
                            <div className="mb-2 block self-start">
                                <Label htmlFor="bio" value="Your Bio" />
                            </div>
                            <Textarea id="bio" onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => { setUser({ ...user, bio: e.target.value }) }} placeholder={user.bio ? '' : 'Write your bio'} value={user.bio ? user.bio : ''} shadow required rows={4} />
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <Button gradientMonochrome="teal" onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => { handleSubmit(e) }}>
                            <GrUpdate className="mr-2 h-5 w-5" />
                            Update
                        </Button>
                    </div>

                </div>
            </div>
            <Toaster />
        </Layout>
    )
}

export default Profile
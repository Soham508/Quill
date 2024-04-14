import Layout from "@/components/layout/Layout";
import { Label, Textarea, TextInput } from "flowbite-react";
import { useAuth } from "@/context/Auth";
import userLogo from "./../../../public/user.jpg"
import { HiMail } from "react-icons/hi";
import { useEffect, useState } from "react";
import { User } from "@/types";



const Profile = () => {
    const [auth] = useAuth();
    type UserProfile = Pick<User, 'username' | 'email' | 'full_name' | 'bio' | 'password'>

    const [file, setFile] = useState<File>();
    const [user, setUser] = useState<UserProfile>({
        username: "",
        email: "",
        password: "",
        full_name: "",
        bio: '',
    });

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
        if (auth.user) {
            setUser(auth.user);
        }

    }, []);



    return (
        <Layout>
            <div className="flex h-full w-full items-center justify-center">
                <div className="flex flex-col gap-4 justify-between w-1/3 p-3 bg-slate-100 mt-10">
                    <div>
                        <h1 className="font-bold text-teal-600 text-3xl"> Profile </h1>
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
                            <TextInput id="full_name" name="full_name" value={user.full_name ? user.full_name : ''} onChange={handleInputChange} shadow required />
                        </div>
                        <div className="flex flex-col">
                            <div className="mb-2 block self-start">
                                <Label htmlFor="bio" value="Your Bio" />
                            </div>
                            <Textarea id="bio" placeholder={user.bio ? '' : 'Write your bio'} value={user.bio ? user.bio : ''} shadow required rows={4} />
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Profile
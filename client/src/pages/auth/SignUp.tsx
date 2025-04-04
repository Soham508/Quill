
import React, { useState } from 'react';
import { Button, TextInput, Label, FileInput, Checkbox, Toast } from "flowbite-react";
import { BACKEND_URL, registerInput } from '@/types';
import axios from 'axios';
import { HiExclamation } from "react-icons/hi";
import toast, { Toaster } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {
    const navigate = useNavigate();

    const [agree, setAgree] = useState<boolean>(false)
    const [formData, setFormData] = useState<registerInput>({
        username: "",
        email: "",
        password: "",
        full_name: "",
        profile_picture_url: null,
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

    };

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (!agree) {
            toast.custom(<Toast>
                <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-orange-500 dark:bg-orange-700 dark:text-orange-200">
                    <HiExclamation className="h-5 w-5" />
                </div>
                <div className="ml-3 text-sm font-normal">Please agree to the terms and conditions.</div>
                <Toast.Toggle />
            </Toast>);
        } else {

            try {
                const res = await axios.post(`${BACKEND_URL}/api/v1/auth/register`, {
                    ...formData
                })

                if (res && res.data.success) {
                    console.log(res.data);
                    toast.success("Successfully Signed up!")
                    setTimeout(() => {
                        navigate('/login')
                    }, 1000);
                } else {
                    toast.error("Failed to Sign up!")
                }

            }
            catch (err) {
                console.log(err);
                toast.error("Error")
            }
        }
    };



    return (
        <div className='h-screen w-full items-center flex justify-center'>
            <form className='h-full md:h-3/4 md:w-1/4 flex flex-col justify-between p-8 border gap-4 bg-slate-100 rounded-lg border-slate-300'>

                <div className='flex flex-col gap-6'>
                    <h2 className='font-bold text-3xl text-teal-700'> Sign up</h2>
                    <div className='flex flex-col gap-2'>
                        <Label htmlFor="username" className='flex self-start' value="Username" />
                        <TextInput id="username" name='username' onChange={handleInputChange} placeholder="Username" required />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <Label htmlFor="email" className='flex self-start' value="Email" />
                        <TextInput id="email" name='email' onChange={handleInputChange} type="email" placeholder="Email" required />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <Label htmlFor="full name" className='flex self-start' value="Full name" />
                        <TextInput id="full name" name='full_name' onChange={handleInputChange} placeholder="Full name" />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <Label htmlFor="password" className='flex self-start' value="Password" />
                        <TextInput id="password" name='password' onChange={handleInputChange} type="password" placeholder="**********" required />
                    </div>
                    <FileInput id="file" color={"gray"} helperText="A profile picture is useful to confirm your are logged into your account" />
                </div>
                <div className="flex items-center gap-2">
                    <Checkbox id="agree" onChange={(e) => { setAgree(e.target.checked) }} checked={agree} />
                    <Label htmlFor="agree" className="flex cursor-pointer">
                        I agree with the&nbsp;
                        <Link to="#" className="text-cyan-600 hover:underline dark:text-cyan-500">
                            terms and conditions
                        </Link>
                    </Label>
                </div>
                <Button className='relative b-0' onClick={handleSubmit} type="submit">Submit</Button>
            </form>
            <Toaster />
        </div>
    )
}

export default SignUp;
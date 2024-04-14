
import React, { useEffect, useState } from 'react';
import { Button, TextInput, Label } from "flowbite-react";
import { registerInput } from '@/types';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useAuth } from '@/context/Auth';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
    const [auth] = useAuth();
    const navigate = useNavigate();

    type loginValue = Pick<registerInput, "email" | "password">
    const [formData, setFormData] = useState<loginValue>({
        email: "",
        password: "",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

    };

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        console.log(formData)
        try {
            const res = await axios.post("https://blog-vista-psi.vercel.app/api/v1/auth/login", {
                ...formData, email: formData["email"], password: formData["password"]
            })

            if (res && res.data.success) {
                console.log(res.data);
                localStorage.setItem("auth", JSON.stringify(res.data));
                toast.success("Successfully Signed in!")
                setTimeout(() => {
                    window.location.href = "/";
                }, 1000)
            } else {
                console.log(res?.data)
                toast.error("Failed to Sign up!")
            }

        }
        catch (err) {
            console.log(err);
            toast.error("Invalid credentials")
        }

    };

    useEffect(() => {
        if (auth.user) {
            navigate('/');
        }
    }, [auth.user, navigate])

    return (
        <div className='h-screen w-full items-center flex justify-center'>
            <form className='h-full md:h-1/2 md:w-1/4 flex flex-col justify-between p-8 border bg-slate-100 rounded-lg border-slate-300'>

                <div className='flex flex-col gap-6'>
                    <h2 className='font-bold text-3xl text-teal-700'> Login</h2>

                    <div className='flex flex-col gap-2'>
                        <Label htmlFor="email" className='flex self-start' value="Email" />
                        <TextInput id="email" name='email' onChange={handleInputChange} type="email" placeholder="Email" required />
                    </div>

                    <div className='flex flex-col gap-2'>
                        <Label htmlFor="password" className='flex self-start' value="Password" />
                        <TextInput id="password" name='password' onChange={handleInputChange} type="password" placeholder="**********" required />
                    </div>
                </div>
                <Button className='relative b-0' onClick={handleSubmit} type="submit">Submit</Button>
            </form>
            <Toaster />
        </div>
    )
}

export default SignIn
/* eslint-disable @typescript-eslint/no-explicit-any */
import Layout from "@/components/layout/Layout"
import { useAuth } from "@/context/Auth";
import { Label, FileInput, Textarea, Button } from "flowbite-react";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast"
import axios from "axios";
import { storage } from "./../firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";



const CreatePost = () => {

    const [auth] = useAuth();
    const [image, setImage] = useState<File | null>(null);
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const [post, setPost] = useState<any>({})


    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);

            reader.onload = () => {
                setImageSrc(reader.result as string);
            };

            reader.onerror = (error) => {
                console.error("Error converting image to base64:", error);
            };
            setImage(file);
        }
    };

    const uploadImage = async (image: File | null): Promise<string> => {
        if (!image) throw new Error("No image provided");

        const storageRef = ref(storage, `thumbnails/${Date.now()}_${image.name}`);
        const uploadTask = uploadBytesResumable(storageRef, image);

        return new Promise<string>((resolve, reject) => {
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log("Upload is " + progress + "% done");
                },
                (error) => {
                    console.error("Firebase Upload Error:", error);
                    toast.error("Image upload failed");
                    reject(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref)
                        .then((downloadURL) => {
                            window.alert(downloadURL);
                            resolve(downloadURL); // ✅ return URL
                        })
                        .catch((err) => {
                            toast.error("Failed to get download URL");
                            reject(err);
                        });
                }
            );
        });
    };


    const handleSubmit = async (e: any) => {
        e.preventDefault();
        console.log(post);

        try {
            let uploadedUrl
            if (image) {
                uploadedUrl = await uploadImage(image);
            }

            const response = await axios.post('http://localhost:8000/api/v1/post/createPost', {
                ...post,
                thumbnail: uploadedUrl ? uploadedUrl : null,
            });
            toast.success('Post created successfully');
            console.log('New Post:', response.data);
        } catch (error) {
            toast.error('Failed to create the post');
            console.error('Error creating post:', error);
        }
    };




    useEffect(() => {
        setPost({ ...post, author_id: auth.user?.user_id })
    }, [])

    return (
        <Layout>
            <div className="flex flex-col h-full w-4/5 gap-y-6 mt-4 p-2 drop-shadow-lg rounded-xl mb-4 bg-slate-100">
                <div>

                    <h1 className="font-bold text-zinc-700 text-3xl"> Create post </h1>
                </div>

                <div className="w-full flex items-center flex-col gap-6 overflow-y-scroll">


                    <div className="flex flex-col gap-2 w-3/5 items-center justify-center">
                        <h1 className="font-bold text-zinc-700 text-2xl">Add picture</h1>
                        <Label
                            htmlFor="dropzone-file"
                            className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                        >
                            <div className="flex flex-col items-center justify-center pb-6 pt-5">
                                {imageSrc && (
                                    <img src={imageSrc} alt="Uploaded preview" className="h-40 object-cover rounded-md mt-2" />
                                )}
                                <svg
                                    className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 20 16"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                    />
                                </svg>
                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                    <span className="font-semibold">Click to upload</span> or drag and drop
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                            </div>
                            <FileInput onChange={handleFileChange} id="dropzone-file" className="hidden" />
                        </Label>
                    </div>
                    <div className="flex flex-col justify-start gap-2 items-center w-4/5">
                        <Label className="font-bold self-start text-zinc-700 text-xl"> Title</Label>
                        <input onChange={(e) => { setPost({ ...post, title: e.target.value }) }} type="text" placeholder="Write title..." className="border w-full focus:drop-shadow-xl border-gray-800 rounded-md px-4 py-2 focus:outline-zinc-700 focus:ring-0 focus:border-0" />
                    </div>
                    <div className="flex flex-col justify-start gap-2 items-center w-4/5">

                        <Label className="font-bold self-start text-zinc-700 text-xl"> Content </Label>

                        <Textarea onChange={(e) => { setPost({ ...post, content: e.target.value }) }} className="border w-full focus:drop-shadow-xl border-gray-800 rounded-md px-4 py-2 focus:outline-zinc-700 focus:ring-0 focus:border-0" placeholder="Write content for post" required rows={4} />
                    </div>
                    <Button color="dark" onClick={handleSubmit}>
                        Submit
                    </Button>
                </div>

            </div>
            <Toaster />
        </Layout>
    )
}

export default CreatePost
/* eslint-disable @typescript-eslint/no-unused-vars */

import { useState } from "react";
import image from "./../assets/image.png";
import { FaUserCircle } from "react-icons/fa";
import { GoHeart, GoHeartFill } from "react-icons/go";

interface PostCardProps {
    title: string;
    content: string;
    image_url: string;
    username: string;
    likes: number;
    full_name?: string;
}

const PostCard = ({
    title,
    content,
    image_url,
    full_name,
    likes,
    username,
}: PostCardProps) => {
    const [imgSrc, setImgSrc] = useState(
        image_url?.length > 0 ? image_url : image
    );

    const handleImageError = () => {
        setImgSrc(image);
    };

    return (
        <div className="flex flex-col h-full w-full rounded-lg bg-slate-200 shadow-xl hover:shadow-2xl hover:scale-105 gap-2 items-center justify-between p-4 cursor-pointer transition-all duration-500 ease-in-out">
            <img
                src={imgSrc}
                alt="Post Image"
                onError={handleImageError}
                className="w-full h-1/2"
            />
            <h5 className="h-1/6 text-2xl font-bold tracking-tight text-black ">
                {title}
            </h5>
            <p className="h-1/3 font-normal text-black ">{content}</p>
            <div className="flex flex-row justify-between items-center p-4 w-full">
                <div className="flex flex-row max-w-1/2 gap-4 items-center">
                    <div className="shrink-0 cursor-pointer">
                        <FaUserCircle size={36} />
                    </div>

                    <div className="min-w-0 flex flex-col justify-start">
                        <p className="truncate text-start text-sm font-medium text-gray-900 dark:text-white">
                            {username}
                        </p>
                        <p className="truncate text-start text-sm text-gray-500 dark:text-gray-400">
                            {full_name}
                        </p>
                    </div>
                </div>

                <div className="flex flex-row gap-2 items-center justify-center">
                    {
                        // <GoHeartFill size={24} />
                    }
                    <GoHeart size={24} />
                    {likes}
                </div>
            </div>
        </div>
    );
};

export default PostCard;
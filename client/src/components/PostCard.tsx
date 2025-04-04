
import { useState } from "react";
import image from "./../assets/image.png";

const PostCard = ({ title, content, image_url }: { title: string; content: string; image_url: string }) => {
    const [imgSrc, setImgSrc] = useState(image_url?.length > 0 ? image_url : image);

    const handleImageError = () => {
        setImgSrc(image);
    };

    return (<div className="flex flex-col h-full w-full rounded-lg bg-slate-200 shadow-xl hover:shadow-2xl hover:scale-105 gap-2 items-center justify-between p-4 cursor-pointer transition-all duration-500 ease-in-out">

        <img
            src={imgSrc}
            alt="Post Image"
            onError={handleImageError}
            className="w-full h-1/2"
        />
        <h5 className="h-1/6 text-2xl font-bold tracking-tight text-black ">
            {title}
        </h5>
        <p className="h-1/3 font-normal text-black ">
            {content}
        </p>
    </div>
    );
};

export default PostCard;
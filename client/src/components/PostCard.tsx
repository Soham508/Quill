import { Card } from "flowbite-react";

const PostCard = ({ title, content, image_url }: { title: string, content: string, image_url: string }) => {
    return (
        <Card
            className="max-w-sm"
            imgAlt="Meaningful alt text for an image that is not purely decorative"
            imgSrc={image_url}
        >
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {title}
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
                {content}
            </p>
        </Card>
    )
}

export default PostCard
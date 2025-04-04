export interface registerInput {
    username: string;
    email: string;
    password:string;
    full_name?: string;
    profile_picture_url? : File | null
}

export interface User {
    user_id: number;
    username: string;
    email: string;
    password: string;
    full_name: string | null;
    bio: string | null;
    profile_picture_url: string | null;
    created_at: string; 
}
export interface authType {
    user: User | null;
    token: string;
}

export const BACKEND_URL = "http://localhost:8000" as const;
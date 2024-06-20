import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function generateChatRoomId(username1: string, username2: string) {
  
  const sortedUsernames = [username1, username2].sort();
  const concatenatedUsernames = sortedUsernames.join('-');
  
  
  return concatenatedUsernames;
}
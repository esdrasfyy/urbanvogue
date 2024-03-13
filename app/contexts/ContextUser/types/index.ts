import { UserI } from "@/app/types/user";

export interface ContextUserProps{
    user: UserI | null;
    setUser: React.Dispatch<React.SetStateAction<UserI | null>>;
}
import { CreateCommentI } from "@/interfaces/comment";

export interface CreateCommentApiReq {
  msg: string;
}
export interface CreateCommentResponse {
  data: CreateCommentApiReq | null;
  error: string | null;
  status: number;
}

interface Url {
  url: string;
}

export interface CreateCommentApiProps {
  comment: CreateCommentI;
  urls: Url[];
}

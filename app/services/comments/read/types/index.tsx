import { CommentI } from "@/interfaces/comment";

export interface CommentReadApiReq {
  comments: CommentI[] | null;
  msg: string | null;
}

export interface CommentReadResponse {
  data: CommentReadApiReq | null;
  error: string | null;
  status: number;
}

export interface CreateCommentApiProps {
  id: number;
}

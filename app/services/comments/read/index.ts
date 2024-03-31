import axios, { AxiosResponse } from "axios";
import { CommentReadApiReq, CommentReadResponse, CreateCommentApiProps } from "./types";

async function CommentsReadApi({
  id,
}: CreateCommentApiProps): Promise<CommentReadResponse> {
  const api = process.env.API;
  try {
    if (!id) {
      throw new Error("ID parameter is empty or undefined.");
    }
    const response: AxiosResponse<CommentReadApiReq | null> = await axios.get(
      `${api}comments/${id}`
    );

    if (response.status === 200 && response.data && response.data) {
      return {
        data: {
          comments: response.data.comments,
          msg: response.data.msg,
        },
        error: null,
        status: response.status,
      };
    } else {
      return {
        data: {
          comments: null,
          msg: response?.data?.msg || "Unknown error.",
        },
        error: response.data
          ? response.data.msg || "Unknown error."
          : "Unknown error.",
        status: response.status,
      };
    }
  } catch (error: any) {
    return {
      data: {
        comments: null,
        msg: error.response?.data?.msg || null,
      },
      error: error.response?.data?.msg || "Unknown error.",
      status: error.response?.status || 500,
    };
  }
}

export { CommentsReadApi };

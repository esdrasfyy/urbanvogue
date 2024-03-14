export interface CreateCommentI {
    text_comment: string;
    user_id: number | undefined;
    user_img: string;
    product_id: number;
    username: string;
    rating: string;
    recommend: boolean;
  }
  interface Urls{
    url:string
  }
export interface CommentI {
    comment_id:number;
    text_comment: string;
    user_id: number | undefined;
    user_img: string;
    product_id: number;
    username: string;
    rating: string;
    timespost:Date;
    recommend: boolean;
    urls:Urls[]
  }
interface Comment {
    text_comment: string;
    user_id: number | undefined;
    user_img: string;
    product_id: number;
    username: string;
    rating: string;
    recommend: boolean;
  }
  
  interface Url {
    url: string;
  }
  
  export interface CreateCommentApiProps {
    comment: Comment;
    urls: Url[];
  }
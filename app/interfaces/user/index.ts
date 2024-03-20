export interface UserI {
  user_id: number;
  fullname: string;
  username: string;
  email: string;
  profile_img: string;
  date_of_birth?: Date;
  phone: string;
  gender: string;
  cpf: string;
  created_at: Date;
}

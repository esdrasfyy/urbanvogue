import { UserNotifyI } from "@/interfaces/user/notify";

export interface getNotificationsProps {
  user_id: number;
}
export interface getNotificationsApiReq {
  notifications: UserNotifyI[] | null;
  msg: string | null;
}
export interface getNotificationsApiResponse {
  data: getNotificationsApiReq | null;
  error: string | null;
  status: number;
}

import { UserNotifyI } from "@/interfaces/user/notify";

export interface updateNotificationsProps {
  ids: number[];
  action: "read" | "noRead" | "delete"
}
export interface updateNotificationsApiReq {
  msg: string | null;
}
export interface updateNotificationsApiResponse {
  data: updateNotificationsApiReq | null;
  error: string | null;
  status: number;
}

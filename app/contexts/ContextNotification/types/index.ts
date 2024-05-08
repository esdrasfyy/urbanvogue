import { UserNotifyI } from "@/interfaces/user/notify";
import { UseDisclosureReturn } from "@chakra-ui/react";

export interface ContextNotificationProps {
  disclosure: UseDisclosureReturn;
  notifications: UserNotifyI[] | null;
  setNotifications: React.Dispatch<React.SetStateAction<UserNotifyI[] | null>>;
  NotificationsRead: Function;
  NotificationsDelete: Function;
}

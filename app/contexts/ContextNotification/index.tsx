import React, {
  createContext,
  ReactNode,
  useState,
  useEffect,
  useContext,
} from "react";
import { useDisclosure } from "@chakra-ui/react";
import { ContextNotificationProps } from "./types";
import { UserNotifyI } from "@/interfaces/user/notify";
import { ContextUser } from "../ContextUser";
import { getNotifications } from "@/services/user/notification/get-notifications";
import { updateNotifications } from "@/services/user/notification/update";

const ContextNotification = createContext<ContextNotificationProps | undefined>(
  undefined
);

const NotificationProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [notifications, setNotifications] = useState<UserNotifyI[] | null>(
    null
  );
  const contextUser = useContext(ContextUser);
  const fetchNotifications = async (user_id: number) => {
    try {
      const response = await getNotifications({ user_id });
      const { data, status } = response;

      if (status === 200 && data?.notifications) {
        setNotifications(data?.notifications);
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  useEffect(() => {
    if (!contextUser) {
      return;
    }

    const { user } = contextUser;
    if (user && user.user_id) {
      fetchNotifications(user.user_id);
    }
  }, [contextUser]);

  const NotificationsRead = async ({
    action,
    ids,
  }: {
    ids: number[];
    action: "read" | "noRead";
  }) => {
    const { status } = await updateNotifications({ ids, action });

    if (status === 200) {
      const updatedNotifications = notifications?.map(
        (notification: UserNotifyI) => {
          if (ids.includes(notification.notify_id)) {
            return {
              ...notification,
              read: action === "read" ? true : false,
            };
          }
          return notification;
        }
      );
      if (updatedNotifications) {
        return setNotifications(updatedNotifications);
      }
      return setNotifications(null);
    }
  };

  const NotificationsDelete = async ({ ids }: { ids: number[] }) => {
    const { status } = await updateNotifications({ ids, action: "delete" });

    if (status === 200) {
      const updatedNotifications = notifications?.filter(
        (notification: UserNotifyI) => {
          return !ids.includes(notification.notify_id)
        }
      );
      if (updatedNotifications) {
        return setNotifications(updatedNotifications);
      }
      return setNotifications(null);
    }
  };

  const disclosure = useDisclosure();
  const contextValue: ContextNotificationProps = {
    disclosure,
    notifications,
    setNotifications,
    NotificationsRead,
    NotificationsDelete
  };

  return (
    <ContextNotification.Provider value={contextValue}>
      {children}
    </ContextNotification.Provider>
  );
};

export { ContextNotification, NotificationProvider };

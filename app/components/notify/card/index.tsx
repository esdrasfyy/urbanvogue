import { ContextNotification } from "@/contexts/ContextNotification";
import { UserNotifyI } from "@/interfaces/user/notify";
import { format } from "date-fns";
import Link from "next/link";
import React, { useContext } from "react";
import { PiWarningOctagonBold } from "react-icons/pi";

function CardNotification({ notification }: { notification: UserNotifyI }) {
  const context = useContext(ContextNotification)!;
  const { NotificationsRead, NotificationsDelete } =
    context;
  return (
    <li
      className={`shadow-snipped bg-white/5 px-5 uppercase py-4 rounded-md border-l-[3px] ${
        notification.read ? "border-custom-grayThree" : "border-custom-pink"
      } w-full `}
    >
      <div className="flex items-center gap-3 w-full justify-between">
        <div className="flex gap-3">
          <span
            className={`${
              notification.read ? "text-custom-grayThree" : "text-custom-pink"
            } text-2xl`}
          >
            <PiWarningOctagonBold />
          </span>
          <span className="max-md:text-sm">{notification.title}</span>
        </div>
        <div>
          <p className="text-sm text-custom-textColor/70">
            {format(notification.createdAt, "HH:mm - dd/MM/yy")}
          </p>
        </div>
      </div>
      <div className="text-sm text-custom-textColor/70 mt-3 w-full normal-case">
        <p className="max-md:text-xs">{notification.message}</p>
      </div>
      <div className="flex w-full justify-end items-end gap-5 mt-3">
        <button
          className="text-sm uppercase px-3 rounded-md py-1 bg-custom-grayThree/20 hover:bg-custom-grayThree duration-300 ease-linear"
          onClick={() =>
            NotificationsDelete({
              ids: [notification.notify_id],
            })
          }
        >
          Delete
        </button>
        <button
          className="text-sm uppercase px-3 rounded-md py-1 bg-custom-grayThree/20 hover:bg-custom-grayThree duration-300 ease-linear"
          onClick={() =>
            NotificationsRead({
              ids: [notification.notify_id],
              action: notification.read ? "noRead" : "read",
            })
          }
        >
          {notification.read ? "Mark as unread" : "Mark as read"}
        </button>
        {notification.redirect && (
          <Link
            href={notification.redirect}
            className="text-sm uppercase px-3 rounded-md py-1 bg-custom-pink hover:bg-custom-pink/30 duration-300 ease-linear"
          >
            Let's go
          </Link>
        )}
      </div>
    </li>
  );
}

export { CardNotification };

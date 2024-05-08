"use client";
import {
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerOverlay,
} from "@chakra-ui/react";
import React, { useContext, useRef } from "react";
import { ContextNotification } from "@/contexts/ContextNotification";
import { UserNotifyI } from "@/interfaces/user/notify";
import { EmptyUi } from "../empty";
import { CardNotification } from "./card";

function Notifications() {
  const context = useContext(ContextNotification)!;
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const { notifications, NotificationsDelete, NotificationsRead } = context;
  const ids = notifications?.map((notification) => notification.notify_id);

  return (
    <Drawer
      size={"lg"}
      isOpen={context.disclosure.isOpen}
      placement="right"
      onClose={context.disclosure.onClose}
      finalFocusRef={btnRef}
    >
      <DrawerOverlay
        bg="none"
        backdropFilter="saturate(150%) blur(4px)"
        backdropInvert="50%"
        backdropBlur="3px"
      />
      <DrawerContent backgroundColor={"#171a1b"} textColor={"#d9d9d9"}>
        <DrawerCloseButton className="hover:text-custom-pink" />
        <DrawerBody>
          <div className="h-full flex items-center justify-center">
            {context.notifications && context.notifications.length > 0 ? (
              <ul className="flex flex-col w-full mt-28 gap-5 h-full">
                {context?.notifications
                  ?.sort(
                    (a, b) =>
                      new Date(b.createdAt).getTime() -
                      new Date(a.createdAt).getTime()
                  )
                  .map((notification) => {
                    return (
                      <CardNotification
                        notification={notification}
                        key={notification.notify_id}
                      />
                    );
                  })}
              </ul>
            ) : (
              <div className="flex justify-center items-center min-h-full w-full">
                <div className="mx-4 flex justify-center items-center">
                  <EmptyUi
                    title="Empty product cart"
                    message="Add new products to your cart, proceed to payment and live in style!"
                  />
                </div>
              </div>
            )}
          </div>
        </DrawerBody>
        {context?.notifications && context?.notifications.length > 0 && (
          <>
            <Divider />
            <DrawerFooter
              backgroundColor={"#1d2123"}
              className="w-full flex justify-between"
            >
              <div className="flex justify-end w-full items-center gap-5">
                <button
                  className="py-2 px-4 uppercase bg-custom-grayThree/20 duration-300 ease-linear hover:bg-custom-grayThree rounded-md"
                  onClick={() => NotificationsDelete({ ids })}
                >
                  Delete all
                </button>
                <button
                  className="py-2 px-4 uppercase duration-300 ease-linear bg-custom-pink hover:bg-custom-pink/30 rounded-md"
                  onClick={() => NotificationsRead({ ids, action: "read" })}
                >
                  Mark all as read
                </button>
              </div>
            </DrawerFooter>
          </>
        )}
      </DrawerContent>
    </Drawer>
  );
}

export { Notifications };

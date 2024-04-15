import { useEffect } from "react";
import { useSocketContext } from "../../context/socketContext"
import useNotifications from "../../zustand/useNotifications";

const useListenNotifications = () => {
    const {socket} = useSocketContext();
    const { addNotification,addUnReadedNotificationsCount } = useNotifications();

    useEffect(() => {
      socket?.on('newNotification',(notification) => {
        addNotification(notification);
        addUnReadedNotificationsCount();
      });
      return () => socket?.off("newNotification")
    },[addNotification, addUnReadedNotificationsCount, socket])
}

export default useListenNotifications
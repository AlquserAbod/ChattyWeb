import { useEffect } from "react";
import useClearAllNotifications from "../../../hooks/notifications/useClearNotifications";
import useGetNotifications from "../../../hooks/notifications/useGetNotifications";
import Notification from "./Notification";
import useNotifications from "../../../zustand/useNotifications";
import useMarkAsReaded from "../../../hooks/notifications/useMarkAsReaded";

const NotificationsModal = () => {
    const { notifications } = useGetNotifications();
    const { clearAllNotifications } = useClearAllNotifications();
    const { unReadedNotificationsCount } = useNotifications();
    const { markAsReaded } = useMarkAsReaded();


    useEffect(() => {
        if(document.getElementById('notifications_modal').open && notifications.length > 0) {
            markAsReaded()
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[notifications.length, unReadedNotificationsCount])
    

    return (
        <>
        <dialog id="notifications_modal" className="modal modal-bottom sm:modal-middle z-20">

            <div className="modal-box">
                <div className="flex flex-wrap items-center gap-3 mjustify-center">
                    <span className="font-bold text-xl max-md:text-lg mx-auto">
                        Your Notifications
                    </span>

                    <div className="text-sm mx-auto ">
                        <div className="link link-hover" onClick={() => clearAllNotifications()}>Clear All</div>
                    </div>
                </div>

                <div className="divider"></div>

                {notifications.length <= 0 ?  (
                    <div className="flex justify-center" >                         
                        <span className="font-bold text-xl max-md:text-lg">
                            No notifications yet..
                        </span>
                    </div>
                ) : notifications
                    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                    .map((notification,index) => (
                    <Notification 
                        key={index}
                        lastIdx={index === notifications.length - 1}
                        notification={notification} />
                ))}
    
            </div>
    
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
    
        </dialog>
        </>
      )
}

export default NotificationsModal

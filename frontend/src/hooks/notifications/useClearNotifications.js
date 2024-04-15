import {  useState } from "react";
import toast from "react-hot-toast";
import useNotifications from "../../zustand/useNotifications";

const useClearAllNotifications = () => {
	const [loading, setLoading] = useState(false);
    const { setUnReadedNotificationsCount, setNotifications } = useNotifications();
    
		const clearAllNotifications = async () => {
			setLoading(true);

			try {
				const res = await fetch("/api/notifications/clearAll", {
					method: "POST"
				});

				const data = await res.json();
				if (data.error) {
					throw new Error(data.error);
				}

                setUnReadedNotificationsCount(0)
                setNotifications([])
			} catch (error) {
				toast.error(error.message);
			} finally {
				setLoading(false);
			}
		};

	return { loading, clearAllNotifications };
};

export default useClearAllNotifications;
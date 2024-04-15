import {  useState } from "react";
import toast from "react-hot-toast";
import useNotifications from "../../zustand/useNotifications";

const useMarkAsReaded = () => {
	const [loading, setLoading] = useState(false);
    const { setUnReadedNotificationsCount } = useNotifications();
    
		const markAsReaded = async () => {
			setLoading(true);

			try {
				const res = await fetch("/api/notifications/markAsReaded", {
					method: "POST"
				});
				const data = await res.json();
				if (data.error) {
					throw new Error(data.error);
				}

				setUnReadedNotificationsCount(0);
			} catch (error) {
				toast.error(error.message);
			} finally {
				setLoading(false);
			}
		};

	return { loading, markAsReaded };
};

export default useMarkAsReaded;
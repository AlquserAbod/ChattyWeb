import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useNotifications from "../../zustand/useNotifications";

const useGetNotifications = () => {
	const [loading, setLoading] = useState(false);
    const { setNotifications, notifications,setUnReadedNotificationsCount } = useNotifications();
    
	useEffect(() => {
		const getNotifications = async () => {
			setLoading(true);

			try {
				const res = await fetch("/api/notifications");
				const data = await res.json();
				if (data.error) {
					throw new Error(data.error);
				}

				setUnReadedNotificationsCount(data.filter((not) => not.readed == false).length);
				setNotifications(data);
			} catch (error) {
				toast.error(error.message);
			} finally {
				setLoading(false);
			}
		};
		
		getNotifications();
	}, [setNotifications, setUnReadedNotificationsCount]);


	return { loading, notifications };
};

export default useGetNotifications;
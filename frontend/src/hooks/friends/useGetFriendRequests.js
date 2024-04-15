import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useFriendRequests from "../../zustand/useFriendRequests";

const useGetFriendRequests = () => {
	const [loading, setLoading] = useState(false);
	const { friendRequests ,setFriendRequests  } = useFriendRequests();

	
	useEffect(() => {
		const getFriendRequests = async () => {
			setLoading(true);
			try {
				const res = await fetch(`/api/friends/requests`);
				const data = await res.json();

				if (data.error) throw new Error(data.error);

				setFriendRequests(data);
			} catch (error) {
				toast.error(error.message);
			} finally {
				setLoading(false);
			}
		};


		getFriendRequests();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return { friendRequests, loading };
};
export default useGetFriendRequests;
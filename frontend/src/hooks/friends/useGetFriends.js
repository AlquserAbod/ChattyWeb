import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useFriends from "../../zustand/useFriends";
import useFriendRequests from "../../zustand/useFriendRequests";

const useGetFriends = () => {
	const [loading, setLoading] = useState(false);
	const { friends ,setFriends  } = useFriends();
	const { friendRequests } = useFriendRequests();

	
	useEffect(() => {
		const getFriends = async () => {
			setLoading(true);
			try {
				const res = await fetch(`/api/friends`);
				const data = await res.json();

				if (data.error) throw new Error(data.error);

				setFriends(data);
			} catch (error) {
				toast.error(error.message);
			} finally {
				setLoading(false);
			}
		};


		getFriends();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [friendRequests]);

	return { friends, loading };
};
export default useGetFriends;
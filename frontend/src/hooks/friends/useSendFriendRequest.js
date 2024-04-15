import { useState } from "react";
import toast from "react-hot-toast";

const useSendFriendRequest = () => {
	const [loading, setLoading] = useState(false);
	
		const sendFriendRequest = async (firendId) => {
			setLoading(true);
			try {
				const res = await fetch(`/api/friends/send-request/${firendId}`,{
                    method: "POST"
                });
				const data = await res.json();

				if (data.error) throw new Error(data.error);

				return data;
			} catch (error) {
                console.log(error);
				toast.error(error.message);
			} finally {
				setLoading(false);
			}
		};


	return { sendFriendRequest, loading };
};
export default useSendFriendRequest;
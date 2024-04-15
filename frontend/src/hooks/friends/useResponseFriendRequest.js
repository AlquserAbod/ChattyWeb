import { useState } from "react";
import toast from "react-hot-toast";
import useFriendRequests from "../../zustand/useFriendRequests";

const useResponseFriendRequest = () => {
	const [loading, setLoading] = useState(false);
    const { removeFriendRequest } = useFriendRequests()
	
    const responseFriendRequest = async (friendId, response) => {
        setLoading(true);
        try {
            const res = await fetch(`/api/friends/respond-request/${friendId}`,{
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({response})
             });
       
            const data = await res.json();

            if (data.error) throw new Error(data.error);

            removeFriendRequest(friendId);
        } catch (error) {
       console.log(error);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };


	return { responseFriendRequest, loading };
};
export default useResponseFriendRequest;
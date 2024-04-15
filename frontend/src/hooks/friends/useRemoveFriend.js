import { useState } from "react";
import toast from "react-hot-toast";
import useFriends from "../../zustand/useFriends";

const useRemoveFriend = () => {
	const [loading, setLoading] = useState(false);
    const { removeFriend: deleteFriend } = useFriends();
	
    const removeFriend = async (friendId) => {
        setLoading(true);
        try {
            const res = await fetch(`/api/friends/delete-friend/${friendId}`,{
                method: "DELETE",
             });
       
            const data = await res.json();

            if (data.error) throw new Error(data.error);

            deleteFriend(friendId)
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };


	return { removeFriend, loading };
};
export default useRemoveFriend;
import { useState } from "react";
import toast from "react-hot-toast";
import useConversations from "../../zustand/useConversations";

const useIncreaseUnreadCount = () => {
    const [loading, setLoading] = useState(false);
	const  {updateConversation} = useConversations();

    const increaseUnreadCount = async (conversation) => {
        setLoading(true);
        try {
            const res = await fetch(`/api/messages/increaseUnreadCount/${conversation._id}`, {
                method: "PUT"
            });
            const data = await res.json();
            
            if (data.error) {
                throw new Error(data.error);
            }

            updateConversation(data);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };
        
    return { loading, increaseUnreadCount };
};

export default useIncreaseUnreadCount;

import { useState, } from "react";
import toast from "react-hot-toast";

const useGetUnReadedMessageCount = () => {
    const [loading, setLoading] = useState(false);

    const getUnReadedMessageCount = async (conversation) => {
        setLoading(true);
        try {
            const res = await fetch(`/api/messages/unreadCount/${conversation._id}`);
            const data = await res.json();

            if (data.error) {
                throw new Error(data.error);
            }

            return data;
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { loading, getUnReadedMessageCount };
};

export default useGetUnReadedMessageCount;

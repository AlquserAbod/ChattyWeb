import { useState } from "react";
import toast from "react-hot-toast";
import useConversations from "../../zustand/useConversations";

const useMarkMessagesAsReaded = () => {
	const [loading, setLoading] = useState(false);
	const  {updateConversation} = useConversations();

	const markMessagesAsReaded = async (conversationId) => {
		setLoading(true);

		try {
			const res = await fetch(`/api/conversations/read/${conversationId}`, {
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
		


	return { loading, markMessagesAsReaded };
};

export default useMarkMessagesAsReaded;
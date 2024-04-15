import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useFriends from "../../zustand/useFriends";
import useConversations from "../../zustand/useConversations";

const useGetConversations = () => {
	const [loading, setLoading] = useState(false);
	const {conversations, setConversations} = useConversations();
	const { friends } = useFriends();

	useEffect(() => {
		const getConversations = async () => {
			setLoading(true);

			try {
				const res = await fetch("/api/conversations");
				const data = await res.json();
				if (data.error) {
					throw new Error(data.error);
				}

				setConversations(data)
			} catch (error) {
				toast.error(error.message);
			} finally {
				setLoading(false);
			}
		};
		

		getConversations();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [friends]);


	return { loading, conversations };
};

export default useGetConversations;
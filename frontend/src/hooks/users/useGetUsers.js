import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useUsers from "../../zustand/useUsers";
import useFriends from "../../zustand/useFriends";
import useFriendRequests from "../../zustand/useFriendRequests";

const  useGetUsers = () => {
	const [loading, setLoading] = useState(false);
	const { users ,setUsers  } = useUsers();
	const { friends } = useFriends();
	const { friendRequests } = useFriendRequests();
	const fetchUsers = async () => {
		setLoading(true);
		try {
			const res = await fetch(`/api/users`);
			const data = await res.json();

			if (data.error) throw new Error(data.error);


			setUsers(data);
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchUsers();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [friends,friendRequests]);

	return { users, loading,fetchUsers  };
};
export default useGetUsers;
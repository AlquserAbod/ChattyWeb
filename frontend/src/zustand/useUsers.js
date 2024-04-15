import { create } from "zustand";

const useUsers = create((set) => ({
	users: [],
	setUsers: (users) => set({ users }),
}));

export default useUsers;
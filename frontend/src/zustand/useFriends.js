import { create } from "zustand";

const useFriends = create((set) => ({
	friends: [],
	setFriends: (friends) => set({ friends }),
	addFriend: (friend) => set(state => ({...state, friends: [...state.friends,friend]})),
	removeFriend: (friendId) => set((state) => ({...state, friends: state.friends.filter((f) => f._id != friendId)}))
}));

export default useFriends;
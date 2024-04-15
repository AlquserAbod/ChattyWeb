import { create } from "zustand";

const useFriendRequests = create((set) => ({
	friendRequests: [],
	setFriendRequests: (friendRequests) => set({ friendRequests }),
	addFriendRequest: (friendRequest) => set(state => ({...state, friendRequests: [...state.friendRequests,friendRequest]})),
    removeFriendRequest: (friendId) => set(state => ({...state, friendRequests: state.friendRequests.filter(req => req._id != friendId)})),
}));

export default useFriendRequests;
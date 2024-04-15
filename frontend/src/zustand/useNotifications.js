import { create } from "zustand";

const useNotifications = create((set) => ({
	notifications: [],
	setNotifications: (notifications) => set({ notifications }),
	addNotification: (notification) => set(state => ({...state, notifications: [...state.notifications,notification]})),
	unReadedNotificationsCount: 0,
	setUnReadedNotificationsCount: (unReadedNotificationsCount) => set({ unReadedNotificationsCount }),
	addUnReadedNotificationsCount: () => set(state => ({...state, unReadedNotificationsCount: state.unReadedNotificationsCount + 1})),
}));

export default useNotifications;
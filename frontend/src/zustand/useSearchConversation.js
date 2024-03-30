import { create } from "zustand";

const useSearchConversation = create((set) => ({
	searchConversation: '',
	setSearchConversation: (searchConversation) => set({ searchConversation }),
}));

export default useSearchConversation;
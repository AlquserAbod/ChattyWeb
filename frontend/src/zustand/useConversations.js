import { create } from "zustand";


const useConversations = create((set) => ({
    conversations: [],
    setConversations: (conversations) => set({ conversations }),
    updateConversation: (updatedConversation) => {
        set((state) => ({
            conversations: state.conversations.map((conversation) => {
                if (conversation._id === updatedConversation._id) {
                    return updatedConversation;
                }
                return conversation;
            }),
        }));
    },
}));

export default useConversations;
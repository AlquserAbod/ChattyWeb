// messageNotificationStore.js
import { create } from "zustand";

const useMessageNotificationStore = create((set) => ({
  messageQueue: [],
  pushMessage: (message) => set((state) => ({ messageQueue: [...state.messageQueue, message] })),
  popMessage: () => set((state) => ({ messageQueue: state.messageQueue.slice(1) })),
}));

export default useMessageNotificationStore;

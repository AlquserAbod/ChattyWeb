import { useEffect } from "react";
import { useSocketContext } from "../context/socketContext"
import useConversation from "../zustand/useConversation";
import useIncreaseUnreadCount from "./conversations/useIncreaseUnreadCount";
import useConversations from "../zustand/useConversations";
import toast from "react-hot-toast";
import NewMessageNotification from "../components/NewMessageNotification/NewMessageNotification";
import useMessageNotificationStore from "../zustand/messageNotificationStore";


const useListenMessages = () => {
    const {socket} = useSocketContext();
    const {messages,setMessages, selectedConversation} = useConversation();
    const { increaseUnreadCount } = useIncreaseUnreadCount();
    const  {updateConversation} = useConversations();

    const { messageQueue, pushMessage, popMessage } = useMessageNotificationStore(state => ({
      messageQueue: state.messageQueue,
      pushMessage: state.pushMessage,
      popMessage: state.popMessage
    }));

    useEffect(() => {

      const handleNewMessage = ({ conversation, newMessage }) => {
        if (selectedConversation && selectedConversation._id === conversation._id) {
            newMessage.shouldShake = true;

            setMessages([...messages, newMessage]);
            updateConversation(conversation);
        } else {
            increaseUnreadCount(conversation);

            pushMessage({
                t: toast.custom((t) => (<NewMessageNotification t={t} newMessage={newMessage} />), {
                    position: "bottom-right",
                    duration: 1500
                }),
                newMessage
            });

            if (messageQueue.length === 1) {
                showNextMessageNotification();
            }
        }
      };

      
      const showNextMessageNotification = () => {
        if (messageQueue.length > 0) {
            const { t } = messageQueue[0];
            if (t && typeof t.update === 'function') { // Check if t is valid and has an update method
                t.update({ visible: false });
                t.promise.then(() => {
                    popMessage();
                    if (messageQueue.length > 0) {
                        const { t: nextT } = messageQueue[0];
                        if (nextT && typeof nextT.update === 'function') { // Check if nextT is valid and has an update method
                            nextT.update({ visible: true });
                        }
                    }
                });
            }
        }
      };

      socket?.on('newMessage', handleNewMessage);


    

      return () => {
        socket?.off("newMessage");
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[socket, setMessages, messages, selectedConversation, messageQueue, pushMessage, popMessage])
}

export default useListenMessages
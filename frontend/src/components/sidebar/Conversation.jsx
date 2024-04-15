import { useSocketContext } from "../../context/socketContext";
import useConversation from "../../zustand/useConversation"
import useMarkMessagesAsReaded from "../../hooks/conversations/useMarkMessagesAsReaded";
import { useAuthContext } from "../../context/AuthContext";


const Conversation = ({conversation, lastIdx}) => {
  const { selectedConversation,setSelectedConversation } = useConversation();
  const { markMessagesAsReaded } = useMarkMessagesAsReaded();
  const { onlineUsers } = useSocketContext();
  const { authUser } = useAuthContext();

  const userObject = conversation.participants.find((u) => u.userId._id !== authUser._id);

  const currentUserObject = conversation.participants.find((u) => u.userId._id === authUser._id);

  const user = userObject.userId;

  const unReadCount = currentUserObject.unreadCount ;

  const isSelected = selectedConversation?._id === conversation._id;

  const isOnline = onlineUsers.includes(user._id);


  

  return (
    <>
    <div className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2  cursor-pointer overflow-x-auto lg:min-w-56
      ${isSelected ?  'bg-sky-500' : ''}`}
      onClick={() => {
        if(unReadCount > 0) markMessagesAsReaded(conversation._id);
        setSelectedConversation(conversation)
      }}>

      <div className={`avatar ${isOnline ? "online": ""}`}>
        <div className="w-12 rounded-full">
          <img src={user.profilePic} alt=" user avatar" />
        </div>
      </div>

      <div className="flex flex-col flex-1">
        <div className="flex gap-3 justify-between">
          <p className="font-bold text-gray-200">{user.fullName}</p>
        </div>

        <div className="text-sm text-gray-500">
          { conversation.latestMessage ? conversation.latestMessage.message : '' }
        </div>
      </div>

      {unReadCount > 0 && (
        <div className="badge badge-error gap-2 text-white font-bold">
          { unReadCount }
        </div>

      )}

    </div>
    
    {!lastIdx && <div className="divider my-0 py-0 h-1" />}
    
    <div></div>
    </>
  )
}

export default Conversation
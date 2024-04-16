import { useSocketContext } from "../../../context/socketContext";
import { IoPersonRemoveSharp } from "react-icons/io5";
import { IoMdChatbubbles } from "react-icons/io";
import useConversation from "../../../zustand/useConversation"
import useRemoveFriend from "../../../hooks/friends/useRemoveFriend";
import useConversations from "../../../zustand/useConversations";
import { useAuthContext } from "../../../context/AuthContext";

const FriendUser = ({friend, lastIdx}) => {
    const { onlineUsers } = useSocketContext();

    const {setSelectedConversation} = useConversation();
    const { conversations } = useConversations();
    const { removeFriend, loading } = useRemoveFriend();
    const { authUser } = useAuthContext();

    const isOnline = onlineUsers.includes(friend._id);

    function findConversationWithFriendAndAuthUser() {

        for (const conversation of conversations) {
          const participants = conversation.participants;
          
          if (participants.some(participant => participant.userId._id === friend._id) &&
              participants.some(participant => participant.userId._id === authUser._id)) {
            return conversation;
          }
        }
      
        return null;
    }

    return (
        <div>
          <div className={`flex gap-2 items-center rounded p-2 py-1 ${!lastIdx && "my-4"} max-xs:flex-col max-xs:text-center`} >
            <div className={`avatar ${isOnline ? "online": ""}`}>
                <div className="w-14 rounded-full">
                  <img src={friend.profilePic} alt=" user avatar" />
                </div>
            </div>
  
            <div className="flex flex-col flex-1">
                <div className="flex gap-3 justify-between">
                  <p className="font-bold text-gray-400 text-2xl">{friend.fullName}</p>
                </div>
                <p className="font-bold text-gray-200">{friend.username}</p>
            </div>

            <div className="flex gap-2 ">
                <button className="btn btn-circle btn-outline btn-error" onClick={() => {
                    removeFriend(friend._id);
                }}>
                    { loading ? (
                        <span className="loading loading-spinner"></span>
                    ) : (<IoPersonRemoveSharp />)}
                    
                </button>

                <form method="dialog">

                    <button className="btn btn-circle btn-outline" onClick={() => {
                        setSelectedConversation(findConversationWithFriendAndAuthUser())
                    } }>
                        <IoMdChatbubbles />
                    </button>
                </form>
            </div>
          </div>
        </div>
    )
}

export default FriendUser

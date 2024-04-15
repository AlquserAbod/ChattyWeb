import { useAuthContext } from "../../../context/AuthContext";
import { useSocketContext } from "../../../context/socketContext";
import { BsPersonFillAdd } from "react-icons/bs";
import { FaUserFriends } from "react-icons/fa";
import useSendFriendRequest from "../../../hooks/friends/useSendFriendRequest";
import useGetUsers from "../../../hooks/users/useGetUsers";

const AddFriendUser = ({user, lastIdx}) => {
  const { authUser } = useAuthContext();
  const { onlineUsers } = useSocketContext();
  const { sendFriendRequest , loading } = useSendFriendRequest();
  const { fetchUsers } = useGetUsers();

  const isOnline = onlineUsers.includes(user._id);
  const inFriendRequests = user.pendingFriendships.includes(authUser._id);
  const inFriends = user.friends.includes(authUser._id);

  const handleAddFriend = async (friendId) => {
    await sendFriendRequest(friendId)
    await fetchUsers();
  }

  return (
      <div>
        <div className={`flex gap-2 items-center rounded p-2 py-1 ${!lastIdx && "my-4"} max-xs:flex-col max-xs:text-center`} >
          <div className={`avatar ${isOnline ? "online": ""}`}>
              <div className="w-14 rounded-full">
                <img src={user.profilePic} alt=" user avatar" />
              </div>
          </div>

          <div className="flex flex-col flex-1">
              <div className="flex gap-3 justify-between">
                <p className="font-bold text-gray-400 text-2xl">{user.fullName}</p>
              </div>
              <p className="font-bold text-gray-200">{user.username}</p>
          </div>

          <div>
            { inFriendRequests ? (
              <span className="loading loading-ring"></span>
            ) : inFriends ? (
              <FaUserFriends  className="text-2xl" />
            ) : (
              loading ? (
                <span className="loading loading-spinner "></span>
              ) : (
                <BsPersonFillAdd  className="text-2xl cursor-pointer" onClick={() => handleAddFriend(user._id)}/>
              )
              
            )}


          </div>
        </div>
      </div>
    )
}

export default AddFriendUser

import { useSocketContext } from '../../../context/socketContext';
import useResponseFriendRequest from '../../../hooks/friends/useResponseFriendRequest';

const RequestUser = ({user, lastIdx}) => {
    const { onlineUsers } = useSocketContext();
  
    const isOnline = onlineUsers.includes(user._id);
    const { responseFriendRequest, loading } = useResponseFriendRequest();

  
    return (
        <div>
          <div className={`flex gap-2 items-center rounded p-2 py-1 ${lastIdx && "my-4"} max-xs:flex-col max-xs:text-center`} >
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

            <div className="join ">

                <button className="btn max-xs:w-auto join-item btn-accent" 
                onClick={() => responseFriendRequest(user._id,"accept")}>{
                  loading ? (<span className="loading loading-spinner"></span> ) : ( "Aceppt")
                }</button>

                <button className="btn max-xs:w-auto join-item btn-error" 
                  onClick={() => responseFriendRequest(user._id,"reject")}>{
                    loading ? (<span className="loading loading-spinner"></span> ) : ( "Reject")
                  }</button>
            </div>
          </div>
        </div>
    )
}

export default RequestUser

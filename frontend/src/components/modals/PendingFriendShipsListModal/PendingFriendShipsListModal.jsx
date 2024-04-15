import useGetFriendRequests from "../../../hooks/friends/useGetFriendRequests";
import RequestUser from "./RequestUser";

const PendingFriendShipsListModal = () => {
    const { friendRequests } = useGetFriendRequests();

  
    
    return (
      <>
      <dialog id="pending_friendships_modal" className="modal modal-bottom sm:modal-middle z-20 ">
          <div className="modal-box">

            <span className="font-bold text-xl max-md:text-lg">
                Pending friend ships
            </span>
            <div className="divider"></div>
            {friendRequests.length > 0  ? (
                friendRequests.map((user, index) => (
                  <RequestUser 
                  user={user} key={index} 
                  lastIdx={index === friendRequests.length - 1}
                  />
                ))

            ) : (
                <div className="text-center font-bold text-xl ">
                    There are no pending friend requests..
                </div>
            )}
          </div>
  
          <form method="dialog" className="modal-backdrop">
              <button>close</button>
          </form>
  
      </dialog>
      </>
    )
}

export default PendingFriendShipsListModal

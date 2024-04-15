import { useEffect } from "react";
import { useSocketContext } from "../../context/socketContext"
import useFriendRequests from "../../zustand/useFriendRequests";

const useListenFriendRequest = () => {
    const {socket} = useSocketContext();
    const {addFriendRequest} = useFriendRequests();

    useEffect(() => {
      socket?.on('newFriendRequest',(user) => {
        addFriendRequest(user);
      })  
      return () => socket?.off("newFriendRequest")
    },[addFriendRequest, socket])
}

export default useListenFriendRequest
import { useEffect } from "react";
import { useSocketContext } from "../../context/socketContext"
import useFriendRequests from "../../zustand/useFriendRequests";
import useFriends from "../../zustand/useFriends";

const useListenResponseToFriendRequest = () => {
    const {socket} = useSocketContext();
    const {removeFriendRequest} = useFriendRequests();
    const { addFriend } = useFriends();

    useEffect(() => {
      socket?.on('respondToFriendRequest',({user, response}) => {
        removeFriendRequest(user);
        if(response == 'accept') addFriend(user)
      })  


      return () => socket?.off("respondToFriendRequest")
    },[addFriend, removeFriendRequest, socket])
}

export default useListenResponseToFriendRequest


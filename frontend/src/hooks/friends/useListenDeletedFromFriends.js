import { useEffect } from "react";
import { useSocketContext } from "../../context/socketContext"
import useFriends from "../../zustand/useFriends";

const useListenDeletedFromFriends = () => {
    const {socket} = useSocketContext();
    const {removeFriend} = useFriends();

    useEffect(() => {
      socket?.on('deletedFromFriends',(user) => {
        removeFriend(user.id);
      })  
      return () => socket?.off("deletedFromFriends")
    },[removeFriend, socket])
}

export default useListenDeletedFromFriends
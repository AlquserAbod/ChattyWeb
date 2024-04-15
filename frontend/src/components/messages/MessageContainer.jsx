import { useEffect } from "react";
import useConversation from "../../zustand/useConversation";
import MessageInput from "./MessageInput"
import Messages from "./Messages"
import { TiMessages } from "react-icons/ti"
import { useAuthContext } from "../../context/AuthContext";

const MessageContainer = () => {
  const {selectedConversation, setSelectedConversation} = useConversation();
  useEffect(() => {
    return () => setSelectedConversation(null);
  }, [])
  return (
    <div className=" md:min-w-[450px] flex flex-col flex-1 overflow-auto max-sm:h-3/4">
      {!selectedConversation ? <NoChatSelected /> : (
        <>
          {/* Header */}
          <div className="bg-salte-500 px-4 py-2 mb-2">
            <span className="label-text">To:</span>{" "}
            <span className="base-300 font-bold">{selectedConversation.fullName}</span>
          </div>

          <Messages  />
          <MessageInput />
        </>
      ) }
    </div>
  )
}

export default MessageContainer;

const NoChatSelected = () => {
  const { authUser} = useAuthContext();
  return (
    <div className="flex items-center justify-center  w-full h-full">
      <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 
      font-semibold flex flex-col items-center gap-2">
        <p> Welcome ✋ {authUser.fullName}</p>
        <p>Select a caht to start messaging</p>
        <TiMessages className="text-3xl md:text-6xl text-center" />
      </div>
    </div>
  )
}
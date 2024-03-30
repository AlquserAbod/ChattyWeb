import { useEffect, useState } from "react";
import useGetConversations from "../../hooks/useGetConversations"
import useSearchConversation from "../../zustand/useSearchConversation";
import Conversation from "./Conversation";

const Conversations = () => {
  const {loading, conversations} = useGetConversations();
  const [filtredConversations, setFiltredConversations] = useState([]);
  const {searchConversation} = useSearchConversation();

  useEffect(() => {
    let filtered = conversations;
      filtered = conversations.filter((c) =>
        c.fullName.toLowerCase().startsWith(searchConversation.toLowerCase())
      );



    setFiltredConversations(filtered);
  },[conversations,searchConversation]);



  return (
      <div className="py-2 flex flex-col">
        {
          filtredConversations.length <= 0 ? (
            <div className="flex flex-col justify-center items-center break-words max-w-52">
              <p>There are no conversations with &quot;{searchConversation}&quot;</p>
            </div>
          ) : filtredConversations.map((conversation,idx) => (
          <Conversation 
          key={conversation._id} 
          conversation={conversation}
          lastIdx={idx === filtredConversations.length - 1}/>
        )) 
        }

        {loading ? <span className="loading loading-spinner mx-auto"></span> :null}
    </div>
  )
}

export default Conversations
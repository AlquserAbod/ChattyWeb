import useSendMessage from "../../hooks/useSendMessage"
import {  useState } from "react";
import InputEmoji from 'react-input-emoji'


const MessageInput = () => {

  const { loading, sendMessage } = useSendMessage();
  const [message,setMessage] = useState('');

  const handleSubmit = async (text) => {
    if(!text) return;

    await sendMessage(text);
    setMessage("");
  };

  return (
      <div className="px-4 my-3">
        <div className="w-full relative">
          <InputEmoji
            value={message}
            onChange={setMessage}
            cleanOnEnter
            onEnter={handleSubmit}
            disableRecent={loading}
            placeholder="Send a message"
            theme="dark"
            color="white"
            background="rgb(55 65 81 / 1)"
            buttonElement=""
          />

        </div>
      </div>

  )
}

export default MessageInput
import {useAuthContext} from '../../context/AuthContext';
import useConversation from '../../zustand/useConversation';
import { extractTime } from "../../utils/extractTime";

const Message = ({message}) => {

	const { authUser } = useAuthContext();
	const { selectedConversation } = useConversation();

	const fromMe = message.senderId._id === authUser._id;
	const formattedTime = extractTime(message.createdAt);
	const chatClassName = fromMe ? "chat-end" : "chat-start";
	const profilePic = fromMe ? 
		authUser.profilePic : 
		selectedConversation?.participants.find(p => p.userId._id != authUser._id).userId.profilePic;
		
	const bubbleBgColor = fromMe ? "bg-blue-500" : "";
	const shakeClass = message.shouldShake ? "shake" : ""

	return (
		<div className={`chat ${chatClassName} break-words`}>
			<div className='chat-image avatar'>
				<div className='w-10 rounded-full'>
					<img alt='Tailwind CSS chat bubble component' src={profilePic} />
				</div>
			</div>
			<div className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} pb-2`}>{message.message}</div>
			<div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>{formattedTime}</div>
		</div>
	);
}

export default Message
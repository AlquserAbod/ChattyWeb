import toast from "react-hot-toast"

const NewMessageNotification = ({t , newMessage }) => {

  return (
    <div
        className={`${
        t.visible ? 'animate-enter' : 'animate-leave'
        } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
    >
        <div className="flex-1 w-0 p-4">
        <div className="flex items-start">
            <div className="flex-shrink-0 pt-0.5">
            <img
                className="h-10 w-10 rounded-full"
                src={ newMessage.senderId.profilePic }
                alt=""
            />
            </div>
            <div className="ml-3 flex-1">
            <p className="text-sm font-medium text-gray-900">
                { newMessage.senderId.fullName }
            </p>
            <p className="mt-1 text-sm text-gray-500">
                { newMessage.message }
            </p>
            </div>
        </div>
        </div>
        <div className="flex border-l border-gray-200">

        </div>
    </div>
  )
}

export default NewMessageNotification

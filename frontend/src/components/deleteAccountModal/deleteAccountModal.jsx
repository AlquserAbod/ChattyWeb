import useDeleteAccount from "../../hooks/auth/useDeleteAccount"

const DeleteAccountModal = () => {
    const {deleteAccount, loading} = useDeleteAccount();
    return (
        <dialog id="delete-account-modal" className="modal modal-bottom sm:modal-middle">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Are you sure you want to delete your account?</h3>
                <p className="py-4">If you delete your chattyweb account, you will not be able to log in again to this account</p>
                <div className="modal-action">
                <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn mr-2">Close</button>
                    <button className="btn btn-error" onClick={deleteAccount}>
                    { !loading ? (
                        <span> Delete </span>
                    ) : (
                        <span className="loading loading-spinner"></span>
                    )}
                    </button>
                </form>
                </div>
            </div>
        </dialog>
    )
}

export default DeleteAccountModal
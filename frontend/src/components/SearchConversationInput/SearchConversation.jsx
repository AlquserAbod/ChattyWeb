import { IoClose } from "react-icons/io5";
import useSearchConversation from "../../zustand/useSearchConversation";
import { useState } from "react";

export const SearchConversation = () => {
    const { setSearchConversation } = useSearchConversation();
    const [search, setSearch] = useState('');

    const handleChange = (e) => {
        e.preventDefault();
        setSearch(e.target.value);
        setSearchConversation(e.target.value);
    }

    return (
        <label className="input input-bordered flex items-center gap-2 justify-center max-xs:w-full">
            <input type="text" placeholder="Search conversation.." className="overflow-x-auto"
                value={search} onChange={handleChange} />
            {search.length > 0 && (

                <IoClose onClick={() => setSearch('')} className="cursor-pointer" />
            )}
        </label>
    )
}

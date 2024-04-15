import { IoClose } from "react-icons/io5";

const SearchInput = ({ search, setSearch }) => {


    return (
        <label className="input input-bordered flex items-center gap-2 justify-between max-xs:w-full text-start">
            <input type="text" placeholder="Enter friend username" className="overflow-x-auto" onChange={(e) => setSearch(e.target.value)}
                value={search}  />

            {search.length > 0 && (

                <IoClose onClick={() => setSearch('')} className="cursor-pointer"/>
            ) }
        </label>
    )
}

export default SearchInput

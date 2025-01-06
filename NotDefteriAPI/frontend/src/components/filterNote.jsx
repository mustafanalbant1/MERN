import { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { searchNote } from "../redux/noteSlice";

const FilterNote = () => {
    const dispatch = useDispatch();
    const [value, setValue] = useState("");

    const handleChange = async (e) => {
        const inputValue = e.target.value;
        const searchValue = inputValue.trim() === "" ? "" : inputValue;
        await dispatch(searchNote(searchValue));

    };
    return (
        <div className="w-full flex ">
            <div className="relative w-[300px]">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <IoSearchOutline size={20} />
                </span>
                <input
                    type="text"
                    placeholder="Search"
                    className="w-full h-[40px] pl-10 rounded-lg focus:outline-none placeholder"
                    value={value}
                    onChange={(e) => {
                        setValue(e.target.value);
                        handleChange(e);
                    }}
                />
            </div>
        </div>
    );
};

export default FilterNote;

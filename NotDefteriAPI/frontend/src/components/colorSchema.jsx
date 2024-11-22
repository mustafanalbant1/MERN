import { useState } from "react";
import { FaCirclePlus } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { setSelectedColor } from "../redux/acctions";

const ColorSchema = () => {
    const [visible, setVisible] = useState(false);
    const dispatch = useDispatch();

    const toggleVisibility = () => {
        setVisible(!visible);
    };

    const handleColorChange = (color) => {
        console.log(`Seçilen renk: ${color}`);
        dispatch(setSelectedColor(color));
        setVisible(false);
    };

    return (
        <div className="flex flex-col items-center">
            <div className="mt-[70px]" onClick={toggleVisibility}>
                <FaCirclePlus size={50} />
            </div>

            {visible && (
                <div className="flex flex-col items-center justify">
                    <div
                        className="w-6 h-6 rounded-full p-1 bg-yellow-300 mt-7 cursor-pointer"
                        onClick={() => handleColorChange('yellow')}
                    ></div>
                    <div
                        className="w-6 h-6 rounded-full p-1 bg-orange-300 mt-2 cursor-pointer"
                        onClick={() => handleColorChange('orange')}
                    ></div>
                    <div
                        className="w-6 h-6 rounded-full p-1 bg-purple-300 mt-2 cursor-pointer"
                        onClick={() => handleColorChange('purple')}
                    ></div>
                    <div
                        className="w-6 h-6 rounded-full p-1 bg-blue-300 mt-2 cursor-pointer"
                        onClick={() => handleColorChange('blue')}
                    ></div>
                    <div
                        className="w-6 h-6 rounded-full p-1 bg-green-300 mt-2 cursor-pointer"
                        onClick={() => handleColorChange('green')}
                    ></div>
                </div>
            )}
        </div>
    );
};

export default ColorSchema;

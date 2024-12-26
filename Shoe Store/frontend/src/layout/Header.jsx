import { CgShoppingBag } from "react-icons/cg";
import { SiNike } from "react-icons/si";
import { IoSearchOutline } from "react-icons/io5";
import { RiUserFill } from "react-icons/ri";
import { Link } from "react-router-dom";

const Header = ({ setVisible }) => {
  const handleVisible = () => {
    setVisible(true);
  };
  return (
    <div className="flex w-[1500px] relative items-center justify-between">
      <div className="flex">
        <SiNike size={100} className="text-white cursor-pointer" />
      </div>
      <div className="flex space-x-[70px] text-[30px] font-bold text-white">
        <Link
          to="/category/men"
          className="hover:text-orange-600 hover:underline hover:underline-offset-[10px] hover:decoration-2 cursor-pointer"
        >
          MEN
        </Link>
        <Link
          to="/category/women"
          className="hover:text-orange-600 hover:underline hover:underline-offset-[10px] hover:decoration-2 cursor-pointer"
        >
          WOMEN
        </Link>
        <Link
          to="/category/kids"
          className="hover:text-orange-600 hover:underline hover:underline-offset-[10px] hover:decoration-2 cursor-pointer"
        >
          KIDS
        </Link>
        <Link
          to="/category/collections"
          className="hover:text-orange-600 hover:underline hover:underline-offset-[10px] hover:decoration-2 cursor-pointer"
        >
          COLLECTIONS
        </Link>
      </div>
      <div className="flex space-x-7 p-[10px] items-center">
        <IoSearchOutline size={30} className="text-orange-600 cursor-pointer" />
        <div
          onClick={handleVisible}
          className="text-white bg-orange-600 rounded-full cursor-pointer"
        >
          <CgShoppingBag className="m-2" size={25} />
        </div>
        {/* <div className="text-white bg-orange-600 rounded-full cursor-pointer">
          <RiUserFill className="m-2" size={25} />
        </div> */}
      </div>
    </div>
  );
};

export default Header;

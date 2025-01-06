import { useState } from "react";
import userImage from "../assets/image/user.png";
import { FaShoppingBasket } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getKeyword } from "../redux/generalSlice";

const Header = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [keyword, setKeyword] = useState("");
  const { user, isAuth } = useSelector((state) => state.user);
  const { carts } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const menuItems = [
    {
      name: "Profile",
      url: "/profile",
    },
    {
      name: "Admin",
      url: "/admin",
    },
    {
      name: "Çıkış",
      url: "/logout",
    },
  ];

  const keywordFunc = () => {
    if (keyword.trim()) {
      dispatch(getKeyword(keyword)); // Redux store'a kaydet
      setKeyword(""); // Input'u temizle
      navigate("/products"); // Products sayfasına yönlendir
    }
  };

  const menuItem = (item) => {
    if (item.name === "Çıkış") {
      localStorage.clear("token"); // Remove token on logout
      window.location.reload(); // Reload page to reset the state
      dispatch(isAuth(false));
    } else {
      navigate(item.url); // Navigate to other pages (Profile/Admin)
    }
    setOpenMenu(false); // Menü öğesi seçildikten sonra menüyü kapat
  };

  return (
    <div className="bg-gray-100 px-5 py-3 flex items-center justify-between shadow-md">
      <div
        onClick={() => navigate("/")} // Ana sayfaya yönlendirme
        className="text-4xl font-bold cursor-pointer"
      >
        MERN
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center border rounded-md px-2 py-1">
          <input
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="p-2 outline-none"
            type="text"
            placeholder="Arama Yap"
          />
          <IoSearchOutline
            onClick={keywordFunc}
            className="ml-2 text-gray-600 cursor-pointer"
          />
        </div>

        <div className="relative">
          {isAuth ? (
            <>
              <img
                onClick={() => setOpenMenu(!openMenu)}
                src={user?.user?.avatar?.url || userImage}
                alt="User"
                className="w-8 h-8 object-cover rounded-full cursor-pointer"
              />
              {openMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white border shadow-md rounded-md z-10">
                  {menuItems.map((item, i) => (
                    <div
                      onClick={() => menuItem(item)}
                      key={i}
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-200 cursor-pointer"
                    >
                      {item.name}
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div
              onClick={() => navigate("/auth")}
              className="cursor-pointer text-gray-700 hover:text-blue-500"
            >
              Sign In
            </div>
          )}
        </div>

        <div
          onClick={() => navigate("/cart")}
          className="relative cursor-pointer"
        >
          <FaShoppingBasket className="text-2xl text-gray-700" />
          <div className="absolute -top-2 -right-2 bg-red-600 text-white w-5 h-5 flex items-center justify-center rounded-full text-xs font-semibold shadow-md">
            {carts?.length}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;

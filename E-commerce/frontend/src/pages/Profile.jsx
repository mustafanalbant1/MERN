import { useSelector } from "react-redux";
import userImage from "../assets/image/user.png";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user, isAuth } = useSelector((state) => state.user);
  const navigate = useNavigate(); // useNavigate hook'unu kullanıyoruz

  if (!isAuth) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <div className="flex items-center space-x-8">
          {/* Sol Taraf: Kullanıcı Bilgileri */}
          <div className="flex-1">
            <h2 className="text-3xl font-semibold text-gray-800 mb-2">
              {user?.user?.name || "User Name"}
            </h2>
            <p className="text-lg text-gray-600 mb-4">
              {user?.user?.email || "email@example.com"}
            </p>
            <div className="mt-6">
              <h3 className="text-xl font-medium text-gray-800 mb-2">
                Address
              </h3>
              <p className="text-gray-600">
                {user?.user?.address || "No address provided"}
              </p>
            </div>
            <div className="mt-6">
              <h3 className="text-xl font-medium text-gray-800 mb-2">Phone</h3>
              <p className="text-gray-600">
                {user?.user?.phone || "No phone number provided"}
              </p>
            </div>
            <div className="mt-6">
              <h3 className="text-xl font-medium text-gray-800 mb-2">
                Password
              </h3>
              <p
                className="text-gray-600 cursor-pointer"
                onClick={() => navigate("/forgot")} // navigate fonksiyonunu çağırıyoruz
              >
                Güncelle
              </p>
            </div>
          </div>

          {/* Sağ Taraf: Profil Resmi */}
          <div className="flex-shrink-0">
            <img
              src={user?.user?.avatar?.url || userImage}
              alt="User Avatar"
              className="w-32 h-32 rounded-full object-cover border-4 border-gray-300"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoginForm from "../components/auth/LoginForm";
import RegisterForm from "../components/auth/RegisterForm";
import Button from "../components/common/Button";
import { logout } from "../store/slices/authSlice";

const Auth = () => {
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(true);
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  if (user) {
    return (
      <div className="h-screen w-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-6">
        <div className="bg-white/95 p-8 rounded-2xl shadow-xl w-full max-w-md">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Hoş geldiniz, {user.email}!
            </h2>
            <p className="text-gray-600 mb-8">Başarıyla giriş yaptınız.</p>

            <Button
              variant="primary"
              onClick={handleLogout}
              className="w-full max-w-xs mx-auto"
            >
              Çıkış Yap
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center relative">
      {/* Arkaplan desenleri */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-blue-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-purple-400/20 rounded-full blur-3xl"></div>
      </div>

      {/* Ana içerik */}
      <div className="relative w-full max-w-md mx-4">
        <div className="bg-white/95 p-8 rounded-2xl shadow-xl">
          {/* Logo veya ikon */}
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mx-auto mb-8 shadow-lg flex items-center justify-center">
            <svg
              className="w-12 h-12 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>

          {/* Başlık ve alt başlık */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              {isLogin ? "Hoş Geldiniz!" : "Kayıt Olun"}
            </h2>
            <p className="text-gray-600">
              {isLogin ? "Hesabınıza giriş yapın" : "Yeni bir hesap oluşturun"}
            </p>
          </div>

          {/* Form */}
          <div className="rounded-xl">
            {isLogin ? (
              <LoginForm switchForm={() => setIsLogin(false)} />
            ) : (
              <RegisterForm switchForm={() => setIsLogin(true)} />
            )}
          </div>

          {/* Alt bilgi */}
          <div className="mt-8 text-center text-sm text-gray-500">
            <p>
              Bu platform güvenli giriş sistemine sahiptir.
              <br />
              Bilgileriniz güvende.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;

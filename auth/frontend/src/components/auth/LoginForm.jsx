import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Input from "../common/Input";
import Button from "../common/Button";
import { login, clearError } from "../../store/slices/authSlice";

const LoginForm = ({ switchForm }) => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(clearError());
    const result = await dispatch(login({ email, password }));

    if (!result.error) {
      setEmail("");
      setPassword("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 text-black">
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg mb-6">
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      <Input
        label="Email Adresi"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        placeholder="ornek@email.com"
      />
      <Input
        label="Şifre"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        placeholder="••••••••"
      />

      <Button type="submit" disabled={loading}>
        {loading ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            Giriş yapılıyor...
          </span>
        ) : (
          "Giriş Yap"
        )}
      </Button>

      <div className="text-center mt-6">
        <Button variant="secondary" onClick={switchForm} type="button">
          Hesabınız yok mu? Kayıt olun
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;

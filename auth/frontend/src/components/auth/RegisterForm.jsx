import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Input from "../common/Input";
import Button from "../common/Button";
import { register, clearError } from "../../store/slices/authSlice";

const RegisterForm = ({ switchForm }) => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(clearError());
    const result = await dispatch(register({ email, password }));

    if (!result.error) {
      setEmail("");
      setPassword("");
      switchForm();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-black">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <Input
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <Input
        label="Şifre"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <Button type="submit" disabled={loading}>
        {loading ? "Kayıt olunuyor..." : "Kayıt Ol"}
      </Button>
      <div className="text-center">
        <Button variant="secondary" onClick={switchForm}>
          Zaten hesabınız var mı? Giriş yapın
        </Button>
      </div>
    </form>
  );
};

export default RegisterForm;

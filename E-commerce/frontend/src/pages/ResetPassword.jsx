import { useState } from "react";
import { useDispatch } from "react-redux";
import Button from "../components/Button";
import { useParams } from "react-router-dom";
import { resetPassword } from "../redux/userSlice";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { token } = useParams(); // URL'deki token'i al

  const forgotFunc = () => {
    let res = dispatch(resetPassword({ token, password }));
    console.log(res, "ressss");
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="w-1/3 space-y-3">
        <div className="text-3x1">Yeni Şifremi Oluştur</div>
        <input
          placeholder={"Yeni Şifre"}
          onChange={(e) => setPassword(e.target.value)}
          name={"password"}
          id={""}
        />
        <Button name={"Onayla"} onClick={forgotFunc} />
      </div>
    </div>
  );
};

export default ResetPassword;

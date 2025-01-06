import { useState } from "react";
import { useDispatch } from "react-redux";
import { forgotPassword } from "../redux/userSlice"; // AsyncThunk işlemini ekleyin
import Button from "../components/Button";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();

  const forgotFunc = () => {
    let res = dispatch(forgotPassword(email));

    console.log(res, "ress");
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="w-1/3 space-y-3 ">
        <div className="text-3xl">Şifremi Unuttum</div>
        <input
          type="text"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          name="email"
          id=""
        />
        <Button name={"Onayla"} onclick={forgotFunc} />
      </div>
    </div>
  );
};

export default ForgotPassword;

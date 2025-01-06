import Button from "../components/Button";
import { useDispatch, useSelector } from "react-redux";
import Input from "../components/Input";
import { useEffect, useState } from "react";
import userImage from "../assets/image/user.png";
import { login, register } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [signUp, setSignUp] = useState(true);
  const dispatch = useDispatch();
  const { isAuth } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    avatar: "",
  });
  const [preview, setPreview] = useState(userImage);

  const registerFunc = () => {
    dispatch(register(data));
  };
  const loginFunc = () => {
    dispatch(login(data));
  };

  const handleChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setData((prev) => ({ ...prev, avatar: reader.result }));
          setPreview(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
  };

  useEffect(() => {
    if (isAuth) {
      navigate("/"); // Redirect to home if not authenticated
    }
  }, [isAuth, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <div className="text-2xl font-semibold text-center text-gray-700 mb-4">
          {signUp ? "Sign Up" : "Log In"}
        </div>
        {signUp && (
          <Input
            onChange={handleChange}
            value={data.name}
            type="text"
            name="name"
            id=""
            placeholder="Ad"
            className="mb-4"
          />
        )}
        <Input
          onChange={handleChange}
          value={data.email}
          type="text"
          name="email"
          id=""
          placeholder="Email"
          className="mb-4"
        />
        <Input
          onChange={handleChange}
          value={data.password}
          type="password"
          name="password"
          id=""
          placeholder="Password"
          className="mb-4"
        />
        {signUp && (
          <div className="flex items-center gap-4 mb-4">
            <img
              className="w-16 h-16 rounded-full object-cover border"
              src={preview}
              alt="User Avatar"
            />
            <Input
              onChange={handleChange}
              type="file"
              name="avatar"
              id=""
              className="text-gray-600 "
            />
          </div>
        )}
        <Button
          name={signUp ? "Sign Up" : "Log In"}
          onClick={signUp ? registerFunc : loginFunc}
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
        />
        <div className="mt-4 text-center text-gray-500">
          {signUp ? (
            <span>
              Already have an account?{" "}
              <button
                className="text-blue-500 hover:underline"
                onClick={() => setSignUp(false)}
              >
                Log In
              </button>
            </span>
          ) : (
            <span>
              {" Don't have an account? "}
              <button
                className="text-blue-500 hover:underline"
                onClick={() => setSignUp(true)}
              >
                Sign Up
              </button>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;

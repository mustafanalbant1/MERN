import Button from "../components/Button";

const ForgotPassword = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-center mb-4">
          Şifremi Unuttum
        </h2>

        <input
          placeholder="E-posta adresinizi girin"
          onChange={() => {}}
          name="email"
          id="email"
          type="email"
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <Button name="Onayla" onClick={() => {}} />
      </div>
    </div>
  );
};

export default ForgotPassword;

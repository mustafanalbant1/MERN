import Button from "../components/Button";

const ResetPassword = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-center mb-4">
          Yeni Şifre Oluştur
        </h2>

        <input
          placeholder="Yeni şifre girin"
          onChange={() => {}}
          name="password"
          id="passrord"
          type="password"
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <Button name="Onayla" onClick={() => {}} />
      </div>
    </div>
  );
};

export default ResetPassword;

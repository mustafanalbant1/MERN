const Input = ({ label, type = "text", ...props }) => {
  return (
    <div className="mb-5">
      <label className="block text-gray-700 text-sm font-semibold mb-2">
        {label}
      </label>
      <input
        type={type}
        className="w-full px-4 py-3.5 rounded-xl bg-white/50 border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none backdrop-blur-sm"
        {...props}
      />
    </div>
  );
};

export default Input;

const Button = ({ children, variant = "primary", ...props }) => {
  const variants = {
    primary:
      "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg shadow-blue-500/30 active:scale-[0.98]",
    secondary:
      "text-blue-600 hover:text-blue-700 bg-blue-50/50 hover:bg-blue-100/50 backdrop-blur-sm",
  };

  return (
    <button
      className={`${
        variants[variant]
      } px-6 py-3.5 rounded-xl font-semibold transform transition-all duration-200 hover:scale-[1.02] ${
        variant === "primary" ? "w-full" : ""
      }`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;

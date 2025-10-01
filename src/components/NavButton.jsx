function NavButton({ children, onClick, variant = "primary", className = "" }) {
  const baseStyle =
    "w-full font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition duration-200";

  const variants = {
    primary: "bg-green-400 text-white hover:bg-green-700 focus:ring-blue-500",
    secondary:
      "bg-green-200 text-green-400 hover:bg-green-600 hover:text-white focus:ring-blue-500",
    outline: "bg-white text-darkgray border border-darkgray hover:bg-slate-200",
  };

  return (
    <button
      onClick={onClick}
      className={`${baseStyle} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}

export default NavButton;

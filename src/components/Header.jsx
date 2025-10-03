import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import NavButton from "./NavButton";
function Header({ withUserMenu = false }) {
  const [dropdownOpen, setDropdownOpen] = useState(false); // avatar dropdown
  const [mobileOpen, setMobileOpen] = useState(false); // hamburger
  const [currentUser, setCurrentUser] = useState(null); // user login
  const menuRef = useRef(null);
  const navigate = useNavigate();

  // cek localStorage
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    setCurrentUser(user);
  }, []);

  // close dropdown outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("currentUser");
    setCurrentUser(null); // reset state
    navigate("/login");
  };

  return (
    <header>
      <div className="fixed top-0 left-0 w-full bg-white h-auto z-50 shadow-lg">
        <div className="px-4 lg:px-16 py-2 flex bg-white items-center justify-between">
          {/* Logo kiri */}
          <div className="flex items-center">
            <img
              src={`${import.meta.env.BASE_URL}logo.png`}
              alt="Logo"
              className="h-12 w-auto"
            />
          </div>

          {/* Menu kanan */}
          {withUserMenu && (
            <>
              {/* Desktop */}
              <div className="hidden md:flex items-center gap-6" ref={menuRef}>
                <button className="text-gray-700 hover:text-black">
                  Kategori
                </button>

                {currentUser ? (
                  // login → avatar + dropdown
                  <div className="relative">
                    <img
                      src={`${import.meta.env.BASE_URL}pp.png`}
                      alt="User"
                      className="h-10 w-10 rounded-lg cursor-pointer"
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                    />

                    {dropdownOpen && (
                      <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-md">
                        <ul className="py-2 text-sm text-gray-700">
                          <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                            Profil Saya
                          </li>
                          <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                            Kelas Saya
                          </li>
                          <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                            Pesanan Saya
                          </li>
                          <li
                            className="px-4 py-2 hover:bg-gray-100 text-red-500 cursor-pointer flex items-center gap-2"
                            onClick={handleLogout}
                          >
                            Keluar <span>↪</span>
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                ) : (
                  // not login = login reg
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => navigate("/login")}
                      className="px-4 py-2 bg-[#F64920] text-white rounded hover:bg-[#d43b1a]"
                    >
                      Login
                    </button>
                    <button
                      onClick={() => navigate("/register")}
                      className="px-4 py-2 border border-[#F64920] text-[#F64920] rounded hover:bg-[#F64920] hover:text-white"
                    >
                      Register
                    </button>
                  </div>
                )}
              </div>

              {/* Mobile hamburger */}
              <div className="md:hidden">
                <button onClick={() => setMobileOpen(!mobileOpen)}>
                  {mobileOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
              </div>
            </>
          )}
        </div>

        {/* Mobile full menu */}
        {withUserMenu && mobileOpen && (
          <div className="md:hidden bg-white border-t shadow-md w-full">
            <ul className="flex flex-col text-gray-700 text-base">
              <li className="px-6 py-3 border-b border-gray-200 hover:bg-gray-100 cursor-pointer">
                Kategori
              </li>

              {currentUser ? (
                <>
                  <li className="px-6 py-3 border-b border-gray-200 hover:bg-gray-100 cursor-pointer">
                    Profil Saya
                  </li>
                  <li className="px-6 py-3 border-b border-gray-200 hover:bg-gray-100 cursor-pointer">
                    Kelas Saya
                  </li>
                  <li className="px-6 py-3 border-b border-gray-200 hover:bg-gray-100 cursor-pointer">
                    Pesanan Saya
                  </li>
                  <li
                    className="px-6 py-3 hover:bg-gray-100 text-red-500 cursor-pointer flex items-center gap-2"
                    onClick={handleLogout}
                  >
                    Keluar <span>↪</span>
                  </li>
                </>
              ) : (
                <>
                  <li className="w-full px-4 py-2">
                    <NavButton
                      type="button"
                      onClick={() => navigate("/login")}
                      variant="primary"
                      className=" "
                    >
                      Login
                    </NavButton>
                  </li>
                  <li className="w-full px-4 py-2">
                    <NavButton
                      type="button"
                      onClick={() => navigate("/register")}
                      variant="secondary"
                      className=""
                    >
                      Register
                    </NavButton>
                  </li>
                </>
              )}
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;

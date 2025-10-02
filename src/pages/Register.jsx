// src/pages/Register.jsx
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";
import NavButton from "../components/NavButton";
import eyesOff from "../assets/eyesoff.png";
import eyesOn from "../assets/eyeson.png";
import { register, fetchUsers } from "../slices/authSlice";

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, users } = useSelector((state) => state.auth);

  // Form state
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  // Toggle password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // Country dropdown
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState({
    flag: "https://flagcdn.com/w20/id.png",
    code: "+62",
  });

  const countries = [
    { flag: "https://flagcdn.com/w20/id.png", code: "+62" },
    { flag: "https://flagcdn.com/w20/us.png", code: "+1" },
    { flag: "https://flagcdn.com/w20/sg.png", code: "+65" },
  ];

  const handleSelectCountry = (country) => {
    setSelectedCountry(country);
    setDropdownOpen(false);
  };

  // Ambil semua user dulu (untuk validasi email duplikat)
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleRegister = (e) => {
    e.preventDefault();

    // Validasi form
    if (!nama || !email || !phone || !password || !confirm) {
      alert("Semua field wajib diisi!");
      return;
    }
    if (password !== confirm) {
      alert("Password dan konfirmasi tidak sama!");
      return;
    }

    // Cek duplikat email dari Redux state
    const userExists = users.find((u) => u.email === email);
    if (userExists) {
      alert("Email sudah terdaftar!");
      return;
    }

    const newUser = {
      nama,
      email,
      phone: `${selectedCountry.code}${phone}`,
      password,
    };

    dispatch(register(newUser))
      .unwrap()
      .then(() => {
        alert("Registrasi berhasil! Silakan login.");
        navigate("/login");
      })
      .catch((err) => alert(err));
  };

  return (
    <div className="bg-[#FFFDF3]">
      <Header />

      <section
        id="Register"
        className="min-h-screen flex items-center justify-center py-36"
      >
        <div className="bg-white rounded-lg shadow-lg p-8 text-center w-5/6 lg:w-1/2">
          <h1 className="text-3xl font-bold">Pendaftaran Akun</h1>
          <h2 className="text-darkgray text-lg">
            Yuk, daftarkan akunmu sekarang juga!
          </h2>

          {error && <p className="text-red-500 mb-3">{error}</p>}

          <form onSubmit={handleRegister} className="mt-8">
            {/* Nama */}
            <div className="mb-5 text-start">
              <label htmlFor="nama">
                Nama Lengkap <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="nama"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border rounded-md"
                required
              />
            </div>

            {/* Email */}
            <div className="mb-5 text-start">
              <label htmlFor="email">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border rounded-md"
                required
              />
            </div>

            {/* Phone */}
            <div className="mb-5 text-start">
              <label htmlFor="phonenumber">
                No. HP <span className="text-red-500">*</span>
              </label>
              <div className="flex relative">
                <button
                  type="button"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center border rounded-l-md px-2 py-2 bg-white mr-8"
                >
                  <img src={selectedCountry.flag} className="w-5 h-4 mr-2" />
                  {selectedCountry.code}
                  <svg
                    className={`w-10 h-10 ml-1 transform transition-transform duration-200 ${
                      dropdownOpen ? "rotate-180" : "rotate-0"
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {dropdownOpen && (
                  <ul className="absolute left-0 top-full mt-1 bg-white border rounded-md shadow-md z-10">
                    {countries.map((c, i) => (
                      <li
                        key={i}
                        className="px-3 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                        onClick={() => handleSelectCountry(c)}
                      >
                        <img src={c.flag} className="w-5 h-4 mr-2" />
                        {c.code}
                      </li>
                    ))}
                  </ul>
                )}

                <input
                  type="tel"
                  id="phonenumber"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="block w-full px-3 py-2 border rounded-r-md"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="mb-5 text-start">
              <label htmlFor="password">
                Kata Sandi <span className="text-red-500">*</span>
              </label>
              <div className="flex border rounded-md">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="flex-1 px-3 py-2"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="px-3"
                >
                  <img
                    src={showPassword ? eyesOn : eyesOff}
                    alt="toggle"
                    className="w-5 h-5"
                  />
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="mb-5 text-start">
              <label htmlFor="confirm">
                Konfirmasi Kata Sandi <span className="text-red-500">*</span>
              </label>
              <div className="flex border rounded-md">
                <input
                  type={showConfirm ? "text" : "password"}
                  id="confirm"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  className="flex-1 px-3 py-2"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="px-3"
                >
                  <img
                    src={showConfirm ? eyesOn : eyesOff}
                    alt="toggle confirm"
                    className="w-5 h-5"
                  />
                </button>
              </div>
            </div>

            {/* Tombol */}
            <NavButton
              type="submit"
              variant="primary"
              className="mb-6"
              disabled={loading}
            >
              {loading ? "Loading..." : "Register"}
            </NavButton>

            <NavButton
              type="button"
              onClick={() => navigate("/login")}
              variant="secondary"
            >
              Login
            </NavButton>
          </form>
        </div>
      </section>
    </div>
  );
}

export default Register;

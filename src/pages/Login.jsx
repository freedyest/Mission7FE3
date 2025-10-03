import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header.jsx";
import NavButton from "../components/NavButton.jsx";
import eyesOff from "../assets/eyesoff.png";
import eyesOn from "../assets/eyeson.png";
import { fetchUsers } from "../slices/authSlice";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.auth);

  // Form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // take all api
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Semua field wajib diisi!");
      return;
    }

    if (users.length === 0) {
      alert("Belum ada akun terdaftar. Silakan register dulu.");
      return;
    }

    // Cari user di state Redux
    const foundUser = users.find(
      (u) => u.email === email && u.password === password
    );

    if (foundUser) {
      //  user login ke localStorage  dan Redux state
      localStorage.setItem("currentUser", JSON.stringify(foundUser));
      alert(`Login berhasil! Selamat datang ${foundUser.nama}`);
      navigate("/Home");
    } else {
      alert("Email atau password salah!");
    }
  };

  const handleRegister = () => {
    navigate("/Register");
  };

  return (
    <div className="bg-[#FFFDF3]">
      <Header />
      <section
        id="loginform"
        className="min-h-screen flex items-center justify-center py-32 md:py-36"
      >
        <div className="bg-white rounded-lg shadow-lg p-4 md:p-8 text-center w-4/5 md:w-1/2">
          <h1 className="text-3xl font-bold">Masukkan Akun</h1>
          <h2 className="text-[#333333AD] text-lg">
            Yuk, lanjutin belajarmu di videobelajar.
          </h2>

          {error && <p className="text-red-500 mb-3">{error}</p>}

          <form onSubmit={handleLogin} className="mt-8">
            {/* Email */}
            <div className="mb-5 text-start">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                E-mail <span className="text-red-600">*</span>
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>

            {/* Password */}
            <div className="mb-5 text-start">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Kata Sandi <span className="text-red-600">*</span>
              </label>
              <div className="flex justify-between w-full border border-gray-300 rounded-md shadow-sm">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="flex-1 px-3 py-2 focus:outline-none rounded-l-md"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="px-3"
                >
                  <img
                    src={showPassword ? eyesOn : eyesOff}
                    alt="toggle password"
                    className="w-5 h-5"
                  />
                </button>
              </div>
            </div>

            {/* Forget password */}
            <div className="mb-5 text-end">
              <a href="#" className="text-darkgray hover:underline text-md">
                Lupa password?
              </a>
            </div>

            {/* Tombol */}
            <div>
              <NavButton
                type="submit"
                variant="primary"
                className="mb-8"
                disabled={loading}
              >
                {loading ? "Loading..." : "Masuk"}
              </NavButton>
            </div>
          </form>
          <div>
            <NavButton
              type="button"
              onClick={handleRegister}
              variant="secondary"
              className="mb-6"
            >
              Register
            </NavButton>
          </div>

          {/* Atau */}
          <div className="flex items-center my-6">
            <hr className="flex-grow border-gray-300" />
            <span className="px-3 text-gray-500 text-sm">atau</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          <button className="flex justify-center items-center w-full font-bold bg-white text-darkgray py-2 px-4 rounded-md hover:bg-slate-400 border border-darkgray">
            <img
              src={`${import.meta.env.BASE_URL}google.png`}
              alt="Google"
              className="h-10 w-10 mr-2"
            />
            <span>Masuk dengan Google</span>
          </button>
        </div>
      </section>
    </div>
  );
}

export default Login;

import { useState } from "react";

function Footer() {
  const [open, setOpen] = useState({
    kategori: false,
    perusahaan: false,
    komunitas: false,
  });

  const toggle = (key) => {
    setOpen((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // arrow
  const Chevron = ({ isOpen }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`w-5 h-5 text-gray-400 transform transition-transform duration-200 ${
        isOpen ? "rotate-90" : "rotate-0"
      }`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 5l7 7-7 7"
      />
    </svg>
  );

  return (
    <footer className="bg-white mt-12 w-full pt-14 h-auto md:px-20">
      <div className="flex flex-wrap justify-between lg:flex-nowrap">
        {/* Kiri */}
        <div className="w-full mb-6 pl-4 pr-4 md:mb-0 md:w-1/3 md:p-0 box-border">
          <img
            src={`${import.meta.env.BASE_URL}logo.png`}
            alt=""
            className="w-auto h-16"
          />
          <div className="md:w-full">
            <h3 className="mt-6 font-bold text-md text-darkgray">
              Gali Potensi Anda Melalui Pembelajaran Video di videobelajar.id!
            </h3>
            <p className="text-darkgray mt-3">
              Jl. Usman Effendi No. 50 Lowokwaru, Malang
            </p>
            <p className="text-darkgray mt-3">+62-877-7123-1234</p>
          </div>
        </div>

        {/* Kanan dengan dropdown */}
        <div className="pl-4 pr-4 md:pr-0 md:flex justify-between w-full md:w-1/3">
          {/* Kategori */}
          <div className="w-full md:w-auto mb-4 md:mb-0">
            <button
              onClick={() => toggle("kategori")}
              className="w-full flex justify-between items-center text-black font-bold text-lg mb-2 md:mb-4 md:cursor-default"
            >
              Kategori
              <span className="md:hidden">
                <Chevron isOpen={open.kategori} />
              </span>
            </button>
            <ul
              className={`${
                open.kategori ? "block" : "hidden"
              } md:block space-y-2 text-darkgray`}
            >
              <li>
                <a href="#" className="hover:underline">
                  Digital & Teknologi
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Pemasaran
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Manajemen Bisnis
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Pengembangan Diri
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Desain
                </a>
              </li>
            </ul>
          </div>

          {/* Perusahaan */}
          <div className="w-full md:w-auto mb-4 md:mb-0">
            <button
              onClick={() => toggle("perusahaan")}
              className="w-full flex justify-between items-center text-black font-bold text-lg mb-2 md:mb-4 md:cursor-default"
            >
              Perusahaan
              <span className="md:hidden">
                <Chevron isOpen={open.perusahaan} />
              </span>
            </button>
            <ul
              className={`${
                open.perusahaan ? "block" : "hidden"
              } md:block space-y-2 text-darkgray`}
            >
              <li>
                <a href="#" className="hover:underline">
                  Tentang Kami
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Kebijakan Privasi
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Ketentuan Layanan
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Bantuan
                </a>
              </li>
            </ul>
          </div>

          {/* Komunitas */}
          <div className="w-full md:w-auto">
            <button
              onClick={() => toggle("komunitas")}
              className="w-full flex justify-between items-center text-black font-bold text-lg mb-2 md:mb-4 md:cursor-default"
            >
              Komunitas
              <span className="md:hidden">
                <Chevron isOpen={open.komunitas} />
              </span>
            </button>
            <ul
              className={`${
                open.komunitas ? "block" : "hidden"
              } md:block space-y-2 text-darkgray`}
            >
              <li>
                <a href="#" className="hover:underline">
                  Tips Sukses
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Blog
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Credit */}
      <hr className="border-t border-gray-300 mt-4" />
      <div className="pl-4 flex flex-col-reverse md:flex-row md:text-center text-gray-500 text-sm py-4 md:px-0 justify-between pb-8 items-start">
        <div className="mt-4 md:mt-0">
          <p>@2025 Freedy estiawan All Rights Reserved.</p>
        </div>
        {/* Social Media */}
        <div className="flex space-x-4">
          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/freedy-estiawan-bbb98b244/"
            className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-400 transition group hover:bg-gray-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="w-5 h-5 text-gray-800 group-hover:text-white"
              fill="currentColor"
            >
              <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.5 8h4V24h-4V8zm7.5 0h3.8v2.2h.05c.53-1 1.82-2.2 3.75-2.2 4.01 0 4.75 2.64 4.75 6.08V24h-4v-7.6c0-1.81-.03-4.15-2.53-4.15-2.54 0-2.93 1.98-2.93 4.02V24h-4V8z" />
            </svg>
          </a>

          {/* Facebook */}
          <a
            href="https://www.facebook.com/share/14MAKGZ9rkM/"
            className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-400 transition group hover:bg-gray-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="w-5 h-5 text-gray-800 group-hover:text-white"
              fill="currentColor"
            >
              <path d="M22.675 0h-21.35C.597 0 0 .597 0 1.326v21.348C0 23.403.597 24 1.326 24h11.49v-9.294H9.691v-3.622h3.125V8.413c0-3.1 1.894-4.788 4.659-4.788 1.325 0 2.464.099 2.795.143v3.24h-1.918c-1.505 0-1.796.716-1.796 1.764v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.403 24 24 23.403 24 22.674V1.326C24 .597 23.403 0 22.675 0z" />
            </svg>
          </a>

          {/* Instagram */}
          <a
            href="https://www.instagram.com/freedyestiw?igsh=OG0zZGZpazFyMWoz"
            className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-400 transition group hover:bg-gray-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="w-5 h-5 text-gray-800 group-hover:text-white"
              fill="currentColor"
            >
              <path d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9a5.5 5.5 0 0 1-5.5 5.5h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2zm0 2C6.12 4 5 5.12 5 6.5v11c0 1.38 1.12 2.5 2.5 2.5h11c1.38 0 2.5-1.12 2.5-2.5v-11C21 5.12 19.88 4 18.5 4h-11zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm5.25-.75a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0z" />
            </svg>
          </a>

          {/* Twitter */}
          <a
            href="#"
            className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-400 transition group hover:bg-gray-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="w-5 h-5 text-gray-800 group-hover:text-white"
              fill="currentColor"
            >
              <path d="M23.954 4.569c-.885.392-1.83.656-2.825.775 1.014-.611 1.794-1.574 2.163-2.724-.951.564-2.005.974-3.127 1.195a4.515 4.515 0 0 0-7.691 4.118A12.82 12.82 0 0 1 1.671 3.149a4.514 4.514 0 0 0 1.397 6.022c-.806-.026-1.566-.248-2.229-.616v.062a4.515 4.515 0 0 0 3.623 4.423c-.696.19-1.452.232-2.224.084a4.517 4.517 0 0 0 4.216 3.135A9.06 9.06 0 0 1 .96 19.54a12.787 12.787 0 0 0 6.918 2.027c8.307 0 12.845-6.874 12.845-12.845 0-.196-.004-.392-.013-.586a9.22 9.22 0 0 0 2.244-2.367z" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

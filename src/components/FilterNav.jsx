import { useState } from "react";

function FilterNav({ categories = [], onFilterChange }) {
  const [active, setActive] = useState("all");

  const handleClick = (filter) => {
    setActive(filter);
    if (onFilterChange) onFilterChange(filter);
  };

  return (
    <section id="mininav" className="text-[#333333AD] px-2">
      <nav className="flex flex-wrap items-center gap-6 pt-12 font-semibold text-lg">
        {categories.map(({ key, label }) => (
          <a
            key={key}
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleClick(key);
            }}
            className={`filter-btn ${
              active === key
                ? "active text-[#F64920] underline decoration-4 underline-offset-8 rounded-lg"
                : ""
            }`}
          >
            {label}
          </a>
        ))}
      </nav>
    </section>
  );
}

export default FilterNav;

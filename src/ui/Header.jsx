import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const { name } = useSelector((store) => store.customer);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();
    navigate(`/order/${query}`);
    setQuery("");
  }
  return (
    <div className="flex items-center justify-between bg-yellow-400 p-3 font-semibold uppercase   ">
      <Link to="/">
        <h1 className="tracking-widest ">FAST REACT PIZZA CO.</h1>
      </Link>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          placeholder="Search order #"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="input w-32 bg-yellow-100 py-2 text-sm font-normal focus:w-40 md:w-64 md:focus:w-72 "
        />
      </form>
      {name ? <p className="hidden uppercase sm:block">{name}</p> : null}
    </div>
  );
}

export default Header;

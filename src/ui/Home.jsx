import { useNavigate, useNavigation } from "react-router-dom";
import Footer from "./Footer";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createName } from "../features/Customer/customerSlice";
import Button from "./Button";
function Home() {
  const { name: customerName } = useSelector((store) => store.customer);
  const [name, setName] = useState(customerName);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();
    if (customerName === "") dispatch(createName(name));
    navigate("/menu");
  }
  const idleState = useNavigation().state === "submitting";
  return (
    <div className="m-12 md:m-16">
      <h1 className="mb-7 text-center text-2xl font-semibold md:text-4xl ">
        The best pizza .
        <br />
        <span className="text-yellow-500">
          Straight out of the oven, straight to you.
        </span>
      </h1>
      <form onSubmit={(e) => handleSubmit(e)} className="text-center">
        {!customerName ? (
          <>
            <p className="mb-4 text-center">
              👋 Welcome! Please start by telling us your name:
            </p>
            <input
              type="text"
              placeholder="Your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input mb-8 w-64 border-2 border-stone-200 bg-stone-100 pl-4 "
            />
            <br />
          </>
        ) : null}
        {name ? (
          <Button type="primary">
            {customerName && !idleState
              ? `CONTINUE ORDERING, ${customerName.split(" ")[0]}`
              : "START ORDERING"}
          </Button>
        ) : null}
      </form>
      <Footer />
    </div>
  );
}

export default Home;

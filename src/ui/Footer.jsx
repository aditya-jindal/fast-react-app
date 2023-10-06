import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Footer() {
  const cart = useSelector((store) => store.cart);
  const totalAmt = cart.reduce(
    (rec, cartItem) => rec + cartItem.qty * cartItem.unitPrice,
    0,
  );
  const totalQty = cart.reduce((rec, cartItem) => rec + cartItem.qty, 0);
  return totalQty ? (
    <footer className="fixed bottom-0 left-0 right-0 flex justify-between bg-stone-800 p-4 text-sm font-bold text-stone-200 ">
      <p className="space-x-5 px-2  text-stone-300">
        <span>{totalQty} PIZZAS</span> <span>${totalAmt.toFixed(2)}</span>
      </p>
      <p>
        <Link to="/cart">OPEN CART →</Link>{" "}
      </p>
    </footer>
  ) : null;
}

export default Footer;

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartItem from "./CartItem";
import { clearCart } from "./cartSlice";
import Button from "../../ui/Button";
function Cart() {
  const { name } = useSelector((store) => store.customer);
  const cart = useSelector((store) => store.cart);
  const dispatch = useDispatch();
  return (
    <div className="mx-auto max-w-screen-md p-3">
      <Link to="/menu" className="text-blue-500 hover:text-blue-300">
        ← Back to menu
      </Link>
      {cart.length ? (
        <>
          <h3 className="my-5 text-xl font-semibold tracking-wider">
            Your cart, <span className="capitalize">{name}</span>
          </h3>
          <ul>
            {cart.map((cartItem) => (
              <CartItem cartItem={cartItem} key={cartItem.id} />
            ))}
            <li className="flex gap-2 px-1 py-5 ">
              <div className="font-semibold tracking-wider">
                <p>Total Amount:</p>{" "}
              </div>
              <div className="font-semibold">
                $
                {cart
                  .reduce(
                    (rec, cartItem) => rec + cartItem.qty * cartItem.unitPrice,
                    0,
                  )
                  .toFixed(2)}
              </div>
            </li>
          </ul>
          <div className="space-x-2">
            <Link to="/order/new">
              {" "}
              <Button type="primary">ORDER PIZZAS</Button>
            </Link>
            <Button type="clear" onClick={() => dispatch(clearCart())}>
              CLEAR CART
            </Button>
          </div>
        </>
      ) : (
        <p>Your cart is still empty. Start adding some pizzas :)</p>
      )}
    </div>
  );
}

export default Cart;

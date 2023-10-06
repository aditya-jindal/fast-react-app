import { useDispatch, useSelector } from "react-redux";
import { changeQty } from "../features/Cart/cartSlice";
import Button from "./Button";

function QuantityModifier({ cartItem }) {
  const dispatch = useDispatch();
  const cart = useSelector((store) => store.cart);
  console.log(cart);
  const [{ qty }] = cart.filter((item) => item.id === cartItem.id);
  return (
    <div className="flex items-center gap-2">
      <Button
        type="minus"
        onClick={() => {
          dispatch(changeQty(cartItem, -1));
        }}
      >
        -
      </Button>
      <p className="text-sm">{qty}</p>
      <Button type="plus" onClick={() => dispatch(changeQty(cartItem, 1))}>
        +
      </Button>
    </div>
  );
}

export default QuantityModifier;

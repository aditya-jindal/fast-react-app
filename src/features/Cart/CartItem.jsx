import { useDispatch } from "react-redux";
import QuantityModifier from "../../ui/QuantityModifier";
import { deleteItem } from "./cartSlice";
import Button from "../../ui/Button";

function CartItem({ cartItem }) {
  const dispatch = useDispatch();
  return (
    <li className="flex flex-col justify-between gap-y-2 border-b py-2 md:flex-row md:justify-between">
      <div className="space-x-1 tracking-wider">
        <span>{cartItem.qty}x</span> <span>{cartItem.name}</span>
      </div>
      <div className="flex justify-between gap-6">
        <span className="font-semibold">
          ${(cartItem.unitPrice * cartItem.qty).toFixed(2)}
        </span>
        <QuantityModifier cartItem={cartItem} />
        <Button type="secondary" onClick={() => dispatch(deleteItem(cartItem))}>
          DELETE
        </Button>
      </div>
    </li>
  );
}

export default CartItem;

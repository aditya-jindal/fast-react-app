import QuantityModifier from "../../ui/QuantityModifier";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, deleteItem } from "../Cart/cartSlice";
import Button from "../../ui/Button";

function MenuItem({ pizza }) {
  const dispatch = useDispatch();
  const cart = useSelector((store) => store.cart);
  const inCart =
    cart.filter((cartItem) => cartItem.id === pizza.id).length !== 0;
  function handleClick() {
    if (!inCart) dispatch(addToCart(pizza));
    else dispatch(deleteItem(pizza));
  }
  const { imageUrl, name, ingredients, soldOut, unitPrice } = pizza;
  return (
    <li className="mx-auto grid max-w-screen-md grid-cols-[auto_1fr] gap-4 py-2">
      <img src={imageUrl} alt={name} className="h-24" />
      <div className="flex flex-col justify-between ">
        <div>
          <p className="font-semibold tracking-wide">{name}</p>
          <p className="text-sm capitalize italic tracking-wide text-stone-500">
            {ingredients.join(",            ")}
          </p>
        </div>
        <div className="mt-2 flex items-center justify-between">
          {soldOut ? (
            <p>SOLD OUT</p>
          ) : (
            <>
              <p className="text-stone-500">${unitPrice.toFixed(2)}</p>
              <div className="flex gap-3">
                {inCart && <QuantityModifier cartItem={pizza} />}
                <Button onClick={handleClick} type="secondary">
                  {inCart ? "DELETE" : "ADD TO CART"}{" "}
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;

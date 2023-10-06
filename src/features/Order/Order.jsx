import { useLoaderData } from "react-router";
import { getOrder, updateOrder } from "../../api";
import OrderItem from "./OrderItem";
import { useFetcher } from "react-router-dom";
import Status from "./Status";
import Button from "../../ui/Button";
import { useDispatch } from "react-redux";
import { clearCart } from "../Cart/cartSlice";
import { useEffect } from "react";
function Order() {
  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = useLoaderData();
  const fetcher = useFetcher();
  const dispatch = useDispatch();
  useEffect(
    function () {
      dispatch(clearCart());
    },
    [dispatch],
  );
  function minutesLeft() {
    const now = new Date();
    const target = new Date(estimatedDelivery);
    const differenceInMilliseconds = target - now;
    const minutesLeft = Math.floor(differenceInMilliseconds / (1000 * 60));
    return minutesLeft;
  }
  function deliveryTime() {
    const date = new Date(estimatedDelivery);
    const options = {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    const formattedDate = date.toLocaleDateString("en-US", options);

    return `${formattedDate}`;
  }
  return (
    <div className="mx-auto max-w-screen-md space-y-6 p-5">
      <div className="space-y-2 sm:flex sm:justify-between">
        <h1 className="text-xl font-semibold">Order #{id} status</h1>
        <div className="space-x-2">
          {priority ? <Status color="bg-red-500">PRIORITY</Status> : null}
          <Status color="bg-green-500">
            {status === "preparing" ? "Preparing Order" : "Delivered"}
          </Status>
        </div>
      </div>
      <div className="space-y-1 bg-stone-200 p-4 sm:flex sm:justify-between">
        <p className="font-semibold">Only {minutesLeft()} minutes left 😃</p>
        <p className="text-sm tracking-wider text-stone-500">
          (Estimated delivery: {deliveryTime()})
        </p>
      </div>
      <ul>
        {cart.map((pizza) => (
          <OrderItem pizza={pizza} key={pizza.pizzaId} />
        ))}
      </ul>
      <div className="space-y-1 bg-stone-200 p-4">
        <p>Price pizza: ${orderPrice.toFixed(2)}</p>
        {priority ? <p>Price priority: ${priorityPrice.toFixed(2)}</p> : null}
        <p className="font-bold">
          To pay on delivery: $
          {`${
            priority
              ? (orderPrice + priorityPrice).toFixed(2)
              : orderPrice.toFixed(2)
          }`}
        </p>
      </div>
      {!priority ? (
        <fetcher.Form method="PATCH">
          <Button type="primary">MAKE PRIORITY</Button>
        </fetcher.Form>
      ) : null}
    </div>
  );
}

export async function loader({ params }) {
  const { orderID } = params;
  const order = await getOrder(orderID);
  return order;
}

export async function action({ request, params }) {
  const data = { priority: true };
  console.log(params.orderID);
  await updateOrder(params.orderID, data);
  return null;
}

export default Order;

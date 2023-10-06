import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import Footer from "../../ui/Footer";
import { useState } from "react";
import { useSelector } from "react-redux";
import { newOrder } from "../../api";
import Button from "../../ui/Button";

function NewOrder() {
  const navigate = useNavigation();
  const loading = navigate.state !== "idle";
  const cart = useSelector((store) => store.cart);
  // let cartCopy;
  // if (Object.keys(cart).length !== 0) cartCopy = cart;
  const { name, phoneNo, address } = useSelector((store) => store.customer);
  const formErr = useActionData();
  const totalAmt = cart.reduce(
    (rec, cartItem) => rec + cartItem.qty * cartItem.unitPrice,
    0,
  );
  const [priority, setPriority] = useState(false);
  return (
    <div className="mx-auto max-w-screen-md px-4">
      <h1 className="my-5 text-xl font-semibold tracking-wider">
        Ready to order? Let&apos;s go!
      </h1>
      <Form method="POST" className="mt-8 space-y-3">
        <div className="flex flex-col space-y-1.5">
          <label className=" tracking-wider">Full Name</label>
          <input
            className="input "
            type="text"
            name="customer"
            defaultValue={name}
            required
          />
        </div>
        <div className="flex flex-col space-y-1.5">
          <label className=" tracking-wider">Phone number</label>
          <input
            className="input "
            type="text"
            name="phoneNo"
            defaultValue={phoneNo}
            required
          />
          {formErr?.phone && (
            <p className="rounded-lg bg-red-100 p-2 text-sm text-red-700">
              {formErr.phone}
            </p>
          )}
        </div>
        <div className="flex flex-col space-y-1.5">
          <label className=" tracking-wider">Address</label>
          <input
            className="input "
            type="text"
            name="address"
            defaultValue={address}
            required
          />
        </div>
        <div className="flex items-center space-x-4 py-6">
          <input
            className="h-6 w-6 cursor-pointer accent-yellow-400"
            type="checkbox"
            name="priority"
            checked={priority}
            onChange={() => setPriority((val) => !val)}
          />
          <label className="text-lg font-semibold ">
            Want to give your order priority?
          </label>
        </div>
        <input type="hidden" name="cart" value={JSON.stringify(cart)} />
        <Button
          // onClick={() => dispatch(clearCart())}
          type="primary"
          disabled={loading}
        >
          {loading
            ? "PLACING ORDER..."
            : `ORDER NOW FOR $${(priority
                ? Math.floor(totalAmt * 1.2)
                : totalAmt
              ).toFixed(2)}`}
        </Button>
      </Form>
      <Footer />
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const obj = Object.fromEntries(formData);
  const objUpdated = {
    customer: obj.customer,
    phone: "9999999999",
    address: "sample address",
    priority: obj.priority === "on",
    cart: JSON.parse(obj.cart).map((pizza) => {
      return {
        pizzaId: pizza.id,
        name: pizza.name,
        quantity: pizza.qty,
        unitPrice: pizza.unitPrice,
        totalPrice: pizza.totalPrice,
      };
    }),
  };
  const err = {};
  if (String(Number(obj.phoneNo)).length !== 10)
    err.phone = "Please enter a valid phone number.";
  if (Object.keys(err).length !== 0) return err;
  const order = await newOrder(objUpdated);
  return redirect(`/order/${order.id}`);
}

export default NewOrder;

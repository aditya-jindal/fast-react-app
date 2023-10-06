function OrderItem({ pizza }) {
  const { name, quantity, totalPrice } = pizza;
  return (
    <li className="flex justify-between border-y py-4">
      <div className="space-x-2">
        <span className="text-sm font-semibold">{quantity}x</span>{" "}
        <span>{name}</span>
      </div>
      <div className="text-sm font-bold">${totalPrice.toFixed(2)}</div>
    </li>
  );
}

export default OrderItem;

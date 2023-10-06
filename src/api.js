const API_URL = "https://react-fast-pizza-api.onrender.com/api";

export async function getMenu() {
  const res = await fetch(`${API_URL}/menu`);
  if (!res.ok) throw Error("Error fetching menu");
  const { data } = await res.json();
  return data;
}

export async function getOrder(orderID) {
  const res = await fetch(`${API_URL}/order/${orderID}`);
  if (!res.ok) throw Error("Order not found");
  const { data } = await res.json();
  return data;
}

export async function newOrder(orderDetails) {
  try {
    const res = await fetch(`${API_URL}/order`, {
      method: "POST",
      body: JSON.stringify(orderDetails),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) throw Error;
    const { data } = await res.json();
    return data;
  } catch (err) {
    throw Error("Failed to place new order");
  }
}

export async function updateOrder(id, updateObj) {
  try {
    const res = await fetch(`${API_URL}/order/${id}`, {
      method: "PATCH",
      body: JSON.stringify(updateObj),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) throw Error();
  } catch (err) {
    throw Error("Failed updating your order");
  }
}

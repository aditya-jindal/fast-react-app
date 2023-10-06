import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Error from "./ui/Error";
import AppLayout from "./ui/AppLayout";
import Home from "./ui/Home";
import Menu from "./features/Menu/Menu";
import Cart from "./features/Cart/Cart";
import NewOrder, { action as newOrderAction } from "./features/Order/NewOrder";
import Order, {
  loader as orderLoader,
  action as updateAction,
} from "./features/Order/Order";
import { loader as menuLoader } from "./features/Menu/Menu";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/menu",
        element: <Menu />,
        loader: menuLoader,
        errorElement: <Error />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/order/new",
        element: <NewOrder />,
        action: newOrderAction,
      },
      {
        path: "/order/:orderID",
        element: <Order />,
        errorElement: <Error />,
        loader: orderLoader,
        action: updateAction,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

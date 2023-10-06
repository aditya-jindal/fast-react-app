import { useLoaderData } from "react-router";
import { getMenu } from "../../api";
import Footer from "../../ui/Footer";
import MenuItem from "./MenuItem";
function Menu() {
  const menu = useLoaderData();
  return (
    <div className="mb-5 overflow-scroll p-2">
      <ul>
        {menu.map((menuItem) => (
          <MenuItem pizza={menuItem} key={menuItem.id} />
        ))}
      </ul>
      <Footer />
    </div>
  );
}

export async function loader() {
  const menu = await getMenu();
  return menu;
}

export default Menu;

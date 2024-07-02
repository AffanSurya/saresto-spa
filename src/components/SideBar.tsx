import { Sidebar } from "flowbite-react";
import {
  HiArrowSmRight,
  HiChartPie,
  HiShoppingBag,
  HiShoppingCart,
  HiTable,
  HiUser,
} from "react-icons/hi";
import { IoFastFood } from "react-icons/io5";
import { Link } from "react-router-dom";

export function SideBarComponent() {
  return (
    <Sidebar aria-label="Default sidebar example" className="fixed pt-14">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item href="#" icon={HiChartPie}>
            Dashboard
          </Sidebar.Item>

          <Link to="/dashboard/orders">
            <Sidebar.Item icon={HiShoppingCart}>Pesanan</Sidebar.Item>
          </Link>

          <Link to="/dashboard/menu-item">
            <Sidebar.Item href="#" icon={IoFastFood}>
              Menu Makanan
            </Sidebar.Item>
          </Link>

          <Sidebar.Item href="#" icon={HiUser}>
            Users
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiShoppingBag}>
            Products
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiArrowSmRight}>
            Sign In
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiTable}>
            Sign Up
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}

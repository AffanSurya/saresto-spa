import {
  Avatar,
  DarkThemeToggle,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";
import { Link, useLocation } from "react-router-dom";

function NavbarComponent() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <Navbar fluid rounded>
      <Link to="/">
        <NavbarBrand>
          <img
            src="/logo-saresto.png"
            className="mr-3 h-6 sm:h-9"
            alt="Sa Resto logo"
          />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            Sa Resto
          </span>
        </NavbarBrand>
      </Link>
      <div className="flex md:order-2">
        <DarkThemeToggle className="mr-4" />
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar
              alt="User settings"
              img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
              rounded
            />
          }
        >
          <DropdownHeader>
            <span className="block text-sm">Bonnie Green</span>
            <span className="block truncate text-sm font-medium">
              name@flowbite.com
            </span>
          </DropdownHeader>
          <DropdownItem>
            <Link to="/dashboard">Dashboard</Link>
          </DropdownItem>
          <DropdownDivider />
          <DropdownItem>Log out</DropdownItem>
        </Dropdown>
        <NavbarToggle />
      </div>
      <NavbarCollapse>
        <NavbarLink active={isActive("/")}>
          <Link to="/">Beranda</Link>
        </NavbarLink>
        <NavbarLink active={isActive("/pesan")}>
          <Link to="/pesan">Pemesanan</Link>
        </NavbarLink>
      </NavbarCollapse>
    </Navbar>
  );
}

export default NavbarComponent;

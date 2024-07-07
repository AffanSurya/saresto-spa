import axios from "axios";
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
import { Link, useLocation, useNavigate } from "react-router-dom";
import { API_URL } from "../config";
import { useEffect, useState } from "react";

interface UserProps {
  id: number | null;
  name: string;
  email: string;
  role: string;
}

function NavbarComponent() {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [user, setUser] = useState<UserProps>({
    id: null,
    name: "",
    email: "",
    role: "",
  });

  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  const loadUser = async () => {
    try {
      const response = await axios.get(`${API_URL}/user`);
      setUser(response.data);
    } catch (error: any) {
      console.error(`Gagal memuat data user dari server: ${error.message}`);
    }
  };

  const logoutHandler = async () => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      try {
        await axios.post(`${API_URL}/logout`);
        localStorage.removeItem("token");
        navigate("/");
      } catch (error: any) {
        console.error(`Gagal Logout: ${error.message}`);
      }
    }
  };

  useEffect(() => {
    loadUser();
  });

  console.log(user);

  return (
    <Navbar fluid rounded className="fixed inset-x-0 z-50">
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
        {token ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={<Avatar alt="User settings" img="/avatar.jpeg" rounded />}
          >
            <DropdownHeader>
              <span
                className={`block text-sm ${user.role === "admin" && "text-red-500"}`}
              >
                {user.role === "admin"
                  ? user.name.split(" ").slice(0, -1).join(" ")
                  : user.name}
              </span>
              <span className="block truncate text-sm font-medium">
                {user.email}
              </span>
            </DropdownHeader>
            {user.role === "admin" && (
              <Link to="/dashboard">
                <DropdownItem>Dashboard</DropdownItem>
              </Link>
            )}
            <DropdownDivider />
            <DropdownItem onClick={logoutHandler}>Keluar</DropdownItem>
          </Dropdown>
        ) : (
          <Link to="/masuk" className="px-4 py-2 text-blue-600 ">
            Masuk
          </Link>
        )}
        <NavbarToggle />
      </div>
      <NavbarCollapse>
        <NavbarLink active={isActive("/")}>
          <Link to="/">Beranda</Link>
        </NavbarLink>
        <NavbarLink active={isActive("/pemesanan")}>
          <Link to="/pemesanan">Pemesanan</Link>
        </NavbarLink>
        {/* <Navbar.Link href="#" disabled>
          Services
        </Navbar.Link>
        <Navbar.Link href="#" disabled>
          Pricing
        </Navbar.Link>
        <Navbar.Link href="#" disabled>
          Contact
        </Navbar.Link> */}
      </NavbarCollapse>
    </Navbar>
  );
}

export default NavbarComponent;

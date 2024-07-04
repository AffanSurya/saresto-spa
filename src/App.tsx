import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Home from "./pages/Home";
import NavbarComponent from "./components/Navbar";
import FooterComponent from "./components/Footer";
import Order from "./pages/Order";
import Dashboard from "./pages/Dashboard";
import { SideBarComponent } from "./components/SideBar";
import MenuItems from "./pages/MenuItems/MenuItems";
import CreateMenuItem from "./pages/MenuItems/CreateMenuItem";
import EditMenuItem from "./pages/MenuItems/EditMenuItem";
import Orders from "./pages/Orders/Orders";
import Register from "./pages/Register";

interface PageLayoutProps {
  children: React.ReactNode;
}

function PageLayout({ children }: PageLayoutProps) {
  const location = useLocation();
  const noNavbarFooterPaths = ["/masuk", "/daftar"];
  const noFooterPaths = ["/dashboard"];
  const showSidebar = location.pathname.includes("/dashboard");
  const showNavbar = !noNavbarFooterPaths.includes(location.pathname);
  const showFooter =
    !noNavbarFooterPaths.includes(location.pathname) &&
    !noFooterPaths.some((path) => location.pathname.startsWith(path));

  return (
    <div>
      {showNavbar && <NavbarComponent />}
      {showSidebar && <SideBarComponent />}
      {children}
      {showFooter && <FooterComponent />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <PageLayout>
        <div className="mx-auto flex min-w-0 max-w-4xl flex-col px-4 pb-12 pt-20 lg:px-8 lg:pb-16 xl:pb-24">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/daftar" element={<Register />} />

            <Route path="/pemesanan" element={<Order />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/menu-item" element={<MenuItems />} />
            <Route path="/dashboard/orders" element={<Orders />} />
            <Route
              path="/dashboard/menu-item/create"
              element={<CreateMenuItem />}
            />
            <Route
              path="/dashboard/menu-item/edit/:id"
              element={<EditMenuItem />}
            />
          </Routes>
        </div>
      </PageLayout>
    </Router>
  );
}

export default App;

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

interface PageLayoutProps {
  children: React.ReactNode;
}

function PageLayout({ children }: PageLayoutProps) {
  const location = useLocation();
  const noNavbarFooterPaths = ["/login", "/register"];
  const showSidebar = location.pathname.includes("/dashboard");
  const showNavbarFooter = !noNavbarFooterPaths.includes(location.pathname);

  return (
    <div>
      {showNavbarFooter && <NavbarComponent />}
      {/* <div className="flex"> */}
      {showSidebar && <SideBarComponent />}
      {/* <div className="grow">{children}</div> */}
      {children}
      {/* </div> */}
      {showNavbarFooter && <FooterComponent />}
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
            <Route path="/pesan" element={<Order />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/menu-item" element={<MenuItems />} />
            <Route
              path="/dashboard/menu-item/create"
              element={<CreateMenuItem />}
            />
          </Routes>
        </div>
      </PageLayout>
    </Router>
  );
}

export default App;

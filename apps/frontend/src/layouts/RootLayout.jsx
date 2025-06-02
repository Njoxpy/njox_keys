import { Outlet, Link, useNavigate } from "react-router-dom";
import { Home, Package, Clock, LogIn, LogOut } from "lucide-react";
import useAuthStore from "../store/useAuthStore";
import useAuthHydrate from "../hooks/useAuthHydrate";
import Logo from "../assets/logo/logo.png";

const RootLayout = () => {
  useAuthHydrate();

  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="bg-slate-800 text-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center">
          <Link to={"/"}>
            <img
              src={Logo}
              alt="KMS Logo"
              className="h-8 sm:h-10 md:h-12 lg:h-16 w-auto"
            />
          </Link>

          <nav className="flex flex-wrap gap-4 items-center">
            <Link
              to="/venues"
              className="flex items-center text-slate-200 hover:text-white"
            >
              <Package className="h-4 w-4 mr-1" />
              <span>Venues</span>
            </Link>

            <Link
              to="/orders"
              className="flex items-center text-slate-200 hover:text-white"
            >
              <Package className="h-4 w-4 mr-1" />
              <span>Orders</span>
            </Link>

            <Link
              to="/pending"
              className="flex items-center text-slate-200 hover:text-white"
            >
              <Clock className="h-4 w-4 mr-1" />
              <span>Pending</span>
            </Link>

            {user ? (
              <button
                onClick={handleLogout}
                className="flex items-center bg-red-600 text-white hover:bg-red-700 px-4 py-2 rounded transition-colors"
              >
                <LogOut className="h-4 w-4 mr-1" />
                <span>Logout</span>
              </button>
            ) : (
              <Link
                to="/login"
                className="flex items-center bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded transition-colors"
              >
                <LogIn className="h-4 w-4 mr-1" />
                <span>Login</span>
              </Link>
            )}
          </nav>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;

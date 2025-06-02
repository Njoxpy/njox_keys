import { useState } from "react";
import {
  Home,
  MapPin,
  Calendar,
  Users,
  BookOpen,
  Settings,
  Menu,
  Bell,
  Search,
  ChevronLeft,
  ChevronRight,
  Book,
  Signal,
  Package,
  Clock,
  LogIn,
  LogOut,
} from "lucide-react"; // All lucide-react icons
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom"; // React Router hooks and components
import { User } from "react-feather"; // User icon from react-feather
import useAuthStore from "../../store/useAuthStore";
import useAuthHydrate from "../../hooks/useAuthHydrate";

// Main App Component
export default function AdminDashboardApp() {
  useAuthHydrate(); // Hydrates auth state from local storage

  const { user, logout } = useAuthStore(); // Get user and logout from auth store
  const navigate = useNavigate(); // Navigation hook

  const handleLogout = () => {
    logout(); // Call logout function
    navigate("/login"); // Redirect to login page
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Layout handleLogout={handleLogout} user={user} />{" "}
      {/* Pass handleLogout and user to Layout */}
    </div>
  );
}

// Layout Component (Sidebar + Navbar + Outlet)
function Layout({ handleLogout, user }) {
  // Receive handleLogout and user as props
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const closeMobileMenu = () => {
    if (window.innerWidth < 768) {
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        onNavClick={closeMobileMenu}
        className="hidden md:flex"
      />

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-slate-800 bg-opacity-50 z-20 md:hidden">
          <div className="relative w-64 h-full">
            <Sidebar
              isOpen={true}
              onNavClick={closeMobileMenu}
              className="fixed top-0 left-0 h-full"
            />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Navbar */}
        <Navbar
          pageTitle="Dashboard"
          toggleSidebar={toggleSidebar}
          toggleMobileMenu={toggleMobileMenu}
          handleLogout={handleLogout} // Pass handleLogout to Navbar
          user={user} // Pass user to Navbar
        />

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

// Sidebar Component
const Sidebar = ({ isOpen, toggleSidebar, onNavClick, className }) => {
  const location = useLocation();
  const navItems = [
    { name: "Dashboard", path: "/admin/dashboard", icon: Home },
    { name: "Venues", path: "/admin/venues", icon: MapPin },
    { name: "Bookings", path: "/admin/bookings", icon: Calendar },
    { name: "Users", path: "/admin/users", icon: Users },
    { name: "Students", path: "/admin/students", icon: BookOpen },
    { name: "Reports", path: "/admin/reports", icon: Book },
    { name: "Notifications", path: "/admin/notifications", icon: Signal },
    { name: "Settings", path: "/admin/settings", icon: Settings },
    { name: "Profile", path: "/admin/profile", icon: User },
  ];

  return (
    <aside
      className={`${className} flex-col bg-slate-800 text-white transition-all duration-300 z-30 ${
        isOpen ? "w-64" : "w-20"
      }`}
    >
      {/* Logo */}
      <div className="flex items-center justify-between p-4 h-16 border-b border-slate-700">
        {isOpen && <h1 className="text-xl font-bold">Admin Portal</h1>}
        {toggleSidebar && (
          <button
            onClick={toggleSidebar}
            className="p-1 rounded-full hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <li key={item.name}>
                <Link
                  to={item.path}
                  onClick={onNavClick}
                  className={`
                    flex items-center w-full px-4 py-3
                    transition-colors duration-150
                    hover:bg-slate-700
                    focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500
                    ${isOpen ? "" : "justify-center"}
                    ${
                      isActive
                        ? "bg-slate-700 text-blue-400"
                        : "text-slate-300 hover:text-white"
                    }
                  `}
                >
                  <Icon
                    size={20}
                    className={`
                      ${isOpen ? "mr-3" : ""} 
                      ${isActive ? "text-blue-400" : ""}
                    `}
                  />
                  {isOpen && <span>{item.name}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User Section */}
      {isOpen && (
        <div className="p-4 border-t border-slate-700">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center mr-3">
              <span className="font-medium">ADM</span>
            </div>
            <div>
              {/* Display user email from props or a default */}
              <p className="font-medium">
                {localStorage.getItem("userEmail") || "Administrator"}
              </p>
              <p className="text-sm text-slate-400">Administrator</p>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};

// Navbar Component
const Navbar = ({
  pageTitle,
  toggleSidebar,
  toggleMobileMenu,
  handleLogout,
  user,
}) => {
  return (
    <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-4 md:px-6">
      <div className="flex items-center">
        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="mr-4 p-2 rounded-lg hover:bg-slate-100 active:bg-slate-200 md:hidden focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors"
        >
          <Menu size={24} />
        </button>

        {/* Desktop Toggle Button */}
        <button
          onClick={toggleSidebar}
          className="mr-4 p-2 rounded-lg hover:bg-slate-100 active:bg-slate-200 hidden md:block focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors"
        >
          <Menu size={24} />
        </button>

        <h1 className="text-xl font-semibold text-slate-800">{pageTitle}</h1>
      </div>

      {/* Search Bar */}
      <div className="hidden md:flex items-center max-w-xs w-full relative mx-4">
        <Search size={18} className="absolute left-3 text-slate-400" />
        <input
          type="text"
          placeholder="Search..."
          className="w-full pl-10 pr-4 py-2 border rounded-lg text-slate-800 placeholder-slate-400
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
            hover:border-slate-300 transition-colors"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex items-center">
        {/* Notifications */}
        <button
          className="p-2 rounded-lg hover:bg-slate-100 active:bg-slate-200 relative mr-2 
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors"
        >
          <Bell size={20} className="text-slate-600" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-blue-600 rounded-full"></span>
        </button>

        {/* Conditional rendering for Login/Logout based on user prop */}
        {user ? (
          <button
            onClick={handleLogout}
            className="flex items-center bg-red-600 text-white hover:bg-red-700 px-4 py-2 rounded transition-colors m-2"
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

        {/* User Avatar */}
        <button
          className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white
            hover:bg-blue-700 active:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 
            focus:ring-opacity-50 transition-colors"
        >
          <span className="font-medium text-sm">
            {user ? user.email.substring(0, 3).toUpperCase() : "USR"}
          </span>{" "}
          {/* Display initials or USR */}
        </button>
      </div>
    </header>
  );
};

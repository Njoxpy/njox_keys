import React from "react";
import { Outlet, Link } from "react-router-dom";
import { Home, Package, Clock, LogIn } from "lucide-react";

const RootLayout = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="bg-slate-800 text-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center">
          Logo
          {/* Navigation */}
          <nav className="flex flex-wrap gap-4 items-center">
            <Link
              to="/venues"
              className="flex items-center text-slate-200 hover:text-white transition-colors"
            >
              <Package className="h-4 w-4 mr-1" />
              <span>Venues</span>
            </Link>

            <Link
              to="/orders"
              className="flex items-center text-slate-200 hover:text-white transition-colors"
            >
              <Package className="h-4 w-4 mr-1" />
              <span>Orders</span>
            </Link>

            <Link
              to="/pending"
              className="flex items-center text-slate-200 hover:text-white transition-colors"
            >
              <Clock className="h-4 w-4 mr-1" />
              <span>Pending</span>
            </Link>

            <Link
              to="/login"
              className="flex items-center bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded transition-colors"
            >
              <LogIn className="h-4 w-4 mr-1" />
              <span>Login</span>
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-8">
        <Outlet />
      </main>

      {/* Footer */}
    </div>
  );
};

export default RootLayout;

import React from "react";
import { Link } from "react-router-dom";
import { HelpCircle, LifeBuoy, Copyright, Heart } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-800 text-white w-full sticky bottom-0 z-10 shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Company info and copyright */}
          <div className="flex items-center mb-4 md:mb-0">
            <Copyright className="h-4 w-4 mr-1" />
            <span>{currentYear} Your Company. All rights reserved.</span>
          </div>

          {/* Navigation links */}
          <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0">
            <Link
              to="/faq"
              className="flex items-center text-white hover:text-blue-400 transition-colors duration-200 px-4 py-2"
            >
              <HelpCircle className="h-5 w-5 mr-2" />
              <span>FAQ</span>
            </Link>

            <Link
              to="/support"
              className="flex items-center text-white hover:text-blue-400 transition-colors duration-200 px-4 py-2"
            >
              <LifeBuoy className="h-5 w-5 mr-2" />
              <span>Support</span>
            </Link>

            <div className="flex items-center text-white px-4 py-2">
              <span className="flex items-center">
                Made with <Heart className="h-4 w-4 mx-1 text-red-500" /> by
                Your Team
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

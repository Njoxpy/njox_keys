// Footer.tsx
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6 mt-10 mr-0 ml-0">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-gray-400">
          &copy; {new Date().getFullYear()} Njox Inc. All rights reserved.
        </p>
        <div className="flex gap-6 text-sm">
          <a
            href="/faq"
            className="hover:text-white transition-colors duration-200"
          >
            FAQ
          </a>
          <a
            href="/support"
            className="hover:text-white transition-colors duration-200"
          >
            Support
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

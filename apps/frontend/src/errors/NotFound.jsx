import React from "react";
import { AlertCircle, Home, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-4 py-12">
      <div className="max-w-md w-full text-center">
        {/* 404 Icon/Illustration */}
        <div className="mb-6 flex justify-center">
          <div className="relative">
            <AlertCircle className="h-32 w-32 text-blue-600" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold text-white">404</span>
            </div>
          </div>
        </div>

        {/* Headline */}
        <h1 className="text-4xl font-bold text-slate-800 mb-4">
          Page Not Found
        </h1>

        {/* Subheading */}
        <p className="text-xl text-slate-600 mb-8">
          Sorry, the page you are looking for doesn't exist
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => window.history.back()}
            className="flex items-center justify-center px-6 py-3 border border-slate-300 rounded-md text-slate-700 bg-white hover:bg-slate-100 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Go Back
          </button>

          <Link
            to="/"
            className="flex items-center justify-center px-6 py-3 bg-blue-600 text-white hover:bg-blue-700 rounded-md transition-colors"
          >
            <Home className="h-5 w-5 mr-2" />
            Go Back to Home
          </Link>
        </div>

        {/* Additional Help */}
        <div className="mt-12 text-slate-600">
          <p>If you think this is an error, please contact support</p>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;

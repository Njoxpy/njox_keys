import React from 'react';
import { Mail } from "react-feather";

const ProfilePage = () => {
  const userEmail = localStorage.getItem('userEmail');

  return (
    <div className="flex flex-col min-h-screen bg-slate-800 text-white">
      {/* Header */}
      <header className="bg-slate-800 text-white p-4 text-center shadow-md">
        <h1 className="text-2xl font-bold">Profile Page</h1>
      </header>

      {/* Main Content */}
      <main className="flex-grow p-4 md:p-8 flex justify-center">
        <div className="w-full max-w-md">
          <div className="bg-slate-50 shadow-md rounded-2xl p-6 mb-6 text-slate-800">
            <div className="space-y-4">
              <div className="text-center mb-6">
                <div className="w-24 h-24 bg-slate-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Mail className="h-12 w-12 text-slate-600" />
                </div>
              </div>
              
              <div className="border-t border-slate-200 pt-4">
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-600">Email</label>
                    <p className="mt-1">{userEmail || 'No email found'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
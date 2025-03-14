import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardLayout from "./admin/layout/DashboardLayout";

import AdminDashboardOverview from "./admin/components/DashboardOverview";
import DashboardOverview from "./admin/components/DashboardOverview";
import VenuesManagement from "./admin/components/VenueManagement";
import UsersManagement from "./admin/components/users/UserManagement";
import StudentsManagement from "./admin/components/students/StudentManagement";
import Settings from "./admin/components/settings/Settings";
import Bookings from "./admin/components/bookings/Booking";
import Reports from "./admin/components/reports/Report";
import Notification from "./admin/components/notifications/Notifications";
import Profile from "./profile/Profile";

// layout
import RootLayout from "./layouts/RootLayout";

// auth
import Login from "./auth/Login";

// errors
import NotFound from "./errors/NotFound";

import Venues from "./features/venues/Venues";
import ProfilePage from "./admin/components/profile/Profile";

function App() {
  return (
    <Router>
      <Routes>
        <Route>
          <Route>
            <Route index element={<RootLayout />} />
            <Route path="login" element={<Login />} />
            <Route path="venues" element={<Venues />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Route>
        {/* Dashboard Layout */}
        <Route path="/admin" element={<DashboardLayout />}>
          <Route index element={<AdminDashboardOverview />} />
          <Route path="dashboard" element={<DashboardOverview />} />
          <Route path="venues" element={<VenuesManagement />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="notifications" element={<Notification />} />
          <Route path="users" element={<UsersManagement />} />
          <Route path="bookings" element={<Bookings />} />
          <Route path="reports" element={<Reports />} />
          <Route path="students" element={<StudentsManagement />} />
          <Route path="settings" element={<Settings />} />

          <Route path="*" element={<h>Not found!</h>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

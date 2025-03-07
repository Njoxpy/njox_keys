import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardLayout from "./admin/layout/DashboardLayout";

import AdminDashboardOverview from "./admin/components/DashboardOverview";
import DashboardOverview from "./admin/components/DashboardOverview";
import VenuesManagement from "./admin/components/VenueManagement";
import UsersManagement from "./admin/components/users/UserManagement";
import StudentsManagement from "./admin/components/students/StudentManagement";
import Settings from "./admin/components/settings/Settings";
import Bookings from "./admin/components/bookings/Booking";

function App() {
  return (
    <Router>
      <Routes>
        {/* Dashboard Layout */}
        <Route path="/admin" element={<DashboardLayout />}>
          <Route index element={<AdminDashboardOverview />} />
          <Route path="dashboard" element={<DashboardOverview />} />
          <Route path="venues" element={<VenuesManagement />} />
          <Route path="users" element={<UsersManagement />} />
          <Route path="bookings" element={<Bookings />} />
          <Route path="students" element={<StudentsManagement />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

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

function App() {
  return (
    <Router>
      <Routes>
        <Route>
          <Route
            index
            element={
              <h1>
                Home <a href="/admin">admin</a>
              </h1>
            }
          />
        </Route>
        {/* Dashboard Layout */}
        <Route path="/admin" element={<DashboardLayout />}>
          <Route index element={<AdminDashboardOverview />} />
          <Route path="dashboard" element={<DashboardOverview />} />
          <Route path="venues" element={<VenuesManagement />} />
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

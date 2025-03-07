import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardLayout from "./admin/layout/DashboardLayout";

import AdminDashboardOverview from "./admin/components/DashboardOverview";
import DashboardOverview from "./admin/components/DashboardOverview";
import VenuesManagement from "./admin/components/VenueManagement";

function App() {
  return (
    <Router>
      <Routes>
        {/* Dashboard Layout */}
        <Route path="/admin" element={<DashboardLayout />}>
          <Route index element={<AdminDashboardOverview />} />
          <Route path="dashboard" element={<DashboardOverview />} />
          <Route path="venues" element={<VenuesManagement />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

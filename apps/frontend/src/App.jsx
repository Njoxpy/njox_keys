import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Layouts
import RootLayout from "./layouts/RootLayout";
import DashboardLayout from "./admin/layout/DashboardLayout";

// Pages - Public
import Homepage from "./components/Homepage";
import Login from "./auth/Login";
import VenueListPage from "./features/pages/VenueListPage";
import VenueDetailsPage from "./features/venues/VenueDetails";
import OrdersPage from "./features/orders/OrdersPage";
import OrderDetails from "./features/orders/OrderDetailsPage";
import NotFound from "./errors/NotFound";

// Pages - Admin
import DashboardOverview from "./admin/components/DashboardOverview";
import VenuesManagement from "./admin/components/VenueManagement";
import UsersManagement from "./admin/components/users/UserManagement";
import StudentsManagement from "./admin/components/students/StudentManagement";
import Settings from "./admin/components/settings/Settings";
import Bookings from "./admin/components/bookings/Booking";
import Reports from "./admin/components/reports/Report";
import Notification from "./admin/components/notifications/Notifications";
import ProfilePage from "./admin/components/profile/Profile";

function App() {
  return (
    <div className="scroll-smooth">
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<RootLayout />}>
            <Route index element={<Homepage />} />
            <Route path="login" element={<Login />} />

            <Route path="venues">
              <Route index element={<VenueListPage />} />
              <Route path=":id" element={<VenueDetailsPage />} />
            </Route>

            <Route path="orders">
              <Route index element={<OrdersPage />} />
              <Route path=":id" element={<OrderDetails />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Route>

          {/* Admin Dashboard Routes */}
          <Route path="/admin" element={<DashboardLayout />}>
            <Route index element={<DashboardOverview />} />
            <Route path="dashboard" element={<DashboardOverview />} />
            <Route path="venues" element={<VenuesManagement />} />
            <Route path="users" element={<UsersManagement />} />
            <Route path="students" element={<StudentsManagement />} />
            <Route path="settings" element={<Settings />} />
            <Route path="bookings" element={<Bookings />} />
            <Route path="reports" element={<Reports />} />
            <Route path="notifications" element={<Notification />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

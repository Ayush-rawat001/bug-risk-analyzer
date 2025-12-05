import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import ManagerDashboard from './pages/ManagerDashboard';
import TesterDashboard from './pages/TesterDashboard';
import DeveloperDashboard from './pages/DeveloperDashboard';
import CreateProject from './pages/CreateProject';
import ViewProjects from './pages/ViewProjects';
import TesterProjects from './pages/TesterProjects';
import ReportBug from './pages/ReportBug';
import DeveloperBugs from './pages/DeveloperBugs';
import Profile from './pages/Profile';
import { getUser } from './utils/auth';
import './App.css';

function PrivateRoute({ children, allowedRoles }) {
  const user = getUser();
  if (!user) {
    return <Navigate to="/login" />;
  }
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to={`/${user.role}/dashboard`} />;
  }
  return children;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        <Route
          path="/manager/dashboard"
          element={
            <PrivateRoute allowedRoles={['manager']}>
              <ManagerDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/manager/create-project"
          element={
            <PrivateRoute allowedRoles={['manager']}>
              <CreateProject />
            </PrivateRoute>
          }
        />
        <Route
          path="/manager/projects"
          element={
            <PrivateRoute allowedRoles={['manager']}>
              <ViewProjects />
            </PrivateRoute>
          }
        />
        <Route
          path="/manager/profile"
          element={
            <PrivateRoute allowedRoles={['manager']}>
              <Profile />
            </PrivateRoute>
          }
        />
        
        <Route
          path="/tester/dashboard"
          element={
            <PrivateRoute allowedRoles={['tester']}>
              <TesterDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/tester/projects"
          element={
            <PrivateRoute allowedRoles={['tester']}>
              <TesterProjects />
            </PrivateRoute>
          }
        />
        <Route
          path="/tester/report-bug"
          element={
            <PrivateRoute allowedRoles={['tester']}>
              <ReportBug />
            </PrivateRoute>
          }
        />
        <Route
          path="/tester/profile"
          element={
            <PrivateRoute allowedRoles={['tester']}>
              <Profile />
            </PrivateRoute>
          }
        />
        
        <Route
          path="/developer/dashboard"
          element={
            <PrivateRoute allowedRoles={['developer']}>
              <DeveloperDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/developer/bugs"
          element={
            <PrivateRoute allowedRoles={['developer']}>
              <DeveloperBugs />
            </PrivateRoute>
          }
        />
        <Route
          path="/developer/profile"
          element={
            <PrivateRoute allowedRoles={['developer']}>
              <Profile />
            </PrivateRoute>
          }
        />
        
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;

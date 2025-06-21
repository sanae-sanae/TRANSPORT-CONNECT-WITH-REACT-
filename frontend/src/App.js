
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { MapProvider } from './contexts/MapContext';
import { AnimationProvider } from './contexts/AnimationContext';
import { SocketProvider } from './contexts/SocketContext';
import locationPinAnimation from '../assets/animations/location-pin.json';
import bellAnimation from './assets/animations/bell-animation.json';
import Loader from './components/ui/Loader';
import ToastNotification from './components/notifications/ToastNotification';
import ParticleBackground from './components/animations/ParticleBackground';
const HomePage = lazy(() => import('./pages/HomePage'));
const LoginPage = lazy(() => import('./pages/Auth/LoginPage'));
const RegisterPage = lazy(() => import('./pages/Auth/RegisterPage'));
const OAuthRedirect = lazy(() => import('./pages/Auth/OAuthRedirect'));
const DriverDashboard = lazy(() => import('./pages/Dashboard/DriverDashboard'));
const ShipperDashboard = lazy(() => import('./pages/Dashboard/ShipperDashboard'));
const AdminDashboard = lazy(() => import('./pages/Dashboard/AdminDashboard'));
const BrowsePage = lazy(() => import('./pages/Announcements/BrowsePage'));
const DetailPage = lazy(() => import('./pages/Announcements/DetailPage'));
const LiveTracking = lazy(() => import('./pages/Map/LiveTracking'));
const RoutePlanner = lazy(() => import('./pages/Map/RoutePlanner'));
const InboxPage = lazy(() => import('./pages/Chat/InboxPage'));
const ConversationPage = lazy(() => import('./pages/Chat/ConversationPage'));
const UserProfile = lazy(() => import('./pages/Profile/UserProfile'));
const EditProfile = lazy(() => import('./pages/Profile/EditProfile'));

const ProtectedRoute = ({ roles, children }) => {
  const { currentUser, loading } = useAuth();

  if (loading) return <Loader fullScreen />;
  
  if (!currentUser) return <Navigate to="/login" replace />;
  
  if (roles && !roles.includes(currentUser.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

const RoleRoute = () => {
  const { currentUser } = useAuth();
  
  if (!currentUser) return <Navigate to="/login" replace />;
  
  switch(currentUser.role) {
    case 'driver': return <Navigate to="/dashboard/driver" replace />;
    case 'shipper': return <Navigate to="/dashboard/shipper" replace />;
    case 'admin': return <Navigate to="/dashboard/admin" replace />;
    default: return <Navigate to="/" replace />;
  }
};

const AppRoutes = () => (
  <Routes>
    {/* Public Routes */}
    <Route path="/" element={<HomePage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/register" element={<RegisterPage />} />
    <Route path="/oauth-redirect" element={<OAuthRedirect />} />
    
    {/* Role-based redirect */}
    <Route path="/dashboard" element={<RoleRoute />} />
    
    {/* Protected Routes */}
    <Route path="/dashboard/driver" element={
      <ProtectedRoute roles={['driver', 'admin']}>
        <DriverDashboard />
      </ProtectedRoute>
    }/>
    
    <Route path="/dashboard/shipper" element={
      <ProtectedRoute roles={['shipper', 'admin']}>
        <ShipperDashboard />
      </ProtectedRoute>
    }/>
    
    <Route path="/dashboard/admin" element={
      <ProtectedRoute roles={['admin']}>
        <AdminDashboard />
      </ProtectedRoute>
    }/>
    
    <Route path="/announcements" element={
      <ProtectedRoute>
        <BrowsePage />
      </ProtectedRoute>
    }/>
    
    <Route path="/announcements/:id" element={
      <ProtectedRoute>
        <DetailPage />
      </ProtectedRoute>
    }/>
    
    <Route path="/tracking/:id" element={
      <ProtectedRoute>
        <LiveTracking />
      </ProtectedRoute>
    }/>
    
    <Route path="/plan-route" element={
      <ProtectedRoute>
        <RoutePlanner />
      </ProtectedRoute>
    }/>
    
    <Route path="/chat" element={
      <ProtectedRoute>
        <InboxPage />
      </ProtectedRoute>
    }/>
    
    <Route path="/chat/:conversationId" element={
      <ProtectedRoute>
        <ConversationPage />
      </ProtectedRoute>
    }/>
    
    <Route path="/profile" element={
      <ProtectedRoute>
        <UserProfile />
      </ProtectedRoute>
    }/>
    
    <Route path="/profile/edit" element={
      <ProtectedRoute>
        <EditProfile />
      </ProtectedRoute>
    }/>
    
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <SocketProvider>
          <MapProvider>
            <AnimationProvider>
              <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 relative">
                <ParticleBackground />
                <Suspense fallback={<Loader fullScreen />}>
                  <AppRoutes />
                </Suspense>
                <ToastNotification />
              </div>
            </AnimationProvider>
          </MapProvider>
        </SocketProvider>
      </AuthProvider>
    </Router>
  );
}
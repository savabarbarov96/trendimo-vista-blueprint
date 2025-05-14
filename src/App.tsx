
import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes, useRouteError } from 'react-router-dom';
import { AuthProvider } from './hooks/use-auth';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import ErrorBoundary from './components/ErrorBoundary';
import RouteErrorBoundary from './components/RouteErrorBoundary';
import { LoadingFallback } from './components/ui/loading-fallback';

// Import pages
import Index from './pages/Index';
import Auth from './pages/Auth';
import AboutPage from './pages/AboutPage';
import PropertiesPage from './pages/PropertiesPage';
import PropertyDetail from './pages/PropertyDetail';
import SellPage from './pages/SellPage';
import CareersPage from './pages/CareersPage';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import ServicesPage from './pages/ServicesPage';
import BlogIndexPage from './pages/blog/index';
import BlogPostPage from './pages/blog/[slug]';
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';
import CookiesPage from './pages/CookiesPage';
import MakeAdmin from './pages/admin/make-admin';

// Admin pages
import AdminLayout from './components/admin/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import Users from './pages/admin/Users';
import Properties from './pages/admin/Properties';
import Inquiries from './pages/admin/Inquiries';
import SellRequests from './pages/admin/SellRequests';
import BlogAdmin from './pages/admin/BlogAdmin';
import CareersAdmin from './pages/admin/CareersAdmin';
import ServicesAdmin from './pages/admin/ServicesAdmin';
import Settings from './pages/admin/Settings';

// Wrap route in error boundary
const RouteWithErrorBoundary = ({ element }: { element: React.ReactNode }) => {
  return (
    <ErrorBoundary fallback={<RouteErrorBoundary />}>
      <Suspense fallback={<LoadingFallback />}>
        {element}
      </Suspense>
    </ErrorBoundary>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<RouteWithErrorBoundary element={<Index />} />} />
          <Route path="/auth" element={<RouteWithErrorBoundary element={<Auth />} />} />
          <Route path="/about" element={<RouteWithErrorBoundary element={<AboutPage />} />} />
          <Route path="/properties" element={<RouteWithErrorBoundary element={<PropertiesPage />} />} />
          <Route path="/properties/:id" element={<RouteWithErrorBoundary element={<PropertyDetail />} />} />
          <Route path="/sell" element={<RouteWithErrorBoundary element={<SellPage />} />} />
          <Route path="/careers" element={<RouteWithErrorBoundary element={<CareersPage />} />} />
          <Route path="/services" element={<RouteWithErrorBoundary element={<ServicesPage />} />} />
          <Route path="/blog" element={<RouteWithErrorBoundary element={<BlogIndexPage />} />} />
          <Route path="/blog/:slug" element={<RouteWithErrorBoundary element={<BlogPostPage />} />} />
          <Route path="/terms" element={<RouteWithErrorBoundary element={<TermsPage />} />} />
          <Route path="/privacy" element={<RouteWithErrorBoundary element={<PrivacyPage />} />} />
          <Route path="/cookies" element={<RouteWithErrorBoundary element={<CookiesPage />} />} />
          <Route path="/make-admin" element={<RouteWithErrorBoundary element={<MakeAdmin />} />} />
          <Route path="/profile" element={
            <RouteWithErrorBoundary element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            } />
          } />
          
          {/* Admin routes */}
          <Route path="/admin" element={
            <RouteWithErrorBoundary element={
              <AdminRoute>
                <AdminLayout />
              </AdminRoute>
            } />
          }>
            <Route index element={<Dashboard />} />
            <Route path="users" element={<Users />} />
            <Route path="properties" element={<Properties />} />
            <Route path="inquiries" element={<Inquiries />} />
            <Route path="sell-requests" element={<SellRequests />} />
            <Route path="blog" element={<BlogAdmin />} />
            <Route path="careers" element={<CareersAdmin />} />
            <Route path="services" element={<ServicesAdmin />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          
          <Route path="*" element={<RouteWithErrorBoundary element={<NotFound />} />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;

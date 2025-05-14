
import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './hooks/use-auth';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import ErrorBoundary from './components/ErrorBoundary';
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

function App() {
  return (
    <Router>
      <ErrorBoundary>
        <AuthProvider>
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/properties" element={<PropertiesPage />} />
              <Route path="/properties/:id" element={<PropertyDetail />} />
              <Route path="/sell" element={<SellPage />} />
              <Route path="/careers" element={<CareersPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/blog" element={<BlogIndexPage />} />
              <Route path="/blog/:slug" element={<BlogPostPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/cookies" element={<CookiesPage />} />
              <Route path="/make-admin" element={<MakeAdmin />} />
              <Route path="/profile" element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              } />
              
              {/* Admin routes */}
              <Route path="/admin" element={
                <AdminRoute>
                  <AdminLayout />
                </AdminRoute>
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
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </AuthProvider>
      </ErrorBoundary>
    </Router>
  );
}

export default App;

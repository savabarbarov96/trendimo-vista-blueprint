import React, { Suspense } from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { AuthProvider } from './hooks/use-auth';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import ErrorBoundary from './components/ErrorBoundary';
import RouteErrorBoundary from './components/RouteErrorBoundary';
import { LoadingFallback } from './components/ui/loading-fallback';
import { PropertyModalProvider } from './components/properties/PropertyModalProvider';

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
import ManagementPage from './pages/management';

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

// Root layout with providers
const AppRoot = () => {
  return (
    <AuthProvider>
      <PropertyModalProvider>
        <Outlet />
      </PropertyModalProvider>
    </AuthProvider>
  );
};

// Define routes configuration
const router = createBrowserRouter([
  {
    path: "/",
    element: <AppRoot />,
    errorElement: <RouteErrorBoundary />,
    children: [
      { 
        index: true, 
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <Index />
          </Suspense>
        ) 
      },
      { 
        path: "auth", 
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <Auth />
          </Suspense>
        ) 
      },
      { 
        path: "about", 
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <AboutPage />
          </Suspense>
        ) 
      },
      { 
        path: "properties", 
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <PropertiesPage />
          </Suspense>
        ) 
      },
      { 
        path: "properties/:id", 
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <PropertyDetail />
          </Suspense>
        ) 
      },
      { 
        path: "sell", 
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <SellPage />
          </Suspense>
        ) 
      },
      { 
        path: "careers", 
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <CareersPage />
          </Suspense>
        ) 
      },
      { 
        path: "services", 
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <ServicesPage />
          </Suspense>
        ) 
      },
      { 
        path: "blog", 
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <BlogIndexPage />
          </Suspense>
        ) 
      },
      { 
        path: "blog/:slug", 
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <BlogPostPage />
          </Suspense>
        ) 
      },
      { 
        path: "terms", 
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <TermsPage />
          </Suspense>
        ) 
      },
      { 
        path: "privacy", 
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <PrivacyPage />
          </Suspense>
        ) 
      },
      { 
        path: "cookies", 
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <CookiesPage />
          </Suspense>
        ) 
      },
      { 
        path: "make-admin", 
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <MakeAdmin />
          </Suspense>
        ) 
      },
      
      // Private routes
      {
        path: "profile",
        element: <PrivateRoute><Outlet /></PrivateRoute>,
        children: [
          { 
            index: true, 
            element: (
              <Suspense fallback={<LoadingFallback />}>
                <Profile />
              </Suspense>
            ) 
          }
        ]
      },
      
      // Management routes
      {
        path: "management/*",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <ManagementPage />
          </Suspense>
        )
      },
      
      // Admin routes
      {
        path: "admin",
        element: <AdminRoute><AdminLayout /></AdminRoute>,
        children: [
          { index: true, element: <Dashboard /> },
          { path: "users", element: <Users /> },
          { path: "properties", element: <Properties /> },
          { path: "inquiries", element: <Inquiries /> },
          { path: "sell-requests", element: <SellRequests /> },
          { path: "blog", element: <BlogAdmin /> },
          { path: "careers", element: <CareersAdmin /> },
          { path: "services", element: <ServicesAdmin /> },
          { path: "settings", element: <Settings /> }
        ]
      },
      
      // 404 route
      { 
        path: "*", 
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <NotFound />
          </Suspense>
        ) 
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

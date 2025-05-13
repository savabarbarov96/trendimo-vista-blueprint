
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './hooks/use-auth';
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

function App() {
  return (
    <Router>
      <AuthProvider>
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
          <Route path="/profile" element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          } />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;

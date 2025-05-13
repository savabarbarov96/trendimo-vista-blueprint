
import React from 'react';
import { Helmet } from 'react-helmet';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

const CookiesPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Cookie Policy | Trendimo</title>
      </Helmet>
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Cookie Policy</h1>
        <div className="prose max-w-none">
          <p className="mb-4">
            This page contains information about how cookies are used on the Trendimo platform.
          </p>
          <h2 className="text-2xl font-bold mt-8 mb-4">1. What are Cookies?</h2>
          <p className="mb-4">
            This is a placeholder for the Cookie Policy page. In a real application, this would contain detailed information about the cookies used on the site.
          </p>
          <h2 className="text-2xl font-bold mt-8 mb-4">2. Types of Cookies We Use</h2>
          <p className="mb-4">
            Information about the different types of cookies used on the platform would be listed here.
          </p>
          <h2 className="text-2xl font-bold mt-8 mb-4">3. Managing Cookies</h2>
          <p className="mb-4">
            Details about how users can manage or disable cookies would be provided in this section.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CookiesPage;


import React from 'react';
import { Helmet } from 'react-helmet';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

const TermsPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Terms & Conditions | Trendimo</title>
      </Helmet>
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Terms & Conditions</h1>
        <div className="prose max-w-none">
          <p className="mb-4">
            This page contains the terms and conditions for using the Trendimo platform.
          </p>
          <h2 className="text-2xl font-bold mt-8 mb-4">1. Introduction</h2>
          <p className="mb-4">
            This is a placeholder for the Terms & Conditions page. In a real application, this would contain detailed legal information about the use of the platform.
          </p>
          <h2 className="text-2xl font-bold mt-8 mb-4">2. User Agreements</h2>
          <p className="mb-4">
            By using our services, you agree to these terms and conditions.
          </p>
          <h2 className="text-2xl font-bold mt-8 mb-4">3. Liability</h2>
          <p className="mb-4">
            Information about the company's liability policies would go here.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TermsPage;

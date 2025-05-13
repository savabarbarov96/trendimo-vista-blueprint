
import React from 'react';
import { Helmet } from 'react-helmet';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

const PrivacyPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Privacy Policy | Trendimo</title>
      </Helmet>
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
        <div className="prose max-w-none">
          <p className="mb-4">
            This page contains the privacy policy for the Trendimo platform.
          </p>
          <h2 className="text-2xl font-bold mt-8 mb-4">1. Data Collection</h2>
          <p className="mb-4">
            This is a placeholder for the Privacy Policy page. In a real application, this would contain detailed information about how user data is collected and processed.
          </p>
          <h2 className="text-2xl font-bold mt-8 mb-4">2. Data Usage</h2>
          <p className="mb-4">
            Information about how user data is used would be detailed here.
          </p>
          <h2 className="text-2xl font-bold mt-8 mb-4">3. User Rights</h2>
          <p className="mb-4">
            Details about user rights regarding their personal data would be explained in this section.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPage;

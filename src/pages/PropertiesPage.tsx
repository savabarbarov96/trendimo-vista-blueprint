import React from 'react';
import { PropertiesList } from '@/components/properties/PropertiesList';
import PropertyFilter from '@/components/PropertyFilter';
import PropertySellForm from '@/components/PropertySellForm';
import ImageGallery from '@/components/ImageGallery';
import ImageUploader from '@/components/ImageUploader';
import { FilterState } from '@/components/properties/types';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const PropertiesPage = () => {
  const handleFilterChange = (newFilters: FilterState) => {
    console.log('Filter changed:', newFilters);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-3 font-play bg-clip-text text-transparent bg-gradient-to-r from-red-700 to-primary">
            Нашите Имоти
          </h1>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Разгледайте нашата селекция от висококачествени имоти, отговарящи на всички ваши нужди
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left sidebar with filters */}
          <div className="lg:col-span-1">
            <div className="sticky top-4">
              <div className="bg-gradient-to-r from-red-50 to-white rounded-xl shadow-elegant p-4 border border-red-100">
                <h3 className="text-lg font-semibold mb-4 text-red-800">Филтри</h3>
                <PropertyFilter onFilterChange={handleFilterChange} />
              </div>
              
              {/* Demo section for file upload and gallery */}
              <div className="mt-8 p-4 bg-gradient-to-r from-red-50 to-white rounded-xl shadow-elegant border border-red-100">
                <h3 className="text-lg font-semibold mb-4 text-red-800">Демо на галерия</h3>
                <ImageGallery 
                  bucketName="trendimo" 
                  folderPath="team_photos/" 
                  className="mb-4"
                />
                <div className="mt-4">
                  <ImageUploader 
                    bucketName="trendimo" 
                    folderPath="team_photos/" 
                    onUploadComplete={() => {
                      console.log("Upload complete!");
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right area with property listings */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-elegant p-6 border border-red-100">
              <PropertiesList />
            </div>
          </div>
        </div>

        {/* Wave divider */}
        <div className="wave-divider my-16"></div>

        {/* Sell Your Property Form */}
        <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-2xl p-8 shadow-elegant">
          <PropertySellForm />
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default PropertiesPage;

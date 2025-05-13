
import React from 'react';
import { PropertiesList } from '@/components/properties/PropertiesList';
import PropertyFilter from '@/components/PropertyFilter';
import PropertySellForm from '@/components/PropertySellForm';
import ImageGallery from '@/components/ImageGallery';
import ImageUploader from '@/components/ImageUploader';
import { FilterState } from '@/components/properties/types';

const PropertiesPage = () => {
  const handleFilterChange = (newFilters: FilterState) => {
    console.log('Filter changed:', newFilters);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 font-play">Нашите Имоти</h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left sidebar with filters */}
          <div className="lg:col-span-1">
            <PropertyFilter onFilterChange={handleFilterChange} />
            
            {/* Demo section for file upload and gallery */}
            <div className="mt-8 p-4 bg-white rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4">Демо на галерия</h3>
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

          {/* Right area with property listings */}
          <div className="lg:col-span-3">
            <PropertiesList />
          </div>
        </div>

        {/* Sell Your Property Form */}
        <div className="mt-16">
          <PropertySellForm />
        </div>
      </div>
    </div>
  );
};

export default PropertiesPage;

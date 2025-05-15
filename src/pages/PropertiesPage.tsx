import React, { useState, useEffect } from 'react';
import { PropertiesList } from '@/components/properties/PropertiesList';
import PropertyFilter from '@/components/PropertyFilter';
import PropertySellForm from '@/components/PropertySellForm';
import { FilterState } from '@/components/properties/types';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useLocation, useNavigate } from 'react-router-dom';

const PropertiesPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [filters, setFilters] = useState<FilterState>(() => {
    // Initialize filters directly from URL search params on initial load
    const queryParams = new URLSearchParams(location.search);
    return {
      listingType: queryParams.get('listingType') || '',
      propertyType: queryParams.get('propertyType') || '',
      city: queryParams.get('city') || '',
      minPrice: queryParams.get('minPrice') ? parseInt(queryParams.get('minPrice')!) : null,
      maxPrice: queryParams.get('maxPrice') ? parseInt(queryParams.get('maxPrice')!) : null,
      bedrooms: queryParams.get('bedrooms') ? parseInt(queryParams.get('bedrooms')!) : null,
      bathrooms: queryParams.get('bathrooms') ? parseInt(queryParams.get('bathrooms')!) : null
    };
  });

  // Update filters when location.search changes (e.g., from direct URL navigation or handleFilterChange)
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const newFilters: FilterState = {
      listingType: queryParams.get('listingType') || '',
      propertyType: queryParams.get('propertyType') || '',
      city: queryParams.get('city') || '',
      minPrice: queryParams.get('minPrice') ? parseInt(queryParams.get('minPrice')!) : null,
      maxPrice: queryParams.get('maxPrice') ? parseInt(queryParams.get('maxPrice')!) : null,
      bedrooms: queryParams.get('bedrooms') ? parseInt(queryParams.get('bedrooms')!) : null,
      bathrooms: queryParams.get('bathrooms') ? parseInt(queryParams.get('bathrooms')!) : null
    };
    
    // Only set if they are actually different to avoid potential loops if stringify is slow
    // or if other effects depend on `filters` identity.
    if (JSON.stringify(newFilters) !== JSON.stringify(filters)) {
        setFilters(newFilters);
    }
  }, [location.search, filters]); // Added filters to dependencies to compare for actual change

  const handleFilterChange = (changedFilters: FilterState) => {
    const queryParams = new URLSearchParams();
    if (changedFilters.city) queryParams.append('city', changedFilters.city);
    if (changedFilters.propertyType) queryParams.append('propertyType', changedFilters.propertyType);
    if (changedFilters.listingType) queryParams.append('listingType', changedFilters.listingType);
    if (changedFilters.minPrice) queryParams.append('minPrice', changedFilters.minPrice.toString());
    if (changedFilters.maxPrice) queryParams.append('maxPrice', changedFilters.maxPrice.toString());
    if (changedFilters.bedrooms) queryParams.append('bedrooms', changedFilters.bedrooms.toString());
    if (changedFilters.bathrooms) queryParams.append('bathrooms', changedFilters.bathrooms.toString());
    
    // Navigate, which will trigger the useEffect above due to location.search changing.
    navigate(`/properties?${queryParams.toString()}`, { replace: true });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-3 font-play bg-clip-text text-transparent bg-gradient-to-r from-red-700 to-red-600">
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
                <PropertyFilter onFilterChange={handleFilterChange} initialFilters={filters} />
              </div>
            </div>
          </div>

          {/* Right area with property listings */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-elegant p-6 border border-red-100">
              <PropertiesList initialFilters={filters} />
            </div>
          </div>
        </div>

        {/* Wave divider */}
        <div className="wave-divider my-16"></div>

        {/* Sell Your Property Form */}
        <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-2xl p-8 shadow-elegant">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="flex flex-col justify-center">
              <h2 className="text-3xl font-bold mb-4 text-red-700">Искате да продадете имот?</h2>
              <p className="text-lg mb-6 text-neutral-700">
                Нашите експерти ще ви помогнат да постигнете най-добрата цена за вашия имот. Попълнете формата 
                и ще се свържем с вас за безплатна консултация.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-red-100 p-2 rounded-full mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-red-700">Професионална оценка</h3>
                    <p className="text-neutral-600">Получете реалистична оценка на вашия имот</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-red-100 p-2 rounded-full mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-red-700">Бързи резултати</h3>
                    <p className="text-neutral-600">Продайте бързо с нашата мрежа от купувачи</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-red-100 p-2 rounded-full mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-red-700">Без скрити такси</h3>
                    <p className="text-neutral-600">Прозрачни условия и честни комисионни</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <PropertySellForm />
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default PropertiesPage;

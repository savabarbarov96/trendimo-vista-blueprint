import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Button } from './ui/button';
import { siteContent, cities, propertyTypes } from '../data/content';
import { useAnimationSettings } from '@/lib/animations/motion';

interface SearchParams {
  location: string;
  propertyType: string;
  priceRange: string;
}

const SearchBar = () => {
  const { home } = siteContent;
  const [searchParams, setSearchParams] = useState<SearchParams>({
    location: '',
    propertyType: '',
    priceRange: '',
  });
  const [showAdvanced, setShowAdvanced] = useState(false);
  const { shouldAnimate } = useAnimationSettings() ?? { shouldAnimate: false };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Search with params:', searchParams);
    // In a real app, we would redirect to search results page with these params
  };

  const toggleAdvanced = () => {
    setShowAdvanced(!showAdvanced);
  };

  return (
    <div className="bg-gradient-to-r from-red-900/90 to-red-700/90 backdrop-blur-md border border-red-400/30 rounded-lg shadow-lg p-6 mb-4">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row gap-4">
          <div 
            className={`flex-1 ${shouldAnimate ? 'transition-transform duration-200 active:scale-98' : ''}`}
          >
            <select
              name="location"
              className="w-full bg-white/90 text-red-900 border border-red-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500"
              onChange={handleChange}
              value={searchParams.location}
            >
              <option value="">{home.search.filters.location}</option>
              {cities.map((city, index) => (
                <option key={index} value={city} className="text-red-900">
                  {city}
                </option>
              ))}
            </select>
          </div>
          
          <div 
            className={`flex-1 ${shouldAnimate ? 'transition-transform duration-200 active:scale-98' : ''}`}
          >
            <select
              name="propertyType"
              className="w-full bg-white/90 text-red-900 border border-red-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500"
              onChange={handleChange}
              value={searchParams.propertyType}
            >
              <option value="">{home.search.filters.propertyType}</option>
              {propertyTypes.map((type, index) => (
                <option key={index} value={type} className="text-red-900">
                  {type}
                </option>
              ))}
            </select>
          </div>
          
          <div 
            className={`flex-1 ${shouldAnimate ? 'transition-transform duration-200 active:scale-98' : ''}`}
          >
            <select
              name="priceRange"
              className="w-full bg-white/90 text-red-900 border border-red-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500"
              onChange={handleChange}
              value={searchParams.priceRange}
            >
              <option value="">{home.search.filters.priceRange}</option>
              <option value="0-100000">До 100,000 лв.</option>
              <option value="100000-200000">100,000 лв. - 200,000 лв.</option>
              <option value="200000-300000">200,000 лв. - 300,000 лв.</option>
              <option value="300000-500000">300,000 лв. - 500,000 лв.</option>
              <option value="500000+">Над 500,000 лв.</option>
            </select>
          </div>
          
          <div
            className={`${shouldAnimate ? 'transition-all duration-200 hover:scale-103 active:scale-97' : ''}`}
          >
            <Button type="submit" className="bg-white hover:bg-red-50 text-red-900 border border-red-200 shadow-md hover:shadow-lg">
              <Search className="mr-2 h-4 w-4" />
              {home.search.buttonText}
            </Button>
          </div>
        </div>
        
        <div
          className={`overflow-hidden transition-all duration-300 ${showAdvanced ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div className={`${shouldAnimate ? 'transition-transform duration-200 active:scale-98' : ''}`}>
              <select
                name="bedrooms"
                className="w-full bg-white/90 text-red-900 border border-red-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="">{home.search.filters.bedrooms}</option>
                <option value="1">1+</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
                <option value="4">4+</option>
                <option value="5">5+</option>
              </select>
            </div>
            
            <div className={`${shouldAnimate ? 'transition-transform duration-200 active:scale-98' : ''}`}>
              <select
                name="bathrooms"
                className="w-full bg-white/90 text-red-900 border border-red-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="">{home.search.filters.bathrooms}</option>
                <option value="1">1+</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
                <option value="4">4+</option>
              </select>
            </div>
            
            <div className={`${shouldAnimate ? 'transition-transform duration-200 active:scale-98' : ''}`}>
              <select
                name="area"
                className="w-full bg-white/90 text-red-900 border border-red-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="">{home.search.filters.area}</option>
                <option value="0-50">До 50 кв.м</option>
                <option value="50-80">50 - 80 кв.м</option>
                <option value="80-120">80 - 120 кв.м</option>
                <option value="120-200">120 - 200 кв.м</option>
                <option value="200+">Над 200 кв.м</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="mt-4">
          <button 
            type="button"
            onClick={toggleAdvanced}
            className={`text-white hover:text-red-200 font-medium text-sm flex items-center ${shouldAnimate ? 'transition-transform duration-200 hover:scale-105 active:scale-95' : ''}`}
          >
            {home.search.advancedSearch} 
            <span 
              className={`ml-1 transition-transform duration-300 ${showAdvanced ? 'transform rotate-180' : ''}`}
            >
              ▼
            </span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;

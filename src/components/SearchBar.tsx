
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Button } from './ui/button';
import { siteContent, cities, propertyTypes } from '../data/content';
import { motion } from 'framer-motion';
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
  const { shouldAnimate } = useAnimationSettings();

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

  // Animation variants for the advanced search section
  const advancedVariants = {
    hidden: { 
      height: 0, 
      opacity: 0,
      transition: { 
        height: { duration: 0.3 },
        opacity: { duration: 0.2 }
      }
    },
    visible: { 
      height: 'auto', 
      opacity: 1,
      transition: { 
        height: { duration: 0.3 },
        opacity: { duration: 0.3, delay: 0.1 }
      }
    }
  };

  // Animation for the toggle arrow
  const arrowVariants = {
    up: { rotate: 0 },
    down: { rotate: 180 }
  };

  return (
    <div className="bg-gradient-to-r from-blue-900/90 to-blue-700/90 backdrop-blur-md border border-blue-400/30 rounded-lg shadow-lg p-6 mb-4">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row gap-4">
          <motion.div 
            className="flex-1"
            whileTap={shouldAnimate ? { scale: 0.98 } : {}}
          >
            <select
              name="location"
              className="w-full bg-white/90 text-blue-900 border border-blue-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleChange}
              value={searchParams.location}
            >
              <option value="">{home.search.filters.location}</option>
              {cities.map((city, index) => (
                <option key={index} value={city} className="text-blue-900">
                  {city}
                </option>
              ))}
            </select>
          </motion.div>
          
          <motion.div 
            className="flex-1"
            whileTap={shouldAnimate ? { scale: 0.98 } : {}}
          >
            <select
              name="propertyType"
              className="w-full bg-white/90 text-blue-900 border border-blue-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleChange}
              value={searchParams.propertyType}
            >
              <option value="">{home.search.filters.propertyType}</option>
              {propertyTypes.map((type, index) => (
                <option key={index} value={type} className="text-blue-900">
                  {type}
                </option>
              ))}
            </select>
          </motion.div>
          
          <motion.div 
            className="flex-1"
            whileTap={shouldAnimate ? { scale: 0.98 } : {}}
          >
            <select
              name="priceRange"
              className="w-full bg-white/90 text-blue-900 border border-blue-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          </motion.div>
          
          <motion.div
            whileHover={shouldAnimate ? { scale: 1.03 } : {}}
            whileTap={shouldAnimate ? { scale: 0.97 } : {}}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Button type="submit" className="bg-white hover:bg-blue-50 text-blue-900 border border-blue-200 shadow-md hover:shadow-lg">
              <Search className="mr-2 h-4 w-4" />
              {home.search.buttonText}
            </Button>
          </motion.div>
        </div>
        
        <motion.div
          initial="hidden"
          animate={showAdvanced ? "visible" : "hidden"}
          variants={advancedVariants}
          className="overflow-hidden"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <motion.div whileTap={shouldAnimate ? { scale: 0.98 } : {}}>
              <select
                name="bedrooms"
                className="w-full bg-white/90 text-blue-900 border border-blue-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">{home.search.filters.bedrooms}</option>
                <option value="1">1+</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
                <option value="4">4+</option>
                <option value="5">5+</option>
              </select>
            </motion.div>
            
            <motion.div whileTap={shouldAnimate ? { scale: 0.98 } : {}}>
              <select
                name="bathrooms"
                className="w-full bg-white/90 text-blue-900 border border-blue-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">{home.search.filters.bathrooms}</option>
                <option value="1">1+</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
                <option value="4">4+</option>
              </select>
            </motion.div>
            
            <motion.div whileTap={shouldAnimate ? { scale: 0.98 } : {}}>
              <select
                name="area"
                className="w-full bg-white/90 text-blue-900 border border-blue-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">{home.search.filters.area}</option>
                <option value="0-50">До 50 кв.м</option>
                <option value="50-80">50 - 80 кв.м</option>
                <option value="80-120">80 - 120 кв.м</option>
                <option value="120-200">120 - 200 кв.м</option>
                <option value="200+">Над 200 кв.м</option>
              </select>
            </motion.div>
          </div>
        </motion.div>
        
        <div className="mt-4">
          <motion.button 
            type="button"
            onClick={toggleAdvanced}
            className="text-white hover:text-blue-200 font-medium text-sm flex items-center"
            whileHover={shouldAnimate ? { scale: 1.05 } : {}}
            whileTap={shouldAnimate ? { scale: 0.95 } : {}}
          >
            {home.search.advancedSearch} 
            <motion.span 
              className="ml-1"
              animate={showAdvanced ? "down" : "up"}
              variants={arrowVariants}
              transition={{ duration: 0.3 }}
            >
              ▼
            </motion.span>
          </motion.button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;

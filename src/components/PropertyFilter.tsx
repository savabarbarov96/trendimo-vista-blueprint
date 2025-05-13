
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { cities, propertyTypes } from '@/data/content';
import { FilterState } from '@/components/properties/types';
import { Filter, Search } from 'lucide-react';

const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('bg-BG', { 
    style: 'currency',
    currency: 'BGN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price);
};

interface PropertyFilterProps {
  onFilterChange: (filters: FilterState) => void;
}

const PropertyFilter: React.FC<PropertyFilterProps> = ({ onFilterChange }) => {
  const [filters, setFilters] = useState<FilterState>({
    listingType: '',
    propertyType: '',
    city: '',
    minPrice: null,
    maxPrice: null,
    bedrooms: null,
    bathrooms: null
  });

  const [priceRange, setPriceRange] = useState<number[]>([0, 1000000]);
  const [expanded, setExpanded] = useState<boolean>(false);

  const handleListingTypeChange = (value: string) => {
    const newFilters = { ...filters, listingType: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handlePropertyTypeChange = (value: string) => {
    const newFilters = { ...filters, propertyType: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleCityChange = (value: string) => {
    const newFilters = { ...filters, city: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handlePriceChange = (value: number[]) => {
    setPriceRange(value);
    const newFilters = { ...filters, minPrice: value[0], maxPrice: value[1] };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleBedroomsChange = (value: string) => {
    const bedrooms = value === '' ? null : parseInt(value);
    const newFilters = { ...filters, bedrooms };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleBathroomsChange = (value: string) => {
    const bathrooms = value === '' ? null : parseInt(value);
    const newFilters = { ...filters, bathrooms };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleReset = () => {
    const resetFilters = {
      listingType: '',
      propertyType: '',
      city: '',
      minPrice: null,
      maxPrice: null,
      bedrooms: null,
      bathrooms: null
    };
    setPriceRange([0, 1000000]);
    setFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  const handleApplyFilters = () => {
    onFilterChange(filters);
  };

  return (
    <Card className="sticky top-4 bg-gradient-to-b from-white to-blue-50 border-blue-100">
      <CardHeader className="pb-3 bg-gradient-to-r from-blue-700 to-blue-900 text-white rounded-t-lg">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-play flex items-center text-white">
            <Filter className="mr-2" />
            Филтри
          </CardTitle>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setExpanded(!expanded)}
            className="text-white hover:text-white hover:bg-white/10"
          >
            {expanded ? 'Скрий' : 'Покажи всички'}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-6">
          {/* Listing Type */}
          <div>
            <h3 className="font-medium mb-2 text-blue-800">Тип оферта</h3>
            <ToggleGroup 
              type="single" 
              value={filters.listingType} 
              onValueChange={handleListingTypeChange} 
              className="flex flex-wrap"
            >
              <ToggleGroupItem 
                value="sale" 
                className="flex-1 data-[state=on]:bg-blue-700 data-[state=on]:text-white"
              >
                Продажба
              </ToggleGroupItem>
              <ToggleGroupItem 
                value="rent" 
                className="flex-1 data-[state=on]:bg-blue-700 data-[state=on]:text-white"
              >
                Наем
              </ToggleGroupItem>
            </ToggleGroup>
          </div>

          {/* Property Type */}
          <div>
            <h3 className="font-medium mb-2 text-blue-800">Вид имот</h3>
            <div className="grid grid-cols-2 gap-2">
              {propertyTypes.slice(0, expanded ? undefined : 4).map((type, index) => (
                <Button 
                  key={index}
                  variant={filters.propertyType === type ? "default" : "outline"} 
                  className={`justify-start w-full ${filters.propertyType === type ? 'bg-blue-700 hover:bg-blue-800' : 'border-blue-200'}`}
                  onClick={() => handlePropertyTypeChange(filters.propertyType === type ? '' : type)}
                >
                  {type}
                </Button>
              ))}
            </div>
          </div>

          {/* City */}
          <div>
            <h3 className="font-medium mb-2 text-blue-800">Местоположение</h3>
            <select
              className="w-full border border-blue-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={filters.city}
              onChange={(e) => handleCityChange(e.target.value)}
            >
              <option value="">Всички градове</option>
              {cities.map((city, index) => (
                <option key={index} value={city}>{city}</option>
              ))}
            </select>
          </div>

          {/* Price Range */}
          <div>
            <h3 className="font-medium mb-4 text-blue-800">Цена</h3>
            <Slider
              value={priceRange}
              min={0}
              max={1000000}
              step={10000}
              onValueChange={handlePriceChange}
              className="mb-6"
            />
            <div className="flex justify-between items-center">
              <div className="text-sm">
                От: <span className="font-semibold text-blue-800">{formatPrice(priceRange[0])}</span>
              </div>
              <div className="text-sm">
                До: <span className="font-semibold text-blue-800">{formatPrice(priceRange[1])}</span>
              </div>
            </div>
          </div>

          {expanded && (
            <>
              {/* Bedrooms */}
              <div>
                <h3 className="font-medium mb-2 text-blue-800">Спални</h3>
                <ToggleGroup 
                  type="single" 
                  value={filters.bedrooms ? String(filters.bedrooms) : ''} 
                  onValueChange={handleBedroomsChange}
                  className="flex flex-wrap justify-between"
                >
                  <ToggleGroupItem 
                    value="" 
                    className="flex-1 data-[state=on]:bg-blue-700 data-[state=on]:text-white"
                  >
                    Всички
                  </ToggleGroupItem>
                  <ToggleGroupItem 
                    value="1" 
                    className="flex-1 data-[state=on]:bg-blue-700 data-[state=on]:text-white"
                  >
                    1+
                  </ToggleGroupItem>
                  <ToggleGroupItem 
                    value="2" 
                    className="flex-1 data-[state=on]:bg-blue-700 data-[state=on]:text-white"
                  >
                    2+
                  </ToggleGroupItem>
                  <ToggleGroupItem 
                    value="3" 
                    className="flex-1 data-[state=on]:bg-blue-700 data-[state=on]:text-white"
                  >
                    3+
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>

              {/* Bathrooms */}
              <div>
                <h3 className="font-medium mb-2 text-blue-800">Бани</h3>
                <ToggleGroup 
                  type="single" 
                  value={filters.bathrooms ? String(filters.bathrooms) : ''} 
                  onValueChange={handleBathroomsChange}
                  className="flex flex-wrap justify-between"
                >
                  <ToggleGroupItem 
                    value="" 
                    className="flex-1 data-[state=on]:bg-blue-700 data-[state=on]:text-white"
                  >
                    Всички
                  </ToggleGroupItem>
                  <ToggleGroupItem 
                    value="1" 
                    className="flex-1 data-[state=on]:bg-blue-700 data-[state=on]:text-white"
                  >
                    1+
                  </ToggleGroupItem>
                  <ToggleGroupItem 
                    value="2" 
                    className="flex-1 data-[state=on]:bg-blue-700 data-[state=on]:text-white"
                  >
                    2+
                  </ToggleGroupItem>
                  <ToggleGroupItem 
                    value="3" 
                    className="flex-1 data-[state=on]:bg-blue-700 data-[state=on]:text-white"
                  >
                    3+
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>
            </>
          )}

          <div className="pt-6 flex gap-2">
            <Button 
              onClick={handleReset} 
              variant="outline" 
              className="flex-1 border-blue-200"
            >
              Изчистване
            </Button>
            <Button 
              onClick={handleApplyFilters} 
              className="flex-1 bg-gradient-to-r from-blue-700 to-blue-900 hover:from-blue-800 hover:to-blue-950"
            >
              <Search className="h-4 w-4 mr-2" />
              Търсене
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyFilter;

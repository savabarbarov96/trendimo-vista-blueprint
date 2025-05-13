
import React from "react";
import { Helmet } from "react-helmet";
import SellPropertyForm from "@/components/sell/SellPropertyForm";
import SalesProcessInfo from "@/components/sell/SalesProcessInfo";

const SellPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Helmet>
        <title>Продай имот с Trendimo | Trendimo</title>
      </Helmet>
      
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Продай своя имот с Trendimo</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3">
            <SellPropertyForm />
          </div>
          
          <div className="lg:col-span-2">
            <SalesProcessInfo />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellPage;

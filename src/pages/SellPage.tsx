
import React from "react";
import SellPropertyForm from "@/components/sell/SellPropertyForm";
import SalesProcessInfo from "@/components/sell/SalesProcessInfo";

const SellPage: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              Продай своя имот с Trendimo
            </h1>
            <p className="text-lg text-neutral-dark max-w-3xl mx-auto">
              Нашите експерти ще ви помогнат да постигнете най-добрата цена на пазара с персонализиран план за продажба на вашия имот.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-3 glass-effect rounded-xl overflow-hidden shadow-elegant">
              <div className="p-1">
                <div className="bg-gradient-to-r from-blue-600 to-primary rounded-t-lg p-6">
                  <h2 className="text-2xl font-bold text-white mb-2">Вашите данни</h2>
                  <p className="text-white/80">Попълнете формата, за да започнем процеса</p>
                </div>
                <SellPropertyForm />
              </div>
            </div>
            
            <div className="lg:col-span-2">
              <div className="sticky top-4 bg-white rounded-xl overflow-hidden shadow-elegant border border-gray-100">
                <div className="bg-gradient-to-r from-secondary/80 to-secondary p-6">
                  <h2 className="text-2xl font-bold text-white mb-2">Процес на продажба</h2>
                  <p className="text-white/80">Как работим с продавачите</p>
                </div>
                <SalesProcessInfo />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellPage;

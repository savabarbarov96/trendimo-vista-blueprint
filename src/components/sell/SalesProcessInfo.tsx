
import React from "react";
import { CheckCircle2, Clock, Home, MessageSquare, BarChart2, FileCheck } from "lucide-react";

const SalesProcessInfo: React.FC = () => {
  return (
    <div className="p-6">
      <div className="space-y-8">
        <div className="relative pl-8 border-l-2 border-blue-100 pb-8">
          <div className="absolute -left-3 top-0 bg-primary rounded-full p-1 shadow-md">
            <Clock className="h-4 w-4 text-white" />
          </div>
          <h3 className="font-semibold text-lg mb-2 text-neutral-dark">Безплатна оценка</h3>
          <p className="text-neutral">
            Ще направим професионална оценка на вашия имот, базирана на локацията, 
            състоянието и пазарните условия.
          </p>
        </div>
        
        <div className="relative pl-8 border-l-2 border-blue-100 pb-8">
          <div className="absolute -left-3 top-0 bg-primary rounded-full p-1 shadow-md">
            <Home className="h-4 w-4 text-white" />
          </div>
          <h3 className="font-semibold text-lg mb-2 text-neutral-dark">Подготовка на имота</h3>
          <p className="text-neutral">
            Нашите експерти ще ви посъветват как да подготвите имота за продажба 
            и ще организират професионална фотосесия.
          </p>
        </div>
        
        <div className="relative pl-8 border-l-2 border-blue-100 pb-8">
          <div className="absolute -left-3 top-0 bg-primary rounded-full p-1 shadow-md">
            <BarChart2 className="h-4 w-4 text-white" />
          </div>
          <h3 className="font-semibold text-lg mb-2 text-neutral-dark">Маркетингова стратегия</h3>
          <p className="text-neutral">
            Създаваме персонализирана маркетингова стратегия, включваща качествени снимки, 
            видео обиколки и реклама в нашите канали.
          </p>
        </div>
        
        <div className="relative pl-8 border-l-2 border-blue-100 pb-8">
          <div className="absolute -left-3 top-0 bg-primary rounded-full p-1 shadow-md">
            <MessageSquare className="h-4 w-4 text-white" />
          </div>
          <h3 className="font-semibold text-lg mb-2 text-neutral-dark">Огледи и преговори</h3>
          <p className="text-neutral">
            Организираме огледи с потенциални купувачи и водим преговорите от ваше име, 
            за да получите най-добрата цена.
          </p>
        </div>
        
        <div className="relative pl-8 pb-0">
          <div className="absolute -left-3 top-0 bg-secondary rounded-full p-1 shadow-md">
            <FileCheck className="h-4 w-4 text-white" />
          </div>
          <h3 className="font-semibold text-lg mb-2 text-neutral-dark">Финализиране на сделката</h3>
          <p className="text-neutral">
            Осигуряваме правна помощ за цялата документация и ви придружаваме 
            до успешното финализиране на сделката.
          </p>
        </div>
      </div>
      
      <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
        <div className="flex items-center">
          <CheckCircle2 className="h-6 w-6 text-primary mr-3 flex-shrink-0" />
          <p className="text-neutral-dark font-medium">
            98% от имотите в нашия портфейл се продават успешно в рамките на 90 дни.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SalesProcessInfo;

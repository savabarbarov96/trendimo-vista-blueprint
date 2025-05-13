
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const CompanyCulture = () => {
  const images = [
    "/images/careers/team-meeting.jpg",
    "/images/careers/office-space.jpg",
    "/images/careers/team-building.jpg",
    "/images/careers/workplace.jpg",
    "/images/careers/celebration.jpg",
    "/images/careers/training.jpg",
  ];

  // For demonstration purposes, we'll use placeholders
  // In a real project, you would replace these with actual images
  const placeholderImages = Array(6).fill("/placeholder.svg");

  return (
    <section className="mb-20">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold mb-4">Нашата култура</h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          В Trendimo вярваме, че успехът на компанията идва от хората, които работят в нея.
          Ние се стремим да създаваме среда, която насърчава креативността, сътрудничеството и личностното развитие.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-xl font-bold mb-2">Иновация</h3>
            <p className="text-muted-foreground">
              Насърчаваме новите идеи и подходи, за да бъдем винаги 
              на крачка напред в динамичния пазар на недвижими имоти.
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-xl font-bold mb-2">Екипност</h3>
            <p className="text-muted-foreground">
              Вярваме в силата на сътрудничеството и 
              работата в екип за постигане на общи цели.
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-xl font-bold mb-2">Растеж</h3>
            <p className="text-muted-foreground">
              Инвестираме в професионалното развитие на нашите 
              служители чрез обучения и менторство.
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Separator className="my-12" />
      
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold mb-4">Живот в Trendimo</h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Вижте как изглежда ежедневието в нашата компания
        </p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {placeholderImages.map((src, index) => (
          <div key={index} className="aspect-square overflow-hidden rounded-lg">
            <img 
              src={src} 
              alt={`Team culture ${index + 1}`} 
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default CompanyCulture;

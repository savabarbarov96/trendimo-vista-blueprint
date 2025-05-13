
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import * as LucideIcons from "lucide-react";

interface ServiceCardProps {
  name: string;
  description: string;
  icon: string;
  isHighlighted?: boolean;
}

const ServiceCard = ({ name, description, icon, isHighlighted = false }: ServiceCardProps) => {
  // Dynamically get icon from Lucide
  const IconComponent = (LucideIcons as Record<string, React.ComponentType<any>>)[icon] || 
                       (LucideIcons as Record<string, React.ComponentType<any>>)["HelpCircle"];
  
  return (
    <Card className={`h-full transition-all ${isHighlighted ? 'shadow-lg border-primary border-2' : 'hover:shadow-md'}`}>
      <CardHeader className="pb-2">
        <div className={`mb-4 p-2 rounded-full w-12 h-12 flex items-center justify-center ${isHighlighted ? 'bg-primary text-white' : 'bg-muted'}`}>
          <IconComponent className="h-6 w-6" />
        </div>
        <CardTitle className="text-xl">{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-sm text-muted-foreground">{description}</CardDescription>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;

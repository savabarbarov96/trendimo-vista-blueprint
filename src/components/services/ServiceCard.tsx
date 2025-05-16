import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import * as LucideIcons from "lucide-react";
import { GlowingEffect } from "@/components/ui/glowing-effect";

interface ServiceCardProps {
  name: string;
  description: string;
  icon: string;
  isHighlighted?: boolean;
}

const ServiceCard = ({ name, description, icon, isHighlighted = false }: ServiceCardProps) => {
  // Safely get the icon component from Lucide
  // Cast the type correctly to fix the TypeScript error
  let IconComponent: React.ElementType = LucideIcons.HelpCircle;
  
  // Check if the icon exists in Lucide icons
  if (icon && Object.prototype.hasOwnProperty.call(LucideIcons, icon)) {
    IconComponent = (LucideIcons as any)[icon];
  }
  
  return (
    <Card className={`relative h-full transition-all ${isHighlighted ? 'shadow-lg border-primary border-2' : 'hover:shadow-md'}`}>
      <GlowingEffect
        spread={40}
        glow={true}
        disabled={false}
        proximity={64}
        inactiveZone={0.01}
        borderWidth={3}
      />
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

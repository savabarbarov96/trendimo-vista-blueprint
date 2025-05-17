import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import * as LucideIcons from "lucide-react";

interface ServiceCardProps {
  name: string;
  description: string;
  icon: string;
  isHighlighted?: boolean;
  features?: string[];
  onLearnMore?: () => void;
}

const ServiceCard = ({ 
  name, 
  description, 
  icon, 
  isHighlighted = false,
  features = [],
  onLearnMore
}: ServiceCardProps) => {
  // Safely get the icon component from Lucide
  let IconComponent: React.ElementType = LucideIcons.HelpCircle;
  
  if (icon && Object.prototype.hasOwnProperty.call(LucideIcons, icon)) {
    IconComponent = (LucideIcons as any)[icon];
  }
  
  return (
    <Card className="h-full overflow-hidden border-border bg-background transition-all duration-300 hover:shadow-lg group">
      <CardHeader className="relative">
        <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-primary/5 transition-all duration-500 group-hover:bg-primary/10" />
        <div className="relative z-10">
          <div className={`mb-4 p-2 rounded-full w-12 h-12 flex items-center justify-center ${isHighlighted ? 'bg-primary text-white' : 'bg-muted'}`}>
            <IconComponent className="h-6 w-6" />
          </div>
          <CardTitle className="text-xl mb-2">{name}</CardTitle>
          <CardDescription className="text-muted-foreground">
            {description}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        {features.length > 0 && (
          <>
            <Separator className="mb-4" />
            <ul className="space-y-2">
              {features.map((feature, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-2"
                >
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>{feature}</span>
                </motion.li>
              ))}
            </ul>
          </>
        )}
      </CardContent>
      <CardFooter>
        <Button 
          variant="outline" 
          className="w-full group"
          onClick={onLearnMore}
        >
          Научете повече
          <motion.div
            initial={{ x: 0 }}
            whileHover={{ x: 5 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </motion.div>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ServiceCard;

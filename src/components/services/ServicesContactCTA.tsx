
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const ServicesContactCTA = () => {
  return (
    <div className="bg-muted py-16 px-4 md:py-24">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">Нуждаете се от помощ?</h2>
        <p className="max-w-2xl mx-auto text-muted-foreground mb-8">
          Нашият екип от професионалисти е готов да ви помогне с всички въпроси, свързани с недвижимите имоти.
          Свържете се с нас за безплатна консултация.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/about">
            <Button variant="default" size="lg">
              Свържете се с нас
            </Button>
          </Link>
          <Link to="/properties">
            <Button variant="outline" size="lg">
              Разгледайте имоти
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServicesContactCTA;

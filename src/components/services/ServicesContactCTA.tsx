import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

const ServicesContactCTA = () => {
  return (
    <section className="py-24 md:py-32">
      <div className="container flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col items-center rounded-lg bg-accent p-8 text-center md:rounded-xl lg:p-16 w-full max-w-4xl"
        >
          <span className="mx-auto flex size-16 items-center justify-center rounded-full border bg-background shadow-sm md:size-20 mb-6">
            <Sparkles className="size-6 text-primary" />
          </span>
          <h3 className="mb-3 max-w-3xl text-2xl font-semibold md:mb-4 md:text-4xl lg:mb-6">
            Нуждаете се от помощ?
          </h3>
          <p className="mb-8 max-w-3xl text-muted-foreground lg:text-lg">
            Нашият екип от професионалисти е готов да ви помогне с всички въпроси, свързани с недвижимите имоти.
            Свържете се с нас за безплатна консултация.
          </p>
          <div className="flex w-full flex-col justify-center gap-4 sm:flex-row">
            <Link to="/about">
              <Button className="w-full sm:w-auto group">
                Свържете се с нас
                <motion.div
                  initial={{ x: 0 }}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </motion.div>
              </Button>
            </Link>
            <Link to="/properties">
              <Button variant="outline" className="w-full sm:w-auto">
                Разгледайте имоти
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesContactCTA;

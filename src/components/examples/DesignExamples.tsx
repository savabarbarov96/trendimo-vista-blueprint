
import React from 'react';
import ExampleHeader from './ExampleHeader';
import ExampleForm from './ExampleForm';
import ExampleDashboardCard from './ExampleDashboardCard';
import ExampleDialog from './ExampleDialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';

const DesignExamples = () => {
  return (
    <div className="min-h-screen bg-light">
      <ExampleHeader />
      
      <div className="container mx-auto px-4 py-16 space-y-24">
        <section id="buttons">
          <h2 className="text-2xl font-bold mb-6 decorated-header">Button Examples</h2>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-4">
              <h3 className="text-lg font-medium mb-4">Button Variants</h3>
              <div className="flex flex-wrap gap-4">
                <Button variant="default">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="link">Link</Button>
                <Button variant="destructive">Destructive</Button>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium mb-4">Button Sizes</h3>
              <div className="flex flex-wrap items-center gap-4">
                <Button size="sm">Small</Button>
                <Button size="default">Default</Button>
                <Button size="lg">Large</Button>
                <Button size="icon"><ArrowRight /></Button>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium mb-4">Button States</h3>
              <div className="flex flex-wrap gap-4">
                <Button>Normal</Button>
                <Button disabled>Disabled</Button>
                <Button className="btn-primary-gradient">Gradient</Button>
                <Button variant="default" className="flex items-center">
                  Next Step <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium mb-4">Badge Examples</h3>
              <div className="flex flex-wrap gap-4">
                <Badge>Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="outline">Outline</Badge>
                <Badge variant="destructive">Destructive</Badge>
                <Badge variant="neutral">Neutral</Badge>
              </div>
            </div>
          </div>
        </section>
        
        <section id="form">
          <h2 className="text-2xl font-bold mb-6 decorated-header">Form Example</h2>
          <ExampleForm />
        </section>
        
        <section id="dashboard">
          <h2 className="text-2xl font-bold mb-6 decorated-header">Dashboard Card Example</h2>
          <ExampleDashboardCard />
        </section>
        
        <section id="dialog">
          <h2 className="text-2xl font-bold mb-6 decorated-header">Dialog Examples</h2>
          <div className="flex justify-center">
            <ExampleDialog />
          </div>
        </section>
        
        <section id="color-palette" className="pb-16">
          <h2 className="text-2xl font-bold mb-6 decorated-header">Color Palette</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-4">
            <div className="rounded-lg overflow-hidden shadow-md">
              <div className="h-24 bg-primary"></div>
              <div className="p-3 bg-light">
                <p className="font-bold">Primary Red</p>
                <p className="text-sm text-dark/70">#C10206</p>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden shadow-md">
              <div className="h-24 bg-accent"></div>
              <div className="p-3 bg-light">
                <p className="font-bold">Accent Red</p>
                <p className="text-sm text-dark/70">#A50113</p>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden shadow-md">
              <div className="h-24 bg-dark"></div>
              <div className="p-3 bg-light">
                <p className="font-bold">Dark Neutral</p>
                <p className="text-sm text-dark/70">#211D21</p>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden shadow-md">
              <div className="h-24 bg-light border border-neutral"></div>
              <div className="p-3 bg-light border-t border-neutral">
                <p className="font-bold">Light Background</p>
                <p className="text-sm text-dark/70">#FFFBF2</p>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden shadow-md">
              <div className="h-24 bg-neutral"></div>
              <div className="p-3 bg-light">
                <p className="font-bold">Soft Neutral</p>
                <p className="text-sm text-dark/70">#DFE2DB</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default DesignExamples;

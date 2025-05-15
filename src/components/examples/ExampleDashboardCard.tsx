
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PieChart, ArrowRight } from 'lucide-react';

const data = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 600 },
  { name: 'Apr', value: 800 },
  { name: 'May', value: 500 },
  { name: 'Jun', value: 700 },
];

const ExampleDashboardCard = () => {
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center space-x-2">
          <PieChart className="h-5 w-5 text-primary" />
          <CardTitle>Monthly Performance</CardTitle>
        </div>
        <Badge variant="secondary">Live</Badge>
      </CardHeader>
      <CardContent className="p-6">
        <div className="text-2xl font-bold mb-2">$12,546</div>
        <div className="flex items-center text-xs text-dark/70 mb-4">
          <span className="text-green-600 font-medium">+18%</span>
          <span className="ml-1">from previous month</span>
        </div>
        
        <div className="h-[180px] mt-4 -ml-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{
                top: 5,
                right: 5,
                left: 0,
                bottom: 0,
              }}
            >
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#C10206" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#C10206" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#DFE2DB" />
              <XAxis dataKey="name" tick={{fill: '#211D21'}} />
              <YAxis tick={{fill: '#211D21'}} />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#FFFBF2',
                  border: '1px solid #DFE2DB',
                  borderRadius: '4px',
                }}
              />
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke="#C10206" 
                fillOpacity={1} 
                fill="url(#colorValue)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="ghost" className="w-full" asChild>
          <a href="#" className="flex items-center justify-center">
            View detailed report
            <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ExampleDashboardCard;

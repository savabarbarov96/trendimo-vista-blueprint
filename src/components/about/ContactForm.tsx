
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const ContactForm: React.FC = () => {
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, this would send the form data to a backend
    toast({
      title: "Формуляр изпратен",
      description: "Благодарим ви за съобщението. Ще се свържем с вас скоро.",
    });
    
    // Reset the form
    (e.target as HTMLFormElement).reset();
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-neutral-800 p-6 rounded-lg shadow-lg border border-neutral-700/30">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1 text-gray-200">
            Име
          </label>
          <Input 
            id="name" 
            required 
            placeholder="Вашето име" 
            className="bg-neutral-700 border-neutral-600 text-white placeholder:text-gray-400 focus:border-primary"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1 text-gray-200">
            Имейл
          </label>
          <Input 
            id="email" 
            type="email" 
            required 
            placeholder="вашият@емейл.ком" 
            className="bg-neutral-700 border-neutral-600 text-white placeholder:text-gray-400 focus:border-primary"
          />
        </div>
      </div>
      
      <div>
        <label htmlFor="subject" className="block text-sm font-medium mb-1 text-gray-200">
          Тема
        </label>
        <Input 
          id="subject" 
          required 
          placeholder="Тема на съобщението" 
          className="bg-neutral-700 border-neutral-600 text-white placeholder:text-gray-400 focus:border-primary"
        />
      </div>
      
      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-1 text-gray-200">
          Съобщение
        </label>
        <Textarea 
          id="message" 
          required 
          placeholder="Вашето съобщение..." 
          className="min-h-[120px] bg-neutral-700 border-neutral-600 text-white placeholder:text-gray-400 focus:border-primary" 
        />
      </div>
      
      <Button 
        type="submit" 
        className="w-full sm:w-auto bg-primary hover:bg-primary-dark text-white"
      >
        Изпрати съобщение
      </Button>
    </form>
  );
};

export default ContactForm;

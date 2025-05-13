
import React from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Building, Phone, Mail, MapPin } from 'lucide-react';

const PropertySellForm = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted');
    // In a real app, we would handle form submission here
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Продайте Вашия Имот с Trendimo</h2>
            <p className="text-lg text-neutral mb-6">
              Без значение дали продавате апартамент, къща или комерсиален имот, нашите експерти ще ви помогнат да 
              получите най-добрата цена и бързо да финализирате сделката.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-primary/10 p-2 rounded-full mr-4">
                  <Building className="text-primary h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-xl mb-1">Професионална Оценка</h3>
                  <p className="text-neutral-dark">Получете безплатна пазарна оценка от нашите експерти</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-secondary/10 p-2 rounded-full mr-4">
                  <Phone className="text-secondary h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-xl mb-1">Персонален Консултант</h3>
                  <p className="text-neutral-dark">Ще ви бъде назначен личен брокер за целия процес</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-primary/10 p-2 rounded-full mr-4">
                  <Mail className="text-primary h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-xl mb-1">Маркетингова Стратегия</h3>
                  <p className="text-neutral-dark">Професионални снимки и ефективен онлайн маркетинг</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-secondary/10 p-2 rounded-full mr-4">
                  <MapPin className="text-secondary h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-xl mb-1">Правно Съдействие</h3>
                  <p className="text-neutral-dark">Пълна подкрепа при изготвяне на документи и договори</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold mb-6 text-center">Свържете се с нас за оценка</h3>
            
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-neutral-dark mb-1">
                      Име и фамилия *
                    </label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Вашето име"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-neutral-dark mb-1">
                      Имейл адрес *
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="example@email.com"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-neutral-dark mb-1">
                      Телефон *
                    </label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+359 XXX XXX XXX"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="propertyType" className="block text-sm font-medium text-neutral-dark mb-1">
                      Тип имот *
                    </label>
                    <select 
                      id="propertyType"
                      className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    >
                      <option value="">Изберете тип имот</option>
                      <option value="apartment">Апартамент</option>
                      <option value="house">Къща</option>
                      <option value="land">Земя</option>
                      <option value="commercial">Търговски имот</option>
                      <option value="other">Друго</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-neutral-dark mb-1">
                    Адрес на имота *
                  </label>
                  <Input
                    id="address"
                    type="text"
                    placeholder="ул./бул., номер, град"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-neutral-dark mb-1">
                    Допълнителна информация
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Опишете накратко вашия имот (площ, етаж, година на строеж и т.н.)"
                    className="h-24"
                  />
                </div>
                
                <div className="pt-2">
                  <Button type="submit" className="w-full bg-primary hover:bg-primary-dark">
                    Изпратете запитване
                  </Button>
                </div>
                
                <p className="text-xs text-neutral text-center mt-4">
                  С изпращането на формата, се съгласявате с нашите <a href="/terms" className="text-primary hover:underline">общи условия</a> и <a href="/privacy" className="text-primary hover:underline">политика за поверителност</a>.
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PropertySellForm;

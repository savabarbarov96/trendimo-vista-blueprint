import React, { useState, useMemo } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Building, Phone, Mail, MapPin } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const PropertySellForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    phone: '',
    propertyType: '',
    name: '',
    email: '',
    address: '',
    message: ''
  });

  // Count only digits for reveal logic
  const digitCount = useMemo(
    () => (formData.phone.match(/\d/g) || []).length,
    [formData.phone]
  );

  // Determine which fields to display
  const showPropertyType = digitCount >= 4;
  const showAllRest = digitCount >= 6 || showPropertyType && formData.propertyType;

  // Dynamic hint under phone input
  const phoneHint = useMemo(() => {
    if (digitCount < 1) return 'Продаваш имот? Направи го само в няколко стъпки!';
    if (digitCount < 4) return 'Въведи телефонния си номер';
    if (digitCount === 4) return 'Остават още няколко стъпки, напиши останалата част от номера си';
    if (digitCount < 6) return 'Напиши още цифри, за да продължиш';
    return '';
  }, [digitCount]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate visible required fields
    if (!formData.phone || !formData.propertyType || !formData.name || !formData.email || !formData.address) {
      toast({
        title: 'Грешка',
        description: 'Моля, попълнете всички задължителни полета.',
        variant: 'destructive'
      });
      return;
    }

    try {
      setIsSubmitting(true);
      const { error } = await supabase
        .from('sell_requests')
        .insert({
          phone: formData.phone,
          property_type: formData.propertyType,
          name: formData.name,
          email: formData.email,
          address: formData.address,
          description: formData.message,
          status: 'pending'
        });

      if (error) throw error;

      toast({
        title: 'Формулярът е изпратен успешно!',
        description: 'Благодарим ви за интереса. Наш агент ще се свърже с вас възможно най-скоро за безплатна оценка на имота.'
      });

      // Reset the form
      setFormData({ phone: '', propertyType: '', name: '', email: '', address: '', message: '' });
    } catch (err) {
      console.error('Error:', err);
      toast({
        title: 'Възникна грешка',
        description: 'Моля, опитайте отново по-късно.',
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Phone Field - always shown */}
      <div className="group">
        <label htmlFor="phone" className="block text-base font-medium text-neutral-dark mb-2">
          <span className="flex items-center gap-2">
            <Phone className="h-5 w-5 text-red-500" />
            Телефон *
          </span>
        </label>
        <Input
          id="phone"
          type="tel"
          placeholder="+359 88x xxxx"
          required
          value={formData.phone}
          onChange={handleChange}
          className="py-3 text-lg transition-all focus-within:border-red-500 focus-within:ring-red-500/20"
        />
        {phoneHint && <p className="text-sm text-neutral mt-2 italic">{phoneHint}</p>}
      </div>

      {/* Property Type - reveal after 4 digits */}
      {showPropertyType && (
        <div className="animate-fade-in">
          <label htmlFor="propertyType" className="block text-base font-medium text-neutral-dark mb-2">
            <span className="flex items-center gap-2">
              <Building className="h-5 w-5 text-red-500" />
              Вид имот *
            </span>
          </label>
          <select
            id="propertyType"
            className="w-full border border-gray-300 rounded-md px-4 py-3 text-lg transition-all focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
            value={formData.propertyType}
            onChange={handleChange}
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
      )}

      {/* Reveal rest after 6 digits or propertyType selected */}
      {showAllRest && (
        <div className="space-y-6 animate-fade-in">
          <div>
            <label htmlFor="name" className="block text-base font-medium text-neutral-dark mb-2">
              <span className="flex items-center gap-2">
                <span className="h-5 w-5 flex items-center justify-center">👤</span>
                Име и фамилия *
              </span>
            </label>
            <Input
              id="name"
              type="text"
              placeholder="Вашето име"
              value={formData.name}
              onChange={handleChange}
              required
              className="py-3 text-lg transition-all focus-within:border-red-500 focus-within:ring-red-500/20"
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-base font-medium text-neutral-dark mb-2">
              <span className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-red-500" />
                Имейл адрес *
              </span>
            </label>
            <Input
              id="email"
              type="email"
              placeholder="example@email.com"
              value={formData.email}
              onChange={handleChange}
              required
              className="py-3 text-lg transition-all focus-within:border-red-500 focus-within:ring-red-500/20"
            />
          </div>
          
          <div>
            <label htmlFor="address" className="block text-base font-medium text-neutral-dark mb-2">
              <span className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-red-500" />
                Адрес на имота *
              </span>
            </label>
            <Input
              id="address"
              type="text"
              placeholder="ул./бул., номер, град"
              value={formData.address}
              onChange={handleChange}
              required
              className="py-3 text-lg transition-all focus-within:border-red-500 focus-within:ring-red-500/20"
            />
          </div>
          
          <div>
            <label htmlFor="message" className="block text-base font-medium text-neutral-dark mb-2">
              Допълнителна информация
            </label>
            <Textarea
              id="message"
              placeholder="Опишете накратко вашия имот"
              className="h-32 transition-all focus-within:border-red-500 focus-within:ring-red-500/20"
              value={formData.message}
              onChange={handleChange}
            />
          </div>
        </div>
      )}

      <Button 
        type="submit" 
        className="w-full mt-6 text-lg py-6 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 shadow-md" 
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Изпращане...' : 'Изпратете запитване'}
      </Button>

      <p className="text-sm text-neutral text-center mt-4">
        С изпращането на формата, се съгласявате с нашите <a href="/terms" className="text-red-500 hover:underline">общи условия</a> и <a href="/privacy" className="text-red-500 hover:underline">политика за поверителност</a>.
      </p>
    </form>
  );
};

export default PropertySellForm;

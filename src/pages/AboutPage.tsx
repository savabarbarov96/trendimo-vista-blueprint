
import React from 'react';
import TeamMemberCard from '@/components/about/TeamMemberCard';
import ContactForm from '@/components/about/ContactForm';
import TestimonialsCarousel from '@/components/TestimonialsCarousel';
import ViberBanner from '@/components/ViberBanner';
import { siteContent } from '../data/content';

const AboutPage: React.FC = () => {
  const { about, company } = siteContent;
  
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary-dark text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{about.title}</h1>
          <p className="text-xl max-w-3xl">{about.subtitle}</p>
        </div>
      </section>
      
      {/* Company Story */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Нашата история</h2>
              <p className="text-lg mb-6">{about.story}</p>
            </div>
            <div className="rounded-lg overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1486718448742-163732cd1544?auto=format&fit=crop&w=800" 
                alt="Офис на Трендимо" 
                className="w-full h-full object-cover" 
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Mission, Vision, Values */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold mb-4">Нашата мисия</h3>
              <p className="text-lg">{company.mission}</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold mb-4">Нашата визия</h3>
              <p className="text-lg">{company.vision}</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold mb-4">Нашите ценности</h3>
              <ul className="list-disc pl-5 space-y-2">
                {company.values.map((value, index) => (
                  <li key={index} className="text-lg">{value}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      {/* Team */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-2 text-center">{about.team.title}</h2>
          <p className="text-lg text-center mb-12">Запознайте се с хората зад Трендимо</p>
          
          {/* Team Group Photo */}
          <div className="mb-16">
            <div className="mx-auto max-w-4xl rounded-lg overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=1200" 
                alt="Екипът на Трендимо" 
                className="w-full h-auto"
              />
            </div>
          </div>
          
          {/* Team Member Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Featured Team Members */}
            <TeamMemberCard 
              name="Николай-Емил Димитров" 
              position="Главен технологичен директор" 
              bio="Николай е опитен софтуерен инженер с над 10 години опит в изграждането на платформи за недвижими имоти. Преди Трендимо, той е работил в няколко технологични компании в София и Лондон."
              photoUrl="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400"
            />
            
            <TeamMemberCard 
              name="Мохамед Алексиев" 
              position="Маркетинг директор" 
              bio="Мохамед е експерт по маркетинг с фокус върху дигиталния маркетинг и SEO за недвижими имоти. Той има магистърска степен по бизнес администрация от Софийския университет."
              photoUrl="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400"
            />
            
            {about.team.members.map((member, index) => (
              <TeamMemberCard 
                key={index}
                name={member.name} 
                position={member.position} 
                bio={member.bio}
                photoUrl={`https://images.unsplash.com/photo-151939395${index * 10}-0b93528c311a?auto=format&fit=crop&w=400`}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Office & Contact */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6">Нашият офис</h2>
              <div className="rounded-lg overflow-hidden shadow-xl mb-6">
                <img 
                  src="https://images.unsplash.com/photo-1497604401993-f2e922e5cb0a?auto=format&fit=crop&w=800" 
                  alt="Офисът на Трендимо" 
                  className="w-full h-auto"
                />
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-4">Посетете ни</h3>
                <p className="mb-2">
                  <strong>Адрес:</strong> {siteContent.footer.contact.address}
                </p>
                <p className="mb-2">
                  <strong>Телефон:</strong> {siteContent.footer.contact.phone}
                </p>
                <p className="mb-2">
                  <strong>Имейл:</strong> {siteContent.footer.contact.email}
                </p>
                <p className="mb-2">
                  <strong>Работно време:</strong> Понеделник - Петък: 9:00 - 18:00
                </p>
              </div>
            </div>
            
            <div>
              <h2 className="text-3xl font-bold mb-6">Свържете се с нас</h2>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <TestimonialsCarousel />
      
      {/* Viber Banner */}
      <ViberBanner />
    </div>
  );
};

export default AboutPage;

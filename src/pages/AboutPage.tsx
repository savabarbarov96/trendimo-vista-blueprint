import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Helmet } from 'react-helmet';
import { Separator } from '@/components/ui/separator';
import { supabase } from '@/integrations/supabase/client';
import { Loader2 } from 'lucide-react';
import { TeamMember } from '@/integrations/supabase/types';

const AboutPage = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        // Using any as a workaround for TypeScript errors
        // until the Supabase schema is fully updated
        const { data, error } = await (supabase as any)
          .from('team_members')
          .select('*')
          .eq('is_active', true)
          .order('order_index', { ascending: true });

        if (error) {
          throw error;
        }

        setTeamMembers(data as TeamMember[] || []);
      } catch (error) {
        console.error('Error fetching team members:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeamMembers();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white flex flex-col">
      <Helmet>
        <title>За нас | Trendimo</title>
      </Helmet>

      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-r from-red-700 to-red-900 text-white">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">За Trendimo</h1>
              <p className="text-xl max-w-3xl mx-auto">
                Водеща компания за недвижими имоти с дългогодишен опит и отдадени професионалисти
              </p>
            </div>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-red-700 to-primary bg-clip-text text-transparent">Нашата История</h2>
                <p className="mb-4 text-gray-700">
                  Основана през 2010 година, Trendimo израстна от малка агенция до една от 
                  водещите компании за недвижими имоти в България. Нашият път е белязан от 
                  непрекъснато усъвършенстване и отдаденост към клиентите.
                </p>
                <p className="text-gray-700">
                  Вярваме, че всеки заслужава перфектния дом или инвестиционна възможност, 
                  и се стремим да предоставим персонализирана услуга, която отговаря на 
                  уникалните нужди на всеки клиент.
                </p>
              </div>
              <div className="bg-gradient-to-r from-red-100 to-white p-1 rounded-lg shadow-elegant">
                <div className="bg-white rounded-lg overflow-hidden">
                  <img 
                    src="/placeholder.svg" 
                    alt="Trendimo team" 
                    className="w-full h-auto rounded-lg" 
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <Separator className="max-w-2xl mx-auto opacity-30" />

        {/* Values Section */}
        <section className="py-16 bg-gradient-to-r from-red-50 to-pink-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center bg-gradient-to-r from-red-700 to-primary bg-clip-text text-transparent">
              Нашите ценности
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl p-6 shadow-elegant border border-red-100">
                <h3 className="text-xl font-bold mb-4 text-red-800">Прозрачност</h3>
                <p className="text-gray-700">
                  Работим с пълна прозрачност и честност, защото вярваме, че това 
                  е основата на всяка успешна сделка и дългосрочни отношения.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-elegant border border-red-100">
                <h3 className="text-xl font-bold mb-4 text-red-800">Професионализъм</h3>
                <p className="text-gray-700">
                  Нашите експерти са висококвалифицирани професионалисти, които следят 
                  последните тенденции и подходи в бизнеса с недвижими имоти.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-elegant border border-red-100">
                <h3 className="text-xl font-bold mb-4 text-red-800">Клиентски фокус</h3>
                <p className="text-gray-700">
                  Ние поставяме нуждите на клиентите на първо място и се стремим да 
                  надминем очакванията им с всяка сделка.
                </p>
              </div>
            </div>
          </div>
        </section>

        <Separator className="max-w-2xl mx-auto opacity-30" />

        {/* Team Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center bg-gradient-to-r from-red-700 to-primary bg-clip-text text-transparent">
              Запознайте се с екипа
            </h2>
            
            {loading ? (
              <div className="flex justify-center items-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-red-600" />
              </div>
            ) : teamMembers.length === 0 ? (
              <p className="text-center text-gray-500">
                Информацията за нашия екип скоро ще бъде достъпна.
              </p>
            ) : (
              <div
                className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
              >
                {teamMembers.map((member) => (
                  <div 
                    key={member.id} 
                    className="bg-white rounded-xl overflow-hidden shadow-elegant border border-red-100 transition-all hover:shadow-floating hover:translate-y-[-5px] group"
                  >
                    <div className="relative overflow-hidden h-72">
                      <img 
                        src={member.image_url || "/placeholder.svg"} 
                        alt={member.name} 
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                        <p className="text-white text-sm line-clamp-3">{member.bio}</p>
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="font-bold text-lg text-red-800">{member.name}</h3>
                      <p className="text-red-600">{member.position}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;

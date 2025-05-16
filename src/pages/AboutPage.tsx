import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Helmet } from 'react-helmet';
import { Separator } from '@/components/ui/separator';
import { supabase } from '@/integrations/supabase/client';
import { Loader2 } from 'lucide-react';
import { TeamMember } from '@/integrations/supabase/types';
import { GlowingEffect } from '@/components/ui/glowing-effect';
import { AnimatedTestimonials } from '@/components/ui/animated-testimonials';
import { TextShimmer } from '@/components/ui/text-shimmer';
import { StoryScroll } from '@/components/about/story-scroll';

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

  // Transform team members data for testimonials
  const testimonialData = teamMembers.map(member => ({
    quote: member.bio || '',
    name: member.name,
    designation: member.position,
    src: member.image_url || '/placeholder.svg'
  }));

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
              <TextShimmer 
                as="h1"
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 [--base-color:theme(colors.white)] [--base-gradient-color:theme(colors.red.200)]"
                duration={3}
              >
                За Trendimo
              </TextShimmer>
              <p className="text-xl max-w-3xl mx-auto">
                Водеща компания за недвижими имоти с дългогодишен опит и отдадени професионалисти
              </p>
            </div>
          </div>
        </section>

        {/* Story Scroll Section - replaced the History section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <TextShimmer 
              as="h2"
              className="text-2xl md:text-3xl font-bold mb-8 text-center [--base-color:theme(colors.red.800)] [--base-gradient-color:theme(colors.red.400)]"
              duration={2.5}
            >
              Нашата история
            </TextShimmer>
            
            <div className="rounded-xl overflow-hidden shadow-elegant">
              <StoryScroll />
            </div>
          </div>
        </section>

        <Separator className="max-w-2xl mx-auto opacity-30" />

        {/* Values Section */}
        <section className="py-16 bg-gradient-to-r from-red-50 to-pink-50">
          <div className="container mx-auto px-4">
            <TextShimmer 
              as="h2"
              className="text-2xl md:text-3xl font-bold mb-12 text-center [--base-color:theme(colors.red.800)] [--base-gradient-color:theme(colors.red.400)]"
              duration={2.5}
            >
              Нашите ценности
            </TextShimmer>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="relative bg-white rounded-xl p-6 shadow-elegant border border-red-100">
                <GlowingEffect
                  spread={40}
                  glow={true}
                  disabled={false}
                  proximity={64}
                  inactiveZone={0.01}
                  borderWidth={3}
                />
                <h3 className="text-xl font-bold mb-4 text-red-800">Прозрачност</h3>
                <p className="text-gray-700">
                  Работим с пълна прозрачност и честност, защото вярваме, че това 
                  е основата на всяка успешна сделка и дългосрочни отношения.
                </p>
              </div>
              <div className="relative bg-white rounded-xl p-6 shadow-elegant border border-red-100">
                <GlowingEffect
                  spread={40}
                  glow={true}
                  disabled={false}
                  proximity={64}
                  inactiveZone={0.01}
                  borderWidth={3}
                />
                <h3 className="text-xl font-bold mb-4 text-red-800">Професионализъм</h3>
                <p className="text-gray-700">
                  Нашите експерти са висококвалифицирани професионалисти, които следят 
                  последните тенденции и подходи в бизнеса с недвижими имоти.
                </p>
              </div>
              <div className="relative bg-white rounded-xl p-6 shadow-elegant border border-red-100">
                <GlowingEffect
                  spread={40}
                  glow={true}
                  disabled={false}
                  proximity={64}
                  inactiveZone={0.01}
                  borderWidth={3}
                />
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
            <TextShimmer 
              as="h2"
              className="text-2xl md:text-3xl font-bold mb-12 text-center [--base-color:theme(colors.red.800)] [--base-gradient-color:theme(colors.red.400)]"
              duration={2.5}
            >
              Запознайте се с екипа
            </TextShimmer>
            
            {loading ? (
              <div className="flex justify-center items-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-red-600" />
              </div>
            ) : teamMembers.length === 0 ? (
              <p className="text-center text-gray-500">
                Информацията за нашия екип скоро ще бъде достъпна.
              </p>
            ) : (
              <AnimatedTestimonials 
                testimonials={testimonialData} 
                autoplay={true}
                className="bg-gradient-to-r from-red-50 to-pink-50 rounded-2xl shadow-elegant" 
              />
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;

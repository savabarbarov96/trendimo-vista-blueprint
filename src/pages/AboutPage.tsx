
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Helmet } from 'react-helmet';
import { Separator } from '@/components/ui/separator';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col">
      <Helmet>
        <title>За нас | Trendimo</title>
      </Helmet>

      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-r from-blue-700 to-blue-900 text-white">
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
                <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-700 to-primary bg-clip-text text-transparent">Нашата История</h2>
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
              <div className="bg-gradient-to-r from-blue-100 to-white p-1 rounded-lg shadow-elegant">
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
        <section className="py-16 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center bg-gradient-to-r from-blue-700 to-primary bg-clip-text text-transparent">
              Нашите ценности
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl p-6 shadow-elegant border border-blue-100">
                <h3 className="text-xl font-bold mb-4 text-blue-800">Прозрачност</h3>
                <p className="text-gray-700">
                  Работим с пълна прозрачност и честност, защото вярваме, че това 
                  е основата на всяка успешна сделка и дългосрочни отношения.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-elegant border border-blue-100">
                <h3 className="text-xl font-bold mb-4 text-blue-800">Професионализъм</h3>
                <p className="text-gray-700">
                  Нашите експерти са висококвалифицирани професионалисти, които следят 
                  последните тенденции и подходи в бизнеса с недвижими имоти.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-elegant border border-blue-100">
                <h3 className="text-xl font-bold mb-4 text-blue-800">Клиентски фокус</h3>
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
            <h2 className="text-3xl font-bold mb-12 text-center bg-gradient-to-r from-blue-700 to-primary bg-clip-text text-transparent">
              Запознайте се с екипа
            </h2>
            <div className="grid md:grid-cols-4 gap-8">
              {[1, 2, 3, 4].map((member) => (
                <div key={member} className="bg-white rounded-xl overflow-hidden shadow-elegant border border-blue-100 transition-all hover:shadow-floating hover:translate-y-[-5px]">
                  <img 
                    src="/placeholder.svg" 
                    alt={`Team member ${member}`} 
                    className="w-full aspect-square object-cover" 
                  />
                  <div className="p-4">
                    <h3 className="font-bold text-lg">Име Фамилия</h3>
                    <p className="text-blue-600">Позиция</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;

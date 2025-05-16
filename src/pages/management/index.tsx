import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PropertiesManagement from '@/components/management/PropertiesManagement';
import InquiriesManagement from '@/components/management/InquiriesManagement';
import SellRequestsManagement from '@/components/management/SellRequestsManagement';
import CareersManagement from '@/components/management/CareersManagement';
import TeamMembersManagement from '@/components/management/TeamMembersManagement';
import BlogManagement from '@/components/management/BlogManagement';
import SlideshowManagement from '@/components/management/SlideshowManagement';
import { useAuth } from '@/hooks/use-auth';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

const ManagementPage = () => {
  const [activeTab, setActiveTab] = useState('properties');
  const { user, profile, loading } = useAuth();
  const navigate = useNavigate();

  // Redirect if not authenticated or not authorized
  useEffect(() => {
    let mounted = true;

    const checkAuth = async () => {
      // Only redirect if the component is still mounted and we're done loading
      if (mounted && !loading) {
        if (!user) {
          navigate('/login', { replace: true });
        } else if (profile && !['admin', 'agent'].includes(profile.role)) {
          navigate('/', { replace: true });
        }
      }
    };

    checkAuth();

    return () => {
      mounted = false;
    };
  }, [user, profile, loading, navigate]);

  // Show loading state while checking authentication
  if (loading || !user || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Проверка на достъп...</p>
        </div>
      </div>
    );
  }

  // If not authorized, don't render anything (redirect will happen)
  if (!['admin', 'agent'].includes(profile.role)) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Управление на имоти | Trendimo</title>
      </Helmet>
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Управление на имоти</h1>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-8">
            <TabsTrigger value="properties">Имоти</TabsTrigger>
            <TabsTrigger value="sell-requests">Заявки за продажба</TabsTrigger>
            <TabsTrigger value="inquiries">Запитвания</TabsTrigger>
            <TabsTrigger value="careers">Отворени Позиции</TabsTrigger>
            <TabsTrigger value="team">Нашият Екип</TabsTrigger>
            <TabsTrigger value="blog">Блог</TabsTrigger>
            <TabsTrigger value="slideshow">Начален Слайдшоу</TabsTrigger>
          </TabsList>
          
          <TabsContent value="properties">
            <PropertiesManagement />
          </TabsContent>
          
          <TabsContent value="sell-requests">
            <SellRequestsManagement />
          </TabsContent>
          
          <TabsContent value="inquiries">
            <InquiriesManagement />
          </TabsContent>
          
          <TabsContent value="careers">
            <CareersManagement />
          </TabsContent>
          
          <TabsContent value="team">
            <TeamMembersManagement />
          </TabsContent>
          
          <TabsContent value="blog">
            <BlogManagement />
          </TabsContent>
          
          <TabsContent value="slideshow">
            <SlideshowManagement />
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};

export default ManagementPage; 
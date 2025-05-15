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
import { useUser } from '@/hooks/auth/use-user';
import { useNavigate } from 'react-router-dom';

const ManagementPage = () => {
  const [activeTab, setActiveTab] = useState('properties');
  const { data: user, isLoading } = useUser();
  const navigate = useNavigate();

  // Redirect if not authenticated
  useEffect(() => {
    if (!isLoading && !user) {
      navigate('/login');
    }
  }, [user, isLoading, navigate]);

  // Show loading or nothing while checking authentication
  if (isLoading || (!isLoading && !user)) {
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
        
        <Tabs defaultValue="properties" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-8">
            <TabsTrigger value="properties">Имоти</TabsTrigger>
            <TabsTrigger value="sell-requests">Заявки за продажба</TabsTrigger>
            <TabsTrigger value="inquiries">Запитвания</TabsTrigger>
            <TabsTrigger value="careers">Отворени Позиции</TabsTrigger>
            <TabsTrigger value="team">Нашият Екип</TabsTrigger>
            <TabsTrigger value="blog">Блог</TabsTrigger>
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
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};

export default ManagementPage; 
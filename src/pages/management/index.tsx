import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PropertiesManagement from '@/components/management/PropertiesManagement';
import InquiriesManagement from '@/components/management/InquiriesManagement';
import SellRequestsManagement from '@/components/management/SellRequestsManagement';
import CareersManagement from '@/components/management/CareersManagement';
import TeamMembersManagement from '@/components/management/TeamMembersManagement';
import BlogManagement from '@/components/management/BlogManagement';
import SlideshowManagement from '@/components/management/SlideshowManagement';
import { ViberSettings } from "@/components/management/ViberSettings";
import SocialMediaLinksManagement from '@/components/management/SocialMediaLinksManagement';
import { useAuth } from '@/hooks/use-auth';
import { useNavigate } from 'react-router-dom';
import { Loader2, Home, MessageSquare, Building, BriefcaseBusiness, Users, FileText, Image, MessageCircle, Share2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

// Sidebar item type definition
type SidebarItem = {
  id: string;
  label: string;
  icon: React.ReactNode;
};

const ManagementPage = () => {
  const [activeSection, setActiveSection] = useState('properties');
  const { user, profile, loading } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  // Define sidebar items
  const sidebarItems: SidebarItem[] = [
    { id: 'properties', label: 'Имоти', icon: <Building className="w-5 h-5" /> },
    { id: 'sell-requests', label: 'Заявки за продажба', icon: <MessageSquare className="w-5 h-5" /> },
    { id: 'inquiries', label: 'Запитвания', icon: <MessageCircle className="w-5 h-5" /> },
    { id: 'careers', label: 'Отворени Позиции', icon: <BriefcaseBusiness className="w-5 h-5" /> },
    { id: 'team', label: 'Нашият Екип', icon: <Users className="w-5 h-5" /> },
    { id: 'blog', label: 'Блог', icon: <FileText className="w-5 h-5" /> },
    { id: 'slideshow', label: 'Начален Слайдшоу', icon: <Image className="w-5 h-5" /> },
    { id: 'viber', label: 'Viber Настройки', icon: <MessageCircle className="w-5 h-5 text-[#7360f2]" /> },
    { id: 'social-media', label: 'Социални Медии', icon: <Share2 className="w-5 h-5" /> },
  ];

  // Redirect if not authenticated or not authorized
  useEffect(() => {
    let mounted = true;
    let hasAttemptedRedirect = false;

    const checkAuth = async () => {
      // Only redirect if the component is still mounted, we're done loading, and haven't attempted a redirect yet
      if (mounted && !loading && !hasAttemptedRedirect) {
        hasAttemptedRedirect = true;
        
        if (!user) {
          console.log("No user found, redirecting to login");
          navigate('/login', { replace: true });
        } else if (profile && !['admin', 'agent'].includes(profile.role)) {
          console.log("User doesn't have required role, redirecting to home");
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

  // Render the content based on the active section
  const renderContent = () => {
    switch (activeSection) {
      case 'properties':
        return <PropertiesManagement />;
      case 'sell-requests':
        return <SellRequestsManagement />;
      case 'inquiries':
        return <InquiriesManagement />;
      case 'careers':
        return <CareersManagement />;
      case 'team':
        return <TeamMembersManagement />;
      case 'blog':
        return <BlogManagement />;
      case 'slideshow':
        return <SlideshowManagement />;
      case 'viber':
        return <ViberSettings />;
      case 'social-media':
        return <SocialMediaLinksManagement />;
      default:
        return <PropertiesManagement />;
    }
  };

  const SidebarContent = () => (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-800">Админ Панел</h2>
        <p className="text-sm text-gray-500">Управление на съдържание</p>
      </div>
      <nav className="p-4 space-y-1 flex-1">
        {sidebarItems.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              setActiveSection(item.id);
              setIsOpen(false);
            }}
            className={cn(
              "flex items-center gap-3 w-full px-3 py-2 text-sm rounded-md transition-colors",
              activeSection === item.id
                ? "bg-gray-100 text-gray-900 font-medium"
                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            )}
          >
            {item.icon}
            {item.label}
          </button>
        ))}
      </nav>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Управление на имоти | Trendimo</title>
      </Helmet>
      <Navbar />
      
      <div className="flex-grow flex">
        {/* Desktop Sidebar */}
        <div className="w-64 bg-gray-50 border-r border-gray-200 hidden md:block">
          <SidebarContent />
        </div>

        {/* Mobile Sidebar */}
        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="fixed top-20 left-4 z-50">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0">
              <SidebarContent />
            </SheetContent>
          </Sheet>
        </div>

        {/* Main content */}
        <div className="flex-1 p-6 overflow-auto">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold mb-6 md:mt-0 mt-8">
              {sidebarItems.find(item => item.id === activeSection)?.label || 'Управление'}
            </h1>
            {renderContent()}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ManagementPage; 
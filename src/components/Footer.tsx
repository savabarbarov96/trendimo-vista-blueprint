import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { siteContent } from '../data/content';
import logo from '@/assets/logo-footer_2.png';

// Custom TikTok icon since it's not available in lucide-react
const TikTokIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9 12a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"/>
    <path d="M16 8v8"/>
    <path d="M12 16v-8"/>
    <path d="M18 8a4 4 0 0 0-4-4"/>
    <path d="M16 4h-4"/>
    <path d="M16 8a4 4 0 0 1 4 4v1"/>
  </svg>
);

// Default social media links (used as fallback)
const defaultSocialLinks = [
  { id: '1', platform: "Facebook", url: "https://facebook.com", icon: "Facebook", is_active: true, display_order: 1 },
  { id: '2', platform: "Instagram", url: "https://instagram.com", icon: "Instagram", is_active: true, display_order: 2 },
  { id: '3', platform: "TikTok", url: "https://tiktok.com", icon: "TikTok", is_active: true, display_order: 3 },
  { id: '4', platform: "Twitter", url: "https://twitter.com", icon: "Twitter", is_active: true, display_order: 4 },
  { id: '5', platform: "LinkedIn", url: "https://linkedin.com", icon: "Linkedin", is_active: true, display_order: 5 },
];

// Icons mapping
const iconComponents: Record<string, React.ReactNode> = {
  Facebook: <Facebook />,
  Instagram: <Instagram />,
  Twitter: <Twitter />,
  Linkedin: <Linkedin />,
  TikTok: <TikTokIcon />,
};

// Interface for social media links
interface SocialMediaLink {
  id: string;
  platform: string;
  url: string;
  icon: string;
  is_active: boolean;
  display_order: number;
}

const Footer = () => {
  const { footer, nav } = siteContent;
  const [socialLinks, setSocialLinks] = useState<SocialMediaLink[]>(defaultSocialLinks);

  // Fetch social media links
  useEffect(() => {
    const fetchSocialLinks = async () => {
      try {
        // Fetch from our Edge Function
        const response = await fetch('https://zanfdpuiblradrbtfzhl.supabase.co/functions/v1/social-media-links');
        
        if (response.ok) {
          const data = await response.json();
          setSocialLinks(data);
        }
      } catch (error) {
        console.error('Error fetching social media links:', error);
        // Default links are already set as initial state
      }
    };

    fetchSocialLinks();
  }, []);

  return (
    <footer className="bg-gradient-to-b from-white to-gray-200 text-gray-800">
      <div className="container mx-auto px-4 pt-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info with Logo */}
          <div>
            <div className="mb-4">
              <img 
                src={logo} 
                alt="Trendimo Logo" 
                className="h-16 w-auto"
              />
            </div>
            <p className="text-gray-600 mb-4">
              {footer.aboutText}
            </p>
            <div className="flex space-x-4">
              {socialLinks
                .filter(link => link.is_active)
                .sort((a, b) => a.display_order - b.display_order)
                .map((link) => (
                <a 
                  key={link.id}
                  href={link.url} 
                  className="text-gray-600 hover:text-primary transition-colors" 
                  aria-label={link.platform}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {iconComponents[link.icon] || link.platform}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links - Redesigned as pills/buttons */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-gray-800">{footer.quickLinks}</h3>
            <div className="flex flex-wrap gap-2">
              <Link to="/" className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm transition-colors">
                {nav.home}
              </Link>
              <Link to="/properties" className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm transition-colors">
                {nav.properties}
              </Link>
              <Link to="/services" className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm transition-colors">
                {nav.services}
              </Link>
              <Link to="/sell" className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm transition-colors">
                {nav.sell}
              </Link>
              <Link to="/about" className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm transition-colors">
                {nav.about}
              </Link>
              <Link to="/careers" className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm transition-colors">
                {nav.careers}
              </Link>
              <Link to="/blog" className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm transition-colors">
                {nav.blog}
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-gray-800">{footer.contact.title}</h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <MapPin className="h-5 w-5 mr-3 mt-0.5 flex-shrink-0 text-gray-600" />
                <span className="text-gray-600">{footer.contact.address}</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 mr-3 text-gray-600" />
                <span className="text-gray-600">{footer.contact.phone}</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 mr-3 text-gray-600" />
                <a href={`mailto:${footer.contact.email}`} className="text-gray-600 hover:text-gray-800 transition-colors">
                  {footer.contact.email}
                </a>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-gray-800">{footer.newsletter.title}</h3>
            <div className="flex">
              <Input
                type="email"
                placeholder={footer.newsletter.placeholder}
                className="bg-white border-gray-300 text-gray-800 focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <Button className="ml-2 bg-red-600 hover:bg-red-700 text-white">
                {footer.newsletter.buttonText}
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 mt-6 border-t border-gray-200 flex flex-col md:flex-row justify-between">
          <div className="text-gray-600 mb-4 md:mb-0">
            © 2025 Trendimo. {footer.copyright.split('© 2023 Trendimo. ')[1] || 'Всички права запазени.'}
          </div>
          <div className="flex space-x-6">
            <Link to="/terms" className="text-gray-600 hover:text-gray-800 transition-colors">
              {footer.terms}
            </Link>
            <Link to="/privacy" className="text-gray-600 hover:text-gray-800 transition-colors">
              {footer.privacy}
            </Link>
            <Link to="/cookies" className="text-gray-600 hover:text-gray-800 transition-colors">
              {footer.cookies}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

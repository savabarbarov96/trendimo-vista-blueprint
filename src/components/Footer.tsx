
import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { siteContent } from '../data/content';

const Footer = () => {
  const { footer, nav } = siteContent;

  return (
    <footer className="bg-neutral-dark text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">{siteContent.company.name}</h3>
            <p className="text-gray-300 mb-4">
              {footer.aboutText}
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" className="text-white hover:text-secondary" aria-label="Facebook">
                <Facebook />
              </a>
              <a href="https://instagram.com" className="text-white hover:text-secondary" aria-label="Instagram">
                <Instagram />
              </a>
              <a href="https://twitter.com" className="text-white hover:text-secondary" aria-label="Twitter">
                <Twitter />
              </a>
              <a href="https://linkedin.com" className="text-white hover:text-secondary" aria-label="LinkedIn">
                <Linkedin />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">{footer.quickLinks}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">
                  {nav.home}
                </Link>
              </li>
              <li>
                <Link to="/properties" className="text-gray-300 hover:text-white transition-colors">
                  {nav.properties}
                </Link>
              </li>
              <li>
                <Link to="/sell" className="text-gray-300 hover:text-white transition-colors">
                  {nav.sell}
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors">
                  {nav.about}
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-gray-300 hover:text-white transition-colors">
                  {nav.careers}
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-300 hover:text-white transition-colors">
                  {nav.blog}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">{footer.contact.title}</h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <MapPin className="h-5 w-5 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">{footer.contact.address}</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 mr-3" />
                <span className="text-gray-300">{footer.contact.phone}</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 mr-3" />
                <a href={`mailto:${footer.contact.email}`} className="text-gray-300 hover:text-white transition-colors">
                  {footer.contact.email}
                </a>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-bold mb-4">{footer.newsletter.title}</h3>
            <div className="flex">
              <Input
                type="email"
                placeholder={footer.newsletter.placeholder}
                className="bg-gray-700 border-gray-600 text-white"
              />
              <Button className="ml-2 bg-secondary hover:bg-secondary-dark">
                {footer.newsletter.buttonText}
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 mb-4 md:mb-0">
            {footer.copyright}
          </div>
          <div className="flex space-x-6">
            <Link to="/terms" className="text-gray-400 hover:text-white transition-colors">
              {footer.terms}
            </Link>
            <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">
              {footer.privacy}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

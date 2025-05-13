
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, User, Heart, LogIn, LogOut } from 'lucide-react';
import { Button } from './ui/button';
import { siteContent } from '../data/content';
import { useAuth } from '@/hooks/use-auth';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { nav } = siteContent;
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleAuthAction = () => {
    if (user) {
      signOut();
    } else {
      navigate('/auth');
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <span className="text-2xl font-bold text-primary">{siteContent.company.name}</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8">
          <Link to="/" className="text-neutral-dark hover:text-primary transition-colors font-play">
            {nav.home}
          </Link>
          <Link to="/properties" className="text-neutral-dark hover:text-primary transition-colors font-play">
            {nav.properties}
          </Link>
          <Link to="/sell" className="text-neutral-dark hover:text-primary transition-colors font-play">
            {nav.sell}
          </Link>
          <Link to="/about" className="text-neutral-dark hover:text-primary transition-colors font-play">
            {nav.about}
          </Link>
          <Link to="/services" className="text-neutral-dark hover:text-primary transition-colors font-play">
            {nav.services}
          </Link>
          <Link to="/blog" className="text-neutral-dark hover:text-primary transition-colors font-play">
            {nav.blog}
          </Link>
        </div>

        {/* User Actions */}
        <div className="hidden md:flex items-center space-x-4">
          <Button variant="ghost" size="icon">
            <Heart className="h-5 w-5" />
          </Button>
          {user ? (
            <Button variant="ghost" size="icon" onClick={() => navigate('/profile')}>
              <User className="h-5 w-5" />
            </Button>
          ) : null}
          <Button className="bg-primary hover:bg-primary-dark" onClick={handleAuthAction}>
            {user ? (
              <>
                <LogOut className="mr-2 h-4 w-4" />
                Изход
              </>
            ) : (
              <>
                <LogIn className="mr-2 h-4 w-4" />
                Вход
              </>
            )}
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={toggleMenu}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t py-4 px-4 animate-fade-in">
          <div className="flex flex-col space-y-4">
            <Link to="/" className="text-neutral-dark hover:text-primary py-2 font-play"
                  onClick={() => setIsMenuOpen(false)}>
              {nav.home}
            </Link>
            <Link to="/properties" className="text-neutral-dark hover:text-primary py-2 font-play"
                  onClick={() => setIsMenuOpen(false)}>
              {nav.properties}
            </Link>
            <Link to="/sell" className="text-neutral-dark hover:text-primary py-2 font-play"
                  onClick={() => setIsMenuOpen(false)}>
              {nav.sell}
            </Link>
            <Link to="/about" className="text-neutral-dark hover:text-primary py-2 font-play"
                  onClick={() => setIsMenuOpen(false)}>
              {nav.about}
            </Link>
            <Link to="/services" className="text-neutral-dark hover:text-primary py-2 font-play"
                  onClick={() => setIsMenuOpen(false)}>
              {nav.services}
            </Link>
            <Link to="/blog" className="text-neutral-dark hover:text-primary py-2 font-play"
                  onClick={() => setIsMenuOpen(false)}>
              {nav.blog}
            </Link>
            <Button className="bg-primary hover:bg-primary-dark w-full" onClick={handleAuthAction}>
              {user ? (
                <>
                  <LogOut className="mr-2 h-4 w-4" />
                  Изход
                </>
              ) : (
                <>
                  <LogIn className="mr-2 h-4 w-4" />
                  Вход
                </>
              )}
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;

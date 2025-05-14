
import React from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, User } from "lucide-react";
import logo from "../assets/trendimo-logo.svg";

const mainNavItems = [
  { title: "Начало", href: "/" },
  { title: "Имоти", href: "/properties" },
  { title: "Услуги", href: "/services" },
  { title: "Продай", href: "/sell" },
  { title: "За нас", href: "/about" },
  { title: "Кариери", href: "/careers" },
  { title: "Блог", href: "/blog" },
];

const Navbar = () => {
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Check if user exists to determine authentication status
  const isAuthenticated = !!user;
  const isAdmin = profile?.role === 'admin';

  const handleSignout = async () => {
    await signOut();
    navigate("/auth");
  };

  return (
    <div className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <img src={logo} alt="Trendimo Logo" width="40" height="40" />
          <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent transform hover:scale-105 transition-transform duration-300">
            Trendimo
          </span>
        </Link>
        <div className="hidden md:flex items-center space-x-4">
          {mainNavItems.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 hover:bg-blue-50 ${
                  isActive 
                    ? "text-primary border-b-2 border-primary shadow-sm" 
                    : "text-gray-700 hover:text-primary"
                }`
              }
            >
              {item.title}
            </NavLink>
          ))}
        </div>
        {isAuthenticated ? (
          <div className="hidden md:flex items-center space-x-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="flex items-center gap-2">
                  <User size={16} />
                  <span className="max-w-[150px] truncate">{profile?.full_name || user?.email}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Моят акаунт</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onSelect={() => navigate('/profile')}>
                  Профил
                </DropdownMenuItem>
                {isAdmin && (
                  <DropdownMenuItem onSelect={() => navigate('/admin')}>
                    Администрация
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onSelect={handleSignout}>
                  Изход
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : location.pathname === "/auth" ? null : (
          <div className="hidden md:flex items-center space-x-2">
            <Link to="/auth">
              <Button 
                variant="secondary" 
                className="bg-primary hover:bg-primary-dark text-white font-medium shadow-md hover:shadow-lg transition-all" 
                size="sm"
              >
                Вход
              </Button>
            </Link>
          </div>
        )}
        <Sheet>
          <SheetTrigger className="md:hidden">
            <Menu className="h-6 w-6" />
          </SheetTrigger>
          <SheetContent side="left" className="sm:w-2/3 md:w-1/2">
            <SheetHeader className="text-left">
              <SheetTitle>Меню</SheetTitle>
              <SheetDescription>Разгледайте нашите предложения.</SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              {mainNavItems.map((item) => (
                <NavLink
                  key={item.href}
                  to={item.href}
                  className={({ isActive }) =>
                    `block p-2 rounded-md text-sm font-medium transition-all duration-200 hover:bg-blue-50 ${
                      isActive ? "text-primary bg-blue-50 font-bold" : "text-gray-700 hover:text-primary"
                    }`
                  }
                >
                  {item.title}
                </NavLink>
              ))}
              {isAuthenticated ? (
                <>
                  <Link to="/profile">
                    <Button variant="ghost" size="sm" className="w-full justify-start">
                      Профил
                    </Button>
                  </Link>
                  {isAdmin && (
                    <Link to="/admin">
                      <Button variant="ghost" size="sm" className="w-full justify-start">
                        Администрация
                      </Button>
                    </Link>
                  )}
                  <Button variant="outline" size="sm" className="w-full justify-start" onClick={handleSignout}>
                    Изход
                  </Button>
                </>
              ) : location.pathname === "/auth" ? null : (
                <Link to="/auth">
                  <Button 
                    variant="secondary" 
                    size="sm" 
                    className="w-full justify-start bg-primary text-white hover:bg-primary-dark shadow-md"
                  >
                    Вход
                  </Button>
                </Link>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default Navbar;

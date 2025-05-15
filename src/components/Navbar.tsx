
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
    <div className="bg-black/95 backdrop-blur-sm border-b border-neutral-800 sticky top-0 z-50 shadow-sm">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <img src={logo} alt="Trendimo Logo" width="40" height="40" />
          <span className="text-xl font-bold bg-gradient-to-r from-rose-500 to-primary-light bg-clip-text text-transparent transform hover:scale-105 transition-transform duration-300">
            Trendimo
          </span>
        </Link>
        <div className="hidden md:flex items-center space-x-4">
          {mainNavItems.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 hover:bg-neutral-800 ${
                  isActive 
                    ? "text-rose-500 border-b-2 border-rose-500 shadow-sm" 
                    : "text-gray-300 hover:text-white"
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
                <Button variant="ghost" size="sm" className="flex items-center gap-2 text-white">
                  <User size={16} />
                  <span className="max-w-[150px] truncate">{profile?.full_name || user?.email}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-neutral-800 border-neutral-700 text-white">
                <DropdownMenuLabel>Моят акаунт</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-neutral-700" />
                <DropdownMenuItem onSelect={() => navigate('/profile')} className="hover:bg-neutral-700">
                  Профил
                </DropdownMenuItem>
                {isAdmin && (
                  <DropdownMenuItem onSelect={() => navigate('/admin')} className="hover:bg-neutral-700">
                    Администрация
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator className="bg-neutral-700" />
                <DropdownMenuItem onSelect={handleSignout} className="hover:bg-neutral-700">
                  Изход
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : location.pathname === "/auth" ? null : (
          <div className="hidden md:flex items-center space-x-2">
            <Link to="/auth">
              <Button 
                variant="default" 
                className="bg-rose-600 hover:bg-rose-700 text-white font-medium shadow-md hover:shadow-lg transition-all" 
                size="sm"
              >
                Вход
              </Button>
            </Link>
          </div>
        )}
        <Sheet>
          <SheetTrigger className="md:hidden">
            <Menu className="h-6 w-6 text-white" />
          </SheetTrigger>
          <SheetContent side="left" className="sm:w-2/3 md:w-1/2 bg-neutral-900 text-white border-neutral-800">
            <SheetHeader className="text-left">
              <SheetTitle className="text-white">Меню</SheetTitle>
              <SheetDescription className="text-gray-400">Разгледайте нашите предложения.</SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              {mainNavItems.map((item) => (
                <NavLink
                  key={item.href}
                  to={item.href}
                  className={({ isActive }) =>
                    `block p-2 rounded-md text-sm font-medium transition-all duration-200 hover:bg-neutral-800 ${
                      isActive ? "text-rose-500 bg-neutral-800 font-bold" : "text-gray-300 hover:text-white"
                    }`
                  }
                >
                  {item.title}
                </NavLink>
              ))}
              {isAuthenticated ? (
                <>
                  <NavLink to="/profile" className={({ isActive }) =>
                    `block p-2 rounded-md text-sm font-medium transition-all duration-200 hover:bg-neutral-800 ${
                      isActive ? "text-rose-500 bg-neutral-800 font-bold" : "text-gray-300 hover:text-white"
                    }`
                  }>
                    Профил
                  </NavLink>
                  {isAdmin && (
                    <NavLink to="/admin" className={({ isActive }) =>
                      `block p-2 rounded-md text-sm font-medium transition-all duration-200 hover:bg-neutral-800 ${
                        isActive ? "text-rose-500 bg-neutral-800 font-bold" : "text-gray-300 hover:text-white"
                      }`
                    }>
                      Администрация
                    </NavLink>
                  )}
                  <Button variant="outline" size="sm" className="w-full justify-start border-neutral-700 text-white hover:bg-neutral-800" onClick={handleSignout}>
                    Изход
                  </Button>
                </>
              ) : location.pathname === "/auth" ? null : (
                <Link to="/auth">
                  <Button 
                    variant="default" 
                    size="sm" 
                    className="w-full justify-start bg-rose-600 text-white hover:bg-rose-700 shadow-md"
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

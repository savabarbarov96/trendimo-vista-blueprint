
import React from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
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
  { title: "За нас", href: "/about" },
  { title: "Контакт", href: "/contact" },
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
    <div className="bg-white sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center space-x-2">
          <img src={logo} alt="Trendimo Logo" width="40" height="40" />
          <span className="text-xl font-bold text-secondary">
            Trendimo
          </span>
        </Link>
        
        <div className="hidden md:flex items-center space-x-8">
          {mainNavItems.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              className={({ isActive }) =>
                `px-1 py-2 text-sm font-medium transition-all duration-200 border-b-2 ${
                  isActive 
                    ? "text-primary border-primary" 
                    : "text-secondary border-transparent hover:text-primary hover:border-primary/30"
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
          <div className="hidden md:block">
            <Button 
              variant="modern" 
              size="sm"
              className="rounded-full px-6"
              onClick={() => navigate("/auth")}
            >
              Започнете търсенето!
            </Button>
          </div>
        )}
        
        <Sheet>
          <SheetTrigger className="md:hidden">
            <Menu className="h-6 w-6" />
          </SheetTrigger>
          <SheetContent side="left" className="sm:w-2/3 md:w-1/2">
            <SheetHeader className="text-left">
              <SheetTitle>Меню</SheetTitle>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              {mainNavItems.map((item) => (
                <NavLink
                  key={item.href}
                  to={item.href}
                  className={({ isActive }) =>
                    `block p-2 rounded-md text-sm font-medium transition-all duration-200 hover:bg-neutral-light ${
                      isActive ? "text-primary bg-neutral-light font-bold" : "text-secondary hover:text-primary"
                    }`
                  }
                >
                  {item.title}
                </NavLink>
              ))}
              {isAuthenticated ? (
                <>
                  <NavLink to="/profile" className={({ isActive }) =>
                    `block p-2 rounded-md text-sm font-medium transition-all duration-200 hover:bg-neutral-light ${
                      isActive ? "text-primary bg-neutral-light font-bold" : "text-secondary hover:text-primary"
                    }`
                  }>
                    Профил
                  </NavLink>
                  {isAdmin && (
                    <NavLink to="/admin" className={({ isActive }) =>
                      `block p-2 rounded-md text-sm font-medium transition-all duration-200 hover:bg-neutral-light ${
                        isActive ? "text-primary bg-neutral-light font-bold" : "text-secondary hover:text-primary"
                      }`
                    }>
                      Администрация
                    </NavLink>
                  )}
                  <Button variant="outline" size="sm" className="w-full justify-start" onClick={handleSignout}>
                    Изход
                  </Button>
                </>
              ) : location.pathname === "/auth" ? null : (
                <Link to="/auth">
                  <Button 
                    variant="modern" 
                    size="sm" 
                    className="w-full justify-start"
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

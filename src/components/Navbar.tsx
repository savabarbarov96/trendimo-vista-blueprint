
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
import { Menu } from "lucide-react";
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
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Check if user exists to determine authentication status
  const isAuthenticated = !!user;

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
        <div className="hidden md:flex items-center space-x-6">
          {mainNavItems.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors hover:text-primary ${
                  isActive ? "text-primary font-bold" : "text-muted-foreground"
                }`
              }
            >
              {item.title}
            </NavLink>
          ))}
        </div>
        {isAuthenticated ? (
          <div className="hidden md:flex items-center space-x-2">
            <Link to="/profile">
              <Button variant="ghost" size="sm">
                {user?.email}
              </Button>
            </Link>
            <Button variant="outline" size="sm" onClick={handleSignout}>
              Изход
            </Button>
          </div>
        ) : location.pathname === "/auth" ? null : (
          <div className="hidden md:flex items-center space-x-2">
            <Link to="/auth">
              <Button variant="secondary" className="bg-primary text-white hover:bg-primary-dark transition-colors" size="sm">
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
                    `block text-sm font-medium transition-colors hover:text-primary ${
                      isActive ? "text-primary font-bold" : "text-muted-foreground"
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
                      {user?.email}
                    </Button>
                  </Link>
                  <Button variant="outline" size="sm" className="w-full justify-start" onClick={handleSignout}>
                    Изход
                  </Button>
                </>
              ) : location.pathname === "/auth" ? null : (
                <Link to="/auth">
                  <Button variant="secondary" size="sm" className="w-full justify-start bg-primary text-white hover:bg-primary-dark">
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

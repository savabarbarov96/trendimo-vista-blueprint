
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
    <div className="bg-background border-b">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <img src={logo} alt="Trendimo Logo" width="40" height="40" />
          <span className="font-bold">Trendimo</span>
        </Link>
        <div className="hidden md:flex items-center space-x-6">
          {mainNavItems.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors hover:text-foreground/80 ${
                  isActive ? "text-foreground" : "text-muted-foreground"
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
              <Button variant="outline" size="sm">
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
                    `block text-sm font-medium transition-colors hover:text-foreground/80 ${
                      isActive ? "text-foreground" : "text-muted-foreground"
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
                  <Button variant="outline" size="sm" className="w-full justify-start">
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

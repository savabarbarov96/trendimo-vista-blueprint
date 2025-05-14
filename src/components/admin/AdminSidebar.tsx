
import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Home,
  MessageSquare,
  FileText,
  Briefcase,
  Settings,
  ChevronLeft,
  ChevronRight,
  Building2,
  MenuSquare
} from 'lucide-react';
import { cn } from '@/lib/utils';
import logo from '../../assets/trendimo-logo.svg';

const AdminSidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  const navItems = [
    { name: 'Табло', path: '/admin', icon: LayoutDashboard },
    { name: 'Потребители', path: '/admin/users', icon: Users },
    { name: 'Имоти', path: '/admin/properties', icon: Home },
    { name: 'Запитвания', path: '/admin/inquiries', icon: MessageSquare },
    { name: 'Заявки за продажба', path: '/admin/sell-requests', icon: Building2 },
    { name: 'Блог', path: '/admin/blog', icon: FileText },
    { name: 'Кариери', path: '/admin/careers', icon: Briefcase },
    { name: 'Услуги', path: '/admin/services', icon: MenuSquare },
    { name: 'Настройки', path: '/admin/settings', icon: Settings },
  ];

  return (
    <div className={cn(
      'bg-white border-r border-gray-200 transition-all duration-300 flex flex-col',
      collapsed ? 'w-[70px]' : 'w-[250px]'
    )}>
      {/* Logo and collapse button */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Trendimo Logo" className="h-8 w-8" />
          {!collapsed && (
            <span className="text-lg font-semibold bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
              Trendimo
            </span>
          )}
        </Link>
        <button 
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 rounded-md hover:bg-gray-100"
          type="button"
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>
      
      {/* Navigation links */}
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-3">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) => cn(
                  'flex items-center gap-3 px-3 py-2 rounded-md transition-colors',
                  isActive 
                    ? 'bg-primary text-white' 
                    : 'text-gray-700 hover:bg-gray-100',
                )}
                end={item.path === '/admin'}
              >
                <item.icon size={20} />
                {!collapsed && <span>{item.name}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      
      {/* Back to site */}
      <div className="p-4 border-t border-gray-200">
        <Link
          to="/"
          className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
        >
          <Home size={18} />
          {!collapsed && <span>Към сайта</span>}
        </Link>
      </div>
    </div>
  );
};

export default AdminSidebar;

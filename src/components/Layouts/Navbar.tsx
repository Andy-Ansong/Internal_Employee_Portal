import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import Employee from "@/model/Employee";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Calendar, 
  Users, 
  Settings, 
  LogOut, 
  Menu,
  User,
  UserPlus
} from 'lucide-react';
import axios from 'axios';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<Employee|null>(null);
  const location = useLocation();

  const navItems = [
    { name: 'Profile', to: '/profile', icon: User },
    { name: 'Events', to: '/events', icon: Calendar },
    { name: 'Employees', to: '/employees', icon: Users },
    { name: 'Add Employee', to: '/addEmployee', icon: UserPlus },
  ];

  const isActive = (pathname: string) => location.pathname === pathname;

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await axios.get("http://localhost:3030/api/v1/employees/671541521bc9fe23dc8a3d79");
        setCurrentUser(response.data.employee);
      } catch (error) {
        console.error("Failed to fetch current user", error);
      }
    };
    fetchCurrentUser();
  }, []);

  useEffect(() => {
    setIsOpen(false)
  }, [location])

  return (
    <nav className="bg-background border-b bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/profile" className="flex-shrink-0">
              <div className="flex items-center px-5">
                <Avatar>
                  <AvatarImage className='object-cover' src={currentUser?.image} alt="User avatar" />
                  <AvatarFallback></AvatarFallback>
                </Avatar>
                <div className="ml-3">
                  <div className="text-base font-medium">{currentUser ? currentUser?.name : 'Loading...'}</div>
                </div>
              </div>
            </Link>
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-4">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.to}
                    className={`${
                      isActive(item.to)
                        ? 'bg-primary text-blue-600'
                        : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                    } px-3 py-2 rounded-md text-sm font-medium`}
                  >
                    <item.icon className="inline-block w-4 h-4 mr-2 relative bottom-[2px]" />
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="ml-3 relative">
                    <Menu className="h-6 w-6" aria-hidden="true" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <Button className="hover:bg-white" variant="ghost" onClick={() => setIsOpen(!isOpen)}>
              <Menu className="h-6 w-6" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden border border-t-[#d0d5d0] bg-white absolute w-full z-[10] shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.to}
                className={`${
                  isActive(item.to)
                    ? 'bg-primary text-blue-600'
                    : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                } block px-3 py-2 rounded-md text-base font-medium`}
              >
                <item.icon className="inline-block w-4 h-4 mr-2" />
                {item.name}
              </Link>
            ))}
          </div>
          <div className="pb-3 border-t border-muted">
            <div className="mt-3 px-2 space-y-1">
              <Button variant="ghost" className="hover:bg-white hover:shadow-none block w-full text-left px-3 py-2">
                <LogOut className="inline-block w-4 h-4 mr-2" />
                  Logout
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

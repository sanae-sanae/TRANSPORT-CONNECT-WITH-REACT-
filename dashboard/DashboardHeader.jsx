import React, { useState, useEffect } from 'react';
import { 
  BellIcon, 
  MagnifyingGlassIcon, 
  ChevronDownIcon, 
  ChartBarIcon,
  TruckIcon,
  UserGroupIcon,
  CurrencyDollarIcon,
  ArrowTrendingUpIcon
} from '@heroicons/react/24/outline';
import NotificationBell from '../notifications/NotificationBell';
import Lottie from 'lottie-react';
import truckDriving from '../../assets/animations/truck-driving.json';

const DashboardHeader = ({ user, onSearch, onNotificationClick, onProfileClick }) => {
  const [timeGreeting, setTimeGreeting] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setTimeGreeting('Bonjour');
    else if (hour < 18) setTimeGreeting('Bon après-midi');
    else setTimeGreeting('Bonsoir');
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <div className="bg-gradient-to-r from-indigo-700 to-purple-800 rounded-2xl shadow-xl p-6 text-white">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div className="flex items-center mb-6 md:mb-0">
          <div className="w-16 h-16 mr-4">
            <Lottie animationData={truckDriving} loop={true} />
          </div>
          <div>
            <h1 className="text-2xl font-bold">{timeGreeting}, {user.name} 👋</h1>
            <p className="text-indigo-200">Voici votre tableau de bord</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4 w-full md:w-auto">
          <form onSubmit={handleSearch} className="relative flex-1 md:flex-none">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-indigo-300" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2.5 w-full rounded-xl bg-indigo-600 text-white placeholder-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:bg-indigo-500 transition-all"
              placeholder="Rechercher..."
            />
          </form>
          
          <NotificationBell 
            count={5} 
            onClick={onNotificationClick} 
            className="text-white"
          />
          
          <div className="relative group">
            <button 
              onClick={onProfileClick}
              className="flex items-center space-x-2 focus:outline-none"
            >
              <div className="w-10 h-10 rounded-full bg-indigo-500 border-2 border-white flex items-center justify-center">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-6 h-6" />
              </div>
              <ChevronDownIcon className="h-5 w-5 text-indigo-200 group-hover:text-white transition-colors" />
            </button>
            
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2 z-10">
              <div className="p-4 border-b border-gray-100">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                    <div className="bg-gray-200 border-2 border-dashed rounded-xl w-8 h-8" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">{user.name}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                </div>
              </div>
              <div className="p-2">
                <button className="w-full text-left px-4 py-3 text-gray-700 hover:bg-indigo-50 rounded-lg transition-colors">
                  Mon profil
                </button>
                <button className="w-full text-left px-4 py-3 text-gray-700 hover:bg-indigo-50 rounded-lg transition-colors">
                  Paramètres
                </button>
                <button className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                  Déconnexion
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-indigo-200 text-sm">Revenu total</p>
              <p className="text-2xl font-bold mt-1">12,450 MAD</p>
            </div>
            <div className="p-2 bg-white/20 rounded-lg">
              <CurrencyDollarIcon className="h-6 w-6 text-white" />
            </div>
          </div>
          <div className="flex items-center mt-3">
            <ArrowTrendingUpIcon className="h-4 w-4 text-green-400 mr-1" />
            <span className="text-green-400 text-sm font-medium">+24.5%</span>
            <span className="text-indigo-200 text-sm ml-2">depuis le mois dernier</span>
          </div>
        </div>
        
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-indigo-200 text-sm">Annonces actives</p>
              <p className="text-2xl font-bold mt-1">8</p>
            </div>
            <div className="p-2 bg-white/20 rounded-lg">
              <TruckIcon className="h-6 w-6 text-white" />
            </div>
          </div>
          <div className="flex items-center mt-3">
            <ArrowTrendingUpIcon className="h-4 w-4 text-green-400 mr-1" />
            <span className="text-green-400 text-sm font-medium">+2</span>
            <span className="text-indigo-200 text-sm ml-2">cette semaine</span>
          </div>
        </div>
        
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-indigo-200 text-sm">Demandes en cours</p>
              <p className="text-2xl font-bold mt-1">14</p>
            </div>
            <div className="p-2 bg-white/20 rounded-lg">
              <UserGroupIcon className="h-6 w-6 text-white" />
            </div>
          </div>
          <div className="flex items-center mt-3">
            <ArrowTrendingUpIcon className="h-4 w-4 text-green-400 mr-1" />
            <span className="text-green-400 text-sm font-medium">+5</span>
            <span className="text-indigo-200 text-sm ml-2">aujourd'hui</span>
          </div>
        </div>
        
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-indigo-200 text-sm">Taux d'acceptation</p>
              <p className="text-2xl font-bold mt-1">92%</p>
            </div>
            <div className="p-2 bg-white/20 rounded-lg">
              <ChartBarIcon className="h-6 w-6 text-white" />
            </div>
          </div>
          <div className="flex items-center mt-3">
            <ArrowTrendingUpIcon className="h-4 w-4 text-green-400 mr-1" />
            <span className="text-green-400 text-sm font-medium">+8.2%</span>
            <span className="text-indigo-200 text-sm ml-2">ce mois-ci</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
import React from 'react';
import { 
  ArrowTrendingUpIcon, 
  ArrowTrendingDownIcon,
  TruckIcon,
  MapPinIcon,
  CubeIcon,
  ClockIcon,
  CheckCircleIcon,
  CurrencyDollarIcon
} from '@heroicons/react/24/outline';

const StatCard = ({ title, value, change, isPositive, icon, color }) => {
  return (
    <div className={`bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg p-6 border border-gray-100 transition-all hover:shadow-xl hover:-translate-y-1`}>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-500 text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
        </div>
        <div className={`p-3 rounded-xl ${color}`}>
          {icon}
        </div>
      </div>
      
      <div className={`flex items-center mt-4 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
        {isPositive ? (
          <ArrowTrendingUpIcon className="h-5 w-5 mr-1" />
        ) : (
          <ArrowTrendingDownIcon className="h-5 w-5 mr-1" />
        )}
        <span className="font-medium">{change}</span>
        <span className="text-gray-500 text-sm ml-2">depuis le mois dernier</span>
      </div>
    </div>
  );
};

const StatsGrid = () => {
  const stats = [
    {
      title: "Annonces publiées",
      value: "24",
      change: "+12%",
      isPositive: true,
      icon: <TruckIcon className="h-6 w-6 text-indigo-600" />,
      color: "bg-indigo-100"
    },
    {
      title: "Trajets effectués",
      value: "18",
      change: "+5%",
      isPositive: true,
      icon: <MapPinIcon className="h-6 w-6 text-green-600" />,
      color: "bg-green-100"
    },
    {
      title: "Colis transportés",
      value: "142",
      change: "+28%",
      isPositive: true,
      icon: <CubeIcon className="h-6 w-6 text-amber-600" />,
      color: "bg-amber-100"
    },
    {
      title: "Temps moyen",
      value: "3.2 jours",
      change: "-0.8 jours",
      isPositive: true,
      icon: <ClockIcon className="h-6 w-6 text-blue-600" />,
      color: "bg-blue-100"
    },
    {
      title: "Demandes acceptées",
      value: "92%",
      change: "+4.2%",
      isPositive: true,
      icon: <CheckCircleIcon className="h-6 w-6 text-emerald-600" />,
      color: "bg-emerald-100"
    },
    {
      title: "Revenu total",
      value: "42,850 MAD",
      change: "+24.5%",
      isPositive: true,
      icon: <CurrencyDollarIcon className="h-6 w-6 text-purple-600" />,
      color: "bg-purple-100"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      {stats.map((stat, index) => (
        <StatCard
          key={index}
          title={stat.title}
          value={stat.value}
          change={stat.change}
          isPositive={stat.isPositive}
          icon={stat.icon}
          color={stat.color}
        />
      ))}
    </div>
  );
};

export default StatsGrid;
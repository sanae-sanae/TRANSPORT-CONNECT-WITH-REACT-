import React from 'react';
import { 
  CheckCircleIcon, 
  TruckIcon, 
  UserIcon, 
  CurrencyDollarIcon,
  MapPinIcon,
  ClockIcon,
  ChatBubbleLeftRightIcon
} from '@heroicons/react/24/outline';

const ActivityItem = ({ type, user, action, time, isNew, status }) => {
  const getIcon = () => {
    switch (type) {
      case 'delivery':
        return <TruckIcon className="h-5 w-5 text-indigo-600" />;
      case 'request':
        return <UserIcon className="h-5 w-5 text-green-600" />;
      case 'payment':
        return <CurrencyDollarIcon className="h-5 w-5 text-amber-600" />;
      case 'message':
        return <ChatBubbleLeftRightIcon className="h-5 w-5 text-blue-600" />;
      default:
        return <CheckCircleIcon className="h-5 w-5 text-gray-600" />;
    }
  };

  const getColor = () => {
    switch (status) {
      case 'completed':
        return 'bg-emerald-100 text-emerald-800';
      case 'pending':
        return 'bg-amber-100 text-amber-800';
      case 'canceled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className={`relative flex pb-6 ${isNew ? 'border-l-2 border-indigo-500' : 'border-l-2 border-gray-200'}`}>
      {isNew && (
        <div className="absolute -left-1.5 top-0 w-3 h-3 rounded-full bg-indigo-500"></div>
      )}
      
      <div className="ml-4 flex-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className={`p-2 rounded-lg ${getColor().replace('text', 'bg').replace('bg', 'bg-opacity-20')}`}>
              {getIcon()}
            </div>
            <div className="ml-3">
              <h4 className="font-medium text-gray-900">{user}</h4>
              <p className="text-gray-600">{action}</p>
            </div>
          </div>
          
          {status && (
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getColor()}`}>
              {status === 'completed' ? 'Terminé' : 
               status === 'pending' ? 'En attente' : 
               status === 'canceled' ? 'Annulé' : ''}
            </span>
          )}
        </div>
        
        <div className="flex items-center mt-2 text-sm text-gray-500">
          <ClockIcon className="h-4 w-4 mr-1" />
          <span>{time}</span>
        </div>
      </div>
    </div>
  );
};

const ActivityFeed = () => {
  const activities = [
    {
      id: 1,
      type: 'request',
      user: 'Karim Benjelloun',
      action: 'a envoyé une demande pour votre trajet Casablanca-Rabat',
      time: 'Il y a 15 minutes',
      isNew: true,
      status: 'pending'
    },
    {
      id: 2,
      type: 'delivery',
      user: 'Trajet #TR-4892',
      action: 'a été marqué comme livré avec succès',
      time: 'Il y a 2 heures',
      isNew: true,
      status: 'completed'
    },
    {
      id: 3,
      type: 'payment',
      user: 'Paiement #PY-7821',
      action: 'a été traité avec succès (1,240 MAD)',
      time: 'Hier à 16:30',
      status: 'completed'
    },
    {
      id: 4,
      type: 'message',
      user: 'Fatima Zahra',
      action: 'vous a envoyé un nouveau message',
      time: 'Hier à 11:45',
      status: 'pending'
    },
    {
      id: 5,
      type: 'delivery',
      user: 'Trajet #TR-4876',
      action: 'a été annulé par le client',
      time: '24 juin 2025',
      status: 'canceled'
    },
    {
      id: 6,
      type: 'request',
      user: 'Ahmed Mansouri',
      action: 'a accepté votre offre pour le trajet Marrakech-Fès',
      time: '23 juin 2025',
      status: 'completed'
    }
  ];

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg p-6 border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-gray-900">Activités récentes</h3>
        <button className="text-indigo-600 hover:text-indigo-800 font-medium">
          Voir tout
        </button>
      </div>
      
      <div className="relative">
        {activities.map(activity => (
          <ActivityItem
            key={activity.id}
            type={activity.type}
            user={activity.user}
            action={activity.action}
            time={activity.time}
            isNew={activity.isNew}
            status={activity.status}
          />
        ))}
      </div>
    </div>
  );
};

export default ActivityFeed;
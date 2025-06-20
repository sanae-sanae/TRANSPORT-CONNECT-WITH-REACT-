import React, { useState } from 'react';
import { 
  TruckIcon, 
  MapPinIcon, 
  ClockIcon, 
  CurrencyDollarIcon,
  ArrowPathIcon,
  ChatBubbleLeftRightIcon
} from '@heroicons/react/24/outline';
import StatsGrid from '../../components/dashboard/StatsGrid';
import DashboardHeader from '../../components/dashboard/DashboardHeader';
import HoverCard from '../../components/ui/HoverCard';
import GradientButton from '../../components/ui/GradientButton';

const DriverDashboard = () => {
  const [stats, setStats] = useState([
    { id: 1, name: 'Annonces Actives', value: '8', change: '+2', icon: TruckIcon },
    { id: 2, name: 'Demandes Reçues', value: '12', change: '+4', icon: MapPinIcon },
    { id: 3, name: 'Taux Acceptation', value: '78%', change: '+3%', icon: ArrowPathIcon },
    { id: 4, name: 'Revenus Estimés', value: '9,600 DH', change: '+1,200 DH', icon: CurrencyDollarIcon }
  ]);

  const activeTrips = [
    { 
      id: 1, 
      from: 'Casablanca', 
      to: 'Marrakech', 
      status: 'En cours', 
      progress: 65,
      packages: 3,
      distance: '240 km',
      earnings: '1200 DH'
    },
    { 
      id: 2, 
      from: 'Rabat', 
      to: 'Fès', 
      status: 'En attente', 
      progress: 0,
      packages: 2,
      distance: '180 km',
      earnings: '800 DH'
    }
  ];

  const recentRequests = [
    { 
      id: 1, 
      from: 'Sophie Martin', 
      route: 'Casablanca → Marrakech', 
      packages: '2 colis (120kg)', 
      offer: '900 DH',
      time: 'Il y a 15 min'
    },
    { 
      id: 2, 
      from: 'Ahmed Khalid', 
      route: 'Rabat → Tanger', 
      packages: '1 colis (80kg)', 
      offer: '600 DH',
      time: 'Il y a 2h'
    }
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'En cours': return 'bg-green-100 text-green-800';
      case 'Terminé': return 'bg-blue-100 text-blue-800';
      case 'En attente': return 'bg-yellow-100 text-yellow-800';
      case 'Annulé': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <DashboardHeader title="Tableau de Bord Conducteur" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <StatsGrid stats={stats} />
        
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <HoverCard>
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800">Mes Trajets Actifs</h2>
                <GradientButton 
                  from="from-blue-600" 
                  to="to-indigo-700"
                  className="px-4 py-2"
                >
                  Nouveau Trajet
                </GradientButton>
              </div>
              
              <div className="space-y-6">
                {activeTrips.map(trip => (
                  <div key={trip.id} className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-bold">{trip.from} → {trip.to}</h3>
                        <div className="flex items-center mt-2">
                          <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(trip.status)}`}>
                            {trip.status}
                          </span>
                          <span className="ml-3 text-sm text-gray-600 flex items-center">
                            <TruckIcon className="h-4 w-4 mr-1" />
                            {trip.packages} colis
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-indigo-700">{trip.earnings}</div>
                        <div className="text-sm text-gray-600">{trip.distance}</div>
                      </div>
                    </div>
                    
                    {trip.progress > 0 && (
                      <div className="mt-4">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Progression</span>
                          <span>{trip.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full" 
                            style={{ width: `${trip.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                    
                    <div className="mt-5 flex space-x-3">
                      <button className="flex-1 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition">
                        Détails
                      </button>
                      <button className="flex-1 py-2 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-lg text-white font-medium shadow hover:shadow-md transition">
                        Suivre
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </HoverCard>
          
          <div className="space-y-8">
            <HoverCard>
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-800">Demandes Récentes</h2>
                  <button className="text-blue-600 font-medium hover:text-blue-800 transition">
                    Voir tout
                  </button>
                </div>
                
                <div className="space-y-5">
                  {recentRequests.map(request => (
                    <div key={request.id} className="flex items-start border-b border-gray-100 pb-5 last:border-0 last:pb-0">
                      <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10" />
                      <div className="ml-4 flex-1">
                        <div className="flex justify-between">
                          <h3 className="font-medium text-gray-900">{request.from}</h3>
                          <span className="text-sm text-gray-500">{request.time}</span>
                        </div>
                        <p className="text-gray-600 mt-1">{request.route}</p>
                        <div className="flex justify-between mt-2">
                          <span className="text-sm text-gray-500">{request.packages}</span>
                          <span className="font-medium">{request.offer}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 flex space-x-3">
                  <button className="flex-1 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition">
                    Refuser
                  </button>
                  <GradientButton 
                    from="from-green-600" 
                    to="to-emerald-700"
                    className="flex-1 py-2"
                  >
                    Accepter
                  </GradientButton>
                </div>
              </div>
            </HoverCard>
            
            <HoverCard>
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-800">Messages Réçus</h2>
                  <button className="text-blue-600 font-medium hover:text-blue-800 transition">
                    Voir tout
                  </button>
                </div>
                
                <div className="flex items-center p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-12 h-12" />
                  <div className="ml-4 flex-1">
                    <div className="flex justify-between">
                      <h3 className="font-medium text-gray-900">Sophie Martin</h3>
                      <span className="text-sm text-gray-500">10:24 AM</span>
                    </div>
                    <p className="text-gray-600 mt-1 truncate">Bonjour, je voudrais confirmer l'heure de livraison...</p>
                  </div>
                  <div className="ml-4 flex items-center justify-center w-8 h-8 bg-blue-500 text-white rounded-full">
                    3
                  </div>
                </div>
                
                <div className="mt-6">
                  <GradientButton 
                    from="from-indigo-600" 
                    to="to-purple-700"
                    className="w-full py-3 flex items-center justify-center"
                  >
                    <ChatBubbleLeftRightIcon className="h-5 w-5 mr-2" />
                    Ouvrir la messagerie
                  </GradientButton>
                </div>
              </div>
            </HoverCard>
          </div>
        </div>
        
        <div className="mt-8">
          <HoverCard>
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Historique des Trajets</h2>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trajet</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Colis</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenu</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">Casablanca → Marrakech</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">12/06/2025</div>
                        <div className="text-sm text-gray-500">8h - 12h</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">3 colis</div>
                        <div className="text-sm text-gray-500">120 kg</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                        1200 DH
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                          Terminé
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">Rabat → Tanger</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">10/06/2025</div>
                        <div className="text-sm text-gray-500">14h - 18h</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">2 colis</div>
                        <div className="text-sm text-gray-500">80 kg</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                        900 DH
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                          Terminé
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div className="mt-6 text-center">
                <button className="text-blue-600 font-medium hover:text-blue-800 transition">
                  Voir tout l'historique
                </button>
              </div>
            </div>
          </HoverCard>
        </div>
      </div>
    </div>
  );
};

export default DriverDashboard;
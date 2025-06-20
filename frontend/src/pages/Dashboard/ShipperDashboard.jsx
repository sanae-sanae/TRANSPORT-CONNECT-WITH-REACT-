import React, { useState } from 'react';
import { 
  CubeIcon, 
  CheckCircleIcon, 
  ClockIcon, 
  CurrencyDollarIcon,
  TruckIcon,
  MapPinIcon
} from '@heroicons/react/24/outline';
import StatsGrid from '../../components/dashboard/StatsGrid';
import DashboardHeader from '../../components/dashboard/DashboardHeader';
import HoverCard from '../../components/ui/HoverCard';
import GradientButton from '../../components/ui/GradientButton';

const ShipperDashboard = () => {
  const [stats, setStats] = useState([
    { id: 1, name: 'Colis Envoyés', value: '24', change: '+6', icon: CubeIcon },
    { id: 2, name: 'Livraisons Réussies', value: '18', change: '+3', icon: CheckCircleIcon },
    { id: 3, name: 'En Cours', value: '3', change: '-1', icon: ClockIcon },
    { id: 4, name: 'Dépenses Totales', value: '8,400 DH', change: '+1,200 DH', icon: CurrencyDollarIcon }
  ]);

  const shipments = [
    { 
      id: 1, 
      from: 'Casablanca', 
      to: 'Marrakech', 
      status: 'En transit', 
      carrier: 'Karim Benzema',
      deliveryDate: '15/06/2025',
      price: '1200 DH'
    },
    { 
      id: 2, 
      from: 'Rabat', 
      to: 'Fès', 
      status: 'En attente', 
      carrier: 'Transport Express',
      deliveryDate: '17/06/2025',
      price: '800 DH'
    },
    { 
      id: 3, 
      from: 'Tanger', 
      to: 'Agadir', 
      status: 'Livré', 
      carrier: 'Logistique Pro',
      deliveryDate: '10/06/2025',
      price: '2500 DH'
    }
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'En transit': return 'bg-blue-100 text-blue-800';
      case 'Livré': return 'bg-green-100 text-green-800';
      case 'En attente': return 'bg-yellow-100 text-yellow-800';
      case 'Annulé': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <DashboardHeader title="Tableau de Bord Expéditeur" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <StatsGrid stats={stats} />
        
        <div className="mt-8">
          <HoverCard>
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800">Mes Expéditions</h2>
                <GradientButton 
                  from="from-blue-600" 
                  to="to-indigo-700"
                  className="px-4 py-2"
                >
                  Nouvelle Expédition
                </GradientButton>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">De</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">À</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transporteur</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Livraison</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prix</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {shipments.map(shipment => (
                      <tr key={shipment.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <MapPinIcon className="h-5 w-5 text-red-500 mr-2" />
                            <div className="text-sm font-medium text-gray-900">{shipment.from}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <MapPinIcon className="h-5 w-5 text-green-500 mr-2" />
                            <div className="text-sm font-medium text-gray-900">{shipment.to}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{shipment.carrier}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {shipment.deliveryDate}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {shipment.price}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(shipment.status)}`}>
                            {shipment.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="mt-6 text-center">
                <button className="text-blue-600 font-medium hover:text-blue-800 transition">
                  Voir toutes les expéditions
                </button>
              </div>
            </div>
          </HoverCard>
        </div>
        
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <HoverCard>
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800">Trajets Disponibles</h2>
                <button className="text-blue-600 font-medium hover:text-blue-800 transition">
                  Voir tout
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-bold">Casablanca → Marrakech</h3>
                      <div className="flex items-center mt-2">
                        <TruckIcon className="h-4 w-4 text-gray-500 mr-2" />
                        <span className="text-sm text-gray-600">Transport Pro</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-indigo-700">1200 DH</div>
                      <div className="text-sm text-gray-600">Aujourd'hui, 14h</div>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-sm">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded mr-2">Disponible</span>
                    <span>Capacité: 500kg</span>
                  </div>
                  <div className="mt-4">
                    <GradientButton 
                      from="from-blue-600" 
                      to="to-indigo-700"
                      className="w-full py-2"
                    >
                      Réserver maintenant
                    </GradientButton>
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-bold">Rabat → Tanger</h3>
                      <div className="flex items-center mt-2">
                        <TruckIcon className="h-4 w-4 text-gray-500 mr-2" />
                        <span className="text-sm text-gray-600">Fast Logistics</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-indigo-700">800 DH</div>
                      <div className="text-sm text-gray-600">Demain, 10h</div>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-sm">
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded mr-2">Disponible</span>
                    <span>Capacité: 300kg</span>
                  </div>
                  <div className="mt-4">
                    <GradientButton 
                      from="from-blue-600" 
                      to="to-indigo-700"
                      className="w-full py-2"
                    >
                      Réserver maintenant
                    </GradientButton>
                  </div>
                </div>
              </div>
            </div>
          </HoverCard>
          
          <HoverCard>
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800">Transporteurs Favoris</h2>
                <button className="text-blue-600 font-medium hover:text-blue-800 transition">
                  Voir tout
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center p-4 border border-gray-200 rounded-xl hover:shadow-md transition">
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
                  <div className="ml-4 flex-1">
                    <div className="flex justify-between">
                      <h3 className="font-bold">Karim Benzema</h3>
                      <div className="flex text-yellow-400">
                        {'★'.repeat(5)}
                      </div>
                    </div>
                    <p className="text-gray-600 mt-1">Volvo FH16 • Capacité: 15 tonnes</p>
                    <div className="mt-2 flex items-center">
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Disponible maintenant</span>
                      <span className="ml-2 text-sm font-medium">1200 DH</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center p-4 border border-gray-200 rounded-xl hover:shadow-md transition">
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
                  <div className="ml-4 flex-1">
                    <div className="flex justify-between">
                      <h3 className="font-bold">Transport Express</h3>
                      <div className="flex text-yellow-400">
                        {'★'.repeat(4)}
                        <span className="text-gray-300">★</span>
                      </div>
                    </div>
                    <p className="text-gray-600 mt-1">Mercedes Actros • Capacité: 12 tonnes</p>
                    <div className="mt-2 flex items-center">
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Disponible demain</span>
                      <span className="ml-2 text-sm font-medium">1500 DH</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <button className="w-full py-3 border border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition flex items-center justify-center">
                  <TruckIcon className="h-5 w-5 mr-2" />
                  Trouver plus de transporteurs
                </button>
              </div>
            </div>
          </HoverCard>
        </div>
      </div>
    </div>
  );
};

export default ShipperDashboard;
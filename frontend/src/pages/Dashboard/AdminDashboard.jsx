import React, { useState, useEffect } from 'react';
import { 
  UserGroupIcon, 
  TruckIcon, 
  DocumentTextIcon, 
  ChartBarIcon,
  ArrowTrendingUpIcon,
  ShieldCheckIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';
import StatsGrid from '../../components/dashboard/StatsGrid';
import DashboardHeader from '../../components/dashboard/DashboardHeader';
import HoverCard from '../../components/ui/HoverCard';
import GradientButton from '../../components/ui/GradientButton';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const AdminDashboard = () => {
  const [stats, setStats] = useState([
    { id: 1, name: 'Utilisateurs', value: '1,248', change: '+12%', icon: UserGroupIcon },
    { id: 2, name: 'Annonces Actives', value: '342', change: '+8%', icon: TruckIcon },
    { id: 3, name: 'Transactions', value: '1.2M DH', change: '+24%', icon: DocumentTextIcon },
    { id: 4, name: 'Taux Engagement', value: '78%', change: '+3.2%', icon: ChartBarIcon }
  ]);

  const [userData, setUserData] = useState({
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Nouveaux utilisateurs',
        data: [65, 59, 80, 81, 56, 72],
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  });

  const [announcementData, setAnnouncementData] = useState({
    labels: ['Acceptées', 'En attente', 'Rejetées', 'Expirées'],
    datasets: [
      {
        data: [65, 15, 12, 8],
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)',
          'rgba(255, 205, 86, 0.6)',
          'rgba(255, 99, 132, 0.6)',
          'rgba(153, 102, 255, 0.6)'
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(255, 205, 86, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(153, 102, 255, 1)'
        ],
        borderWidth: 1,
      },
    ],
  });

  const [pendingActions, setPendingActions] = useState([
    { id: 1, title: 'Utilisateurs à vérifier', count: 12, icon: ShieldCheckIcon, color: 'text-blue-500 bg-blue-100' },
    { id: 2, title: 'Annonces à modérer', count: 8, icon: DocumentTextIcon, color: 'text-yellow-500 bg-yellow-100' },
    { id: 3, title: 'Signalements', count: 5, icon: ExclamationTriangleIcon, color: 'text-red-500 bg-red-100' },
  ]);

  const recentActivities = [
    { id: 1, user: 'Ahmed Khalid', action: 'Nouveau compte créé', time: '2 min ago' },
    { id: 2, user: 'Transport Pro', action: 'Annonce publiée', time: '15 min ago' },
    { id: 3, user: 'Sophie Martin', action: 'Demande de transport', time: '1h ago' },
    { id: 4, user: 'Admin', action: 'Utilisateur suspendu', time: '2h ago' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <DashboardHeader title="Tableau de Bord Administrateur" admin={true} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <StatsGrid stats={stats} />
        
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <HoverCard className="h-full">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-800">Statistiques des Utilisateurs</h2>
                  <button className="flex items-center text-blue-600 font-medium hover:text-blue-800 transition">
                    <ArrowTrendingUpIcon className="h-5 w-5 mr-1" />
                    Voir le rapport
                  </button>
                </div>
                <Bar 
                  data={userData} 
                  options={{ 
                    responsive: true,
                    plugins: {
                      legend: {
                        position: 'top',
                      },
                      title: {
                        display: true,
                        text: 'Croissance mensuelle des utilisateurs'
                      }
                    }
                  }} 
                />
              </div>
            </HoverCard>
          </div>
          
          <div className="space-y-8">
            {pendingActions.map(action => (
              <HoverCard key={action.id}>
                <div className="p-6">
                  <div className="flex items-center">
                    <div className={`p-3 rounded-lg ${action.color}`}>
                      <action.icon className="h-6 w-6" />
                    </div>
                    <div className="ml-4 flex-1">
                      <h3 className="font-medium text-gray-900">{action.title}</h3>
                      <p className="text-2xl font-bold mt-1">{action.count}</p>
                    </div>
                    <div className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                      Actions requises
                    </div>
                  </div>
                  <div className="mt-4">
                    <GradientButton 
                      from="from-blue-600" 
                      to="to-indigo-700"
                      className="w-full py-2"
                    >
                      Voir les détails
                    </GradientButton>
                  </div>
                </div>
              </HoverCard>
            ))}
          </div>
        </div>
        
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <HoverCard>
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800">Statut des Annonces</h2>
                <button className="flex items-center text-blue-600 font-medium hover:text-blue-800 transition">
                  <ArrowTrendingUpIcon className="h-5 w-5 mr-1" />
                  Voir le rapport
                </button>
              </div>
              <div className="h-64 flex items-center justify-center">
                <Pie 
                  data={announcementData} 
                  options={{ 
                    responsive: true,
                    plugins: {
                      legend: {
                        position: 'right'
                      }
                    }
                  }} 
                />
              </div>
            </div>
          </HoverCard>
          
          <HoverCard>
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Activités Récentes</h2>
              <div className="space-y-4">
                {recentActivities.map(activity => (
                  <div key={activity.id} className="flex items-start border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                    <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10" />
                    <div className="ml-3 flex-1">
                      <div className="flex justify-between">
                        <h3 className="font-medium text-gray-900">{activity.user}</h3>
                        <span className="text-sm text-gray-500">{activity.time}</span>
                      </div>
                      <p className="text-gray-600">{activity.action}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <button className="w-full text-center text-blue-600 font-medium hover:text-blue-800 transition">
                  Voir toutes les activités
                </button>
              </div>
            </div>
          </HoverCard>
        </div>
        
        <div className="mt-8">
          <HoverCard>
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800">Gestion des Utilisateurs</h2>
                <GradientButton 
                  from="from-green-600" 
                  to="to-emerald-700"
                  className="px-4 py-2"
                >
                  Ajouter un utilisateur
                </GradientButton>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rôle</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="bg-gray-200 border-2 border-dashed rounded-xl w-8 h-8" />
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">Karim Benzema</div>
                            <div className="text-sm text-gray-500">karim.b@example.com</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                          Conducteur
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                          Actif
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button className="text-blue-600 hover:text-blue-900 mr-3">Modifier</button>
                        <button className="text-red-600 hover:text-red-900">Désactiver</button>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="bg-gray-200 border-2 border-dashed rounded-xl w-8 h-8" />
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">Sophie Martin</div>
                            <div className="text-sm text-gray-500">sophie.m@example.com</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs font-medium bg-purple-100 text-purple-800 rounded-full">
                          Expéditeur
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
                          En attente
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button className="text-blue-600 hover:text-blue-900 mr-3">Vérifier</button>
                        <button className="text-red-600 hover:text-red-900">Rejeter</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </HoverCard>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
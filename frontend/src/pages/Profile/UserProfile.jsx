import React, { useState } from 'react';
import { UserIcon, ShieldCheckIcon, TruckIcon, StarIcon } from '@heroicons/react/24/solid';

const UserProfile = () => {
  const [user] = useState({
    name: 'Karim Benzema',
    email: 'karim.b@example.com',
    phone: '+212 612-345678',
    role: 'Transporteur',
    verified: true,
    rating: 4.7,
    totalDeliveries: 42,
    memberSince: 'Jan 2023'
  });

  const stats = [
    { id: 1, name: 'Annonces actives', value: 8 },
    { id: 2, name: 'Demandes traitées', value: 36 },
    { id: 3, name: 'Taux de réponse', value: '92%' },
  ];

  const reviews = [
    { id: 1, user: 'Sophie Martin', rating: 5, comment: 'Livraison rapide et professionnelle, je recommande !', date: '15/05/2025' },
    { id: 2, user: 'Ahmed Khalid', rating: 4, comment: 'Très bon service, juste un peu de retard mais colis bien protégé', date: '10/05/2025' },
    { id: 3, user: 'Marie Dupont', rating: 5, comment: 'Meilleur transporteur sur la plateforme, toujours ponctuel', date: '02/05/2025' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-indigo-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          {/* Profile Header */}
          <div className="relative">
            <div className="h-48 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
            <div className="absolute -bottom-16 left-8">
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-32 h-32 border-4 border-white shadow-lg" />
            </div>
          </div>
          
          <div className="px-8 pt-20 pb-8">
            <div className="flex flex-wrap items-center justify-between">
              <div>
                <div className="flex items-center">
                  <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
                  {user.verified && (
                    <span className="ml-2 bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm flex items-center">
                      <ShieldCheckIcon className="h-4 w-4 mr-1" />
                      Vérifié
                    </span>
                  )}
                </div>
                
                <div className="flex items-center mt-2">
                  <div className="flex text-yellow-400">
                    {'★'.repeat(5)}
                  </div>
                  <span className="ml-2 text-gray-600">{user.rating} ({user.totalDeliveries} livraisons)</span>
                </div>
                
                <div className="mt-3 flex flex-wrap gap-3">
                  <span className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    <TruckIcon className="h-4 w-4 mr-1" />
                    {user.role}
                  </span>
                  <span className="inline-flex items-center px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                    Membre depuis {user.memberSince}
                  </span>
                </div>
              </div>
              
              <button className="mt-4 md:mt-0 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-medium rounded-full shadow hover:shadow-lg transition-shadow">
                Contacter
              </button>
            </div>
            
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-50 rounded-xl p-5">
                <h3 className="text-lg font-medium text-gray-900 mb-3">Informations de contact</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    {user.email}
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    {user.phone}
                  </li>
                </ul>
              </div>
              
              <div className="md:col-span-2">
                <h3 className="text-lg font-medium text-gray-900 mb-3">Statistiques</h3>
                <div className="grid grid-cols-3 gap-4">
                  {stats.map(stat => (
                    <div key={stat.id} className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 text-center border border-blue-100">
                      <div className="text-2xl font-bold text-indigo-700">{stat.value}</div>
                      <div className="text-sm text-gray-600 mt-1">{stat.name}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-900">Avis des clients</h3>
                <span className="text-blue-600 font-medium">Voir tout</span>
              </div>
              
              <div className="space-y-4">
                {reviews.map(review => (
                  <div key={review.id} className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow">
                    <div className="flex justify-between">
                      <h4 className="font-medium text-gray-900">{review.user}</h4>
                      <span className="text-gray-500 text-sm">{review.date}</span>
                    </div>
                    <div className="flex mt-2">
                      <div className="flex text-yellow-400">
                        {'★'.repeat(review.rating)}
                      </div>
                    </div>
                    <p className="mt-2 text-gray-600">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
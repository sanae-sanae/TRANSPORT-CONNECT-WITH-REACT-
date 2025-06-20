// src/pages/Announcements/BrowsePage.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import AnnouncementCard from '../../components/announcements/AnnouncementCard';
import { FunnelIcon, ArrowsPointingOutIcon, TruckIcon, MapPinIcon, CalendarIcon, CubeIcon, ScaleIcon } from '@heroicons/react/24/outline';
import FloatingIcons from '../../components/animations/FloatingIcons';
import ParticleBackground from '../../components/animations/ParticleBackground';
import GradientButton from '../../components/ui/GradientButton';
import PulseBadge from '../../components/ui/PulseBadge';

const BrowsePage = () => {
  const [filters, setFilters] = useState({
    origin: '',
    destination: '',
    maxWeight: '',
    type: '',
    date: ''
  });
  
  const [activeFilter, setActiveFilter] = useState('destination');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const announcements = [
    {
      id: 1,
      origin: 'Casablanca',
      destination: 'Marrakech',
      departure: '15/06/2025 08:00',
      dimensions: '3m x 2m x 2m',
      weight: '500 kg',
      price: '1200 DH',
      user: 'Transport Pro',
      rating: 4.7,
      capacity: '800 kg',
      vehicle: 'Camion frigorifique',
      verified: true
    },
    {
      id: 2,
      origin: 'Rabat',
      destination: 'Tanger',
      departure: '16/06/2025 10:30',
      dimensions: '2m x 1.5m x 1m',
      weight: '300 kg',
      price: '800 DH',
      user: 'Fast Logistics',
      rating: 4.3,
      capacity: '500 kg',
      vehicle: 'Fourgon utilitaire',
      verified: true
    },
    {
      id: 3,
      origin: 'Fès',
      destination: 'Agadir',
      departure: '17/06/2025 14:00',
      dimensions: '4m x 2.5m x 1.8m',
      weight: '1000 kg',
      price: '2500 DH',
      user: 'Premium Trans',
      rating: 4.9,
      capacity: '1500 kg',
      vehicle: 'Remorque plateau',
      verified: true
    },
    {
      id: 4,
      origin: 'Tanger',
      destination: 'Oujda',
      departure: '18/06/2025 09:00',
      dimensions: '2.5m x 1.8m x 1.5m',
      weight: '600 kg',
      price: '1800 DH',
      user: 'North Express',
      rating: 4.5,
      capacity: '1000 kg',
      vehicle: 'Camion bâché',
      verified: false
    },
    {
      id: 5,
      origin: 'Marrakech',
      destination: 'Dakhla',
      departure: '20/06/2025 07:00',
      dimensions: '5m x 2.2m x 2m',
      weight: '2000 kg',
      price: '4500 DH',
      user: 'Sahara Logistics',
      rating: 4.8,
      capacity: '2500 kg',
      vehicle: 'Camion frigorifique',
      verified: true
    },
    {
      id: 6,
      origin: 'Agadir',
      destination: 'Laâyoune',
      departure: '19/06/2025 11:00',
      dimensions: '3.5m x 2m x 1.8m',
      weight: '1200 kg',
      price: '2800 DH',
      user: 'South Trans',
      rating: 4.6,
      capacity: '1500 kg',
      vehicle: 'Camion plateau',
      verified: true
    }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const applyFilters = () => {
    setIsFilterOpen(false)
    console.log('Filtres appliqués:', filters);
  };
 const filterOptions = [
    { id: 'destination', icon: MapPinIcon, label: 'Destination' },
    { id: 'origin', icon: MapPinIcon, label: 'Départ' },
    { id: 'date', icon: CalendarIcon, label: 'Date' },
    { id: 'maxWeight', icon: ScaleIcon, label: 'Poids max' },
    { id: 'type', icon: CubeIcon, label: 'Type' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50 relative overflow-hidden">
      <ParticleBackground />
      <FloatingIcons />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="text-center mb-12">
          <motion.h1 
            className="text-4xl font-extrabold text-gray-900 mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Trouvez votre transport idéal
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Parcourez des centaines d'annonces de transporteurs vérifiés et trouvez la solution parfaite pour vos besoins logistiques
          </motion.p>
        </div>

        {/* Filtres avancés */}
        <motion.div 
          className="bg-white rounded-2xl shadow-xl p-6 mb-8 relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 opacity-30"></div>
          
          <div className="flex flex-col md:flex-row items-center justify-between mb-6 relative z-10">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center">
              <MapPinIcon className="h-6 w-6 mr-2 text-blue-500" />
              Filtres avancés
            </h2>
            
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <button 
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center text-blue-600 font-medium hover:text-blue-800 transition"
              >
                <FunnelIcon className="h-5 w-5 mr-1" />
                {isFilterOpen ? 'Cacher' : 'Afficher'} les filtres
              </button>
              
              <PulseBadge className="bg-gradient-to-r from-green-500 to-emerald-600">
                Nouveau
              </PulseBadge>
            </div>
          </div>

          {/* Barre de filtres rapides */}
          <div className="flex flex-wrap gap-2 mb-6 relative z-10">
            {filterOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => setActiveFilter(option.id)}
                className={`flex items-center px-4 py-2 rounded-full transition-all ${
                  activeFilter === option.id
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <option.icon className="h-4 w-4 mr-2" />
                <span>{option.label}</span>
              </button>
            ))}
          </div>

          {/* Filtres détaillés */}
          {isFilterOpen && (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 relative z-10"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.3 }}
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ville de départ</label>
                <input
                  type="text"
                  name="origin"
                  value={filters.origin}
                  onChange={handleFilterChange}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Ex: Casablanca"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Destination</label>
                <input
                  type="text"
                  name="destination"
                  value={filters.destination}
                  onChange={handleFilterChange}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Ex: Marrakech"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date de départ</label>
                <input
                  type="date"
                  name="date"
                  value={filters.date}
                  onChange={handleFilterChange}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Poids max (kg)</label>
                <input
                  type="number"
                  name="maxWeight"
                  value={filters.maxWeight}
                  onChange={handleFilterChange}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Ex: 500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type de marchandise</label>
                <select 
                  name="type" 
                  value={filters.type}
                  onChange={handleFilterChange}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  <option value="">Tous types</option>
                  <option value="alimentaire">Alimentaire</option>
                  <option value="electronique">Électronique</option>
                  <option value="medical">Médical</option>
                  <option value="automobile">Automobile</option>
                  <option value="textile">Textile</option>
                </select>
              </div>
            </motion.div>
          )}
          
          {/* Boutons d'action */}
          <div className="flex justify-end space-x-4 mt-6 relative z-10">
            <button 
              onClick={() => setFilters({
                origin: '',
                destination: '',
                maxWeight: '',
                type: '',
                date: ''
              })}
              className="px-6 py-3 border border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-all"
            >
              Réinitialiser
            </button>
            <GradientButton 
              onClick={applyFilters}
              from="from-blue-600" 
              to="to-indigo-700"
              className="px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
            >
              Appliquer les filtres
            </GradientButton>
          </div>
        </motion.div>

        {/* Résultats */}
        {loading ? (
          <div className="flex justify-center items-center h-96">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
          </div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {announcements.map((announcement) => (
              <motion.div
                key={announcement.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -5 }}
              >
                <AnnouncementCard 
                  announcement={announcement} 
                  onSelect={() => console.log('Selected:', announcement.id)}
                />
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Pagination */}
        <motion.div 
          className="mt-12 flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="flex items-center space-x-2">
            <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
              Précédent
            </button>
            
            {[1, 2, 3, 4, 5].map(page => (
              <button 
                key={page}
                className={`px-4 py-2 rounded-lg ${
                  page === 1 
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {page}
              </button>
            ))}
            
            <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
              Suivant
            </button>
          </div>
        </motion.div>

        {/* Bouton d'action principal */}
        <motion.div 
          className="mt-12 flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <GradientButton 
            from="from-blue-600" 
            to="to-indigo-700"
            className="flex items-center px-6 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all"
          >
            <ArrowsPointingOutIcon className="h-5 w-5 mr-2" />
            Charger plus d'annonces
          </GradientButton>
        </motion.div>
      </div>
    </div>
  );
};

export default BrowsePage;
// src/pages/HomePage.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Truck, MapPin, Package, BarChart3, MessageSquare, CheckCircle } from 'react-feather';
import ParticleBackground from '../components/animations/ParticleBackground';
import FloatingIcons from '../components/animations/FloatingIcons';
import GradientButton from '../components/ui/GradientButton';
import NeonInput from '../components/ui/NeonInput';
import PulseBadge from '../components/ui/PulseBadge';

const HomePage = () => {
  const [searchValue, setSearchValue] = useState('');
  const [stats, setStats] = useState([
    { value: 0, label: 'Utilisateurs actifs', max: 12500 },
    { value: 0, label: 'Annonces publiées', max: 3400 },
    { value: 0, label: 'Livraisons réussies', max: 9800 },
  ]);
  const [activeIndex, setActiveIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => prev.map((stat, i) => {
        if (stat.value < stat.max) {
          const increment = Math.ceil(stat.max / 50);
          return { ...stat, value: Math.min(stat.value + increment, stat.max) };
        }
        return stat;
      }));
    }, 50);

    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(prev => (prev < 5 ? prev + 1 : 0));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: <Truck size={48} />,
      title: "Transporteurs Vérifiés",
      description: "Accédez à un réseau de transporteurs professionnels avec des véhicules adaptés à vos besoins."
    },
    {
      icon: <MapPin size={48} />,
      title: "Suivi en Temps Réel",
      description: "Suivez votre marchandise en direct grâce à notre système de géolocalisation précis."
    },
    {
      icon: <Package size={48} />,
      title: "Gestion Simplifiée",
      description: "Créez et gérez vos annonces et demandes de transport en quelques clics."
    },
    {
      icon: <BarChart3 size={48} />,
      title: "Tableaux de Bord Intelligents",
      description: "Analysez vos performances et optimisez votre logistique avec nos outils avancés."
    },
    {
      icon: <MessageSquare size={48} />,
      title: "Messagerie Instantanée",
      description: "Communiquez en temps réel avec les transporteurs et expéditeurs."
    },
    {
      icon: <CheckCircle size={48} />,
      title: "Système d'Évaluation",
      description: "Notez vos partenaires pour garantir la qualité des services sur la plateforme."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-blue-900 overflow-hidden">
      {/* Animations de fond */}
      <ParticleBackground />
      <FloatingIcons />
      
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-8 flex justify-between items-center z-10 relative">
        <motion.div 
          className="flex items-center"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-3 rounded-xl">
            <Truck size={28} className="text-white" />
          </div>
          <h1 className="ml-3 text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            LogiTrack
          </h1>
        </motion.div>
        
        <div className="flex items-center space-x-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Link to="/login" className="text-blue-300 hover:text-white transition-colors">
              Connexion
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Link to="/register">
              <GradientButton
                from="from-blue-600"
                to="to-indigo-700"
                className="px-6 py-2 rounded-xl"
              >
                Inscription
              </GradientButton>
            </Link>
          </motion.div>
        </div>
      </nav>
      
      {/* Hero Section */}
      <section className="container mx-auto px-6 py-16 md:py-28 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <PulseBadge>
              Nouveau: Messagerie en temps réel
            </PulseBadge>
          </motion.div>
          
          <motion.h1
            className="text-4xl md:text-6xl font-bold mt-8 mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              La plateforme logistique
            </span>
            <br />
            <span className="text-white">révolutionnaire</span>
          </motion.h1>
          
          <motion.p
            className="text-xl text-blue-200 max-w-2xl mx-auto mb-10"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Connectez transporteurs et expéditeurs pour une gestion optimale du fret.
            Simplifiez votre logistique avec nos outils puissants et intuitifs.
          </motion.p>
          
          <motion.div
            className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link to="/register" className="w-full md:w-auto">
              <GradientButton
                from="from-blue-600"
                to="to-indigo-700"
                className="w-full md:w-auto px-8 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all"
              >
                Commencer maintenant
              </GradientButton>
            </Link>
            <Link to="/announcements" className="w-full md:w-auto">
              <button className="w-full md:w-auto px-8 py-4 text-lg bg-transparent border-2 border-blue-500 text-blue-300 rounded-xl hover:bg-blue-500/10 transition-colors">
                Voir les annonces
              </button>
            </Link>
          </motion.div>
        </div>
      </section>
      
      {/* Animated Search Section */}
      <motion.section
        className="container mx-auto px-6 py-16 relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <div className="max-w-3xl mx-auto">
          <motion.div
            className="bg-gradient-to-r from-blue-900/30 to-indigo-900/30 backdrop-blur-lg rounded-2xl p-8 border border-blue-500/30 shadow-xl"
            animate={{ 
              boxShadow: [
                "0 0 10px rgba(59, 130, 246, 0.3)",
                "0 0 20px rgba(99, 102, 241, 0.4)",
                "0 0 10px rgba(59, 130, 246, 0.3)"
              ] 
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            <h2 className="text-2xl font-bold text-white mb-4 text-center">
              Trouvez le transport idéal
            </h2>
            
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
              <div className="flex-1">
                <NeonInput
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder="Destination, ville ou code postal..."
                />
              </div>
              <button className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-700 text-white rounded-xl hover:shadow-lg transition-shadow">
                Rechercher
              </button>
            </div>
          </motion.div>
        </div>
      </motion.section>
      
      {/* Features Section */}
      <section className="container mx-auto px-6 py-16 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <motion.h2
            className="text-3xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Une solution complète pour 
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500"> votre logistique</span>
          </motion.h2>
          <motion.p
            className="text-xl text-blue-200"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Découvrez toutes les fonctionnalités conçues pour simplifier et optimiser 
            votre chaîne logistique
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className={`bg-gradient-to-br from-blue-900/30 to-indigo-900/30 backdrop-blur-lg rounded-2xl p-6 border ${
                activeIndex === index 
                  ? 'border-blue-500 shadow-xl' 
                  : 'border-blue-500/20'
              } transition-all duration-500`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="text-blue-400 mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-blue-200">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="container mx-auto px-6 py-16 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-r from-blue-900/30 to-indigo-900/30 backdrop-blur-lg rounded-2xl p-8 border border-blue-500/30">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {stats.map((stat, index) => (
                <motion.div 
                  key={index} 
                  className="text-center"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                >
                  <div className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 mb-2">
                    {stat.value.toLocaleString()}+
                  </div>
                  <p className="text-xl text-blue-300">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="container mx-auto px-6 py-16 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            className="bg-gradient-to-r from-blue-900/30 to-indigo-900/30 backdrop-blur-lg rounded-2xl p-12 border border-blue-500/30"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Prêt à révolutionner votre logistique?
            </h2>
            <p className="text-xl text-blue-200 mb-8 max-w-2xl mx-auto">
              Rejoignez des milliers de professionnels qui optimisent déjà leur chaîne logistique avec notre plateforme.
            </p>
            <Link to="/register">
              <GradientButton
                from="from-blue-600"
                to="to-indigo-700"
                className="px-8 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all"
              >
                Créer un compte gratuit
              </GradientButton>
            </Link>
          </motion.div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="container mx-auto px-6 py-8 border-t border-blue-800/30 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-2 rounded-xl">
                  <Truck size={24} className="text-white" />
                </div>
                <h2 className="ml-2 text-xl font-bold text-white">LogiTrack</h2>
              </div>
              <p className="text-blue-300">
                La plateforme logistique intelligente qui connecte transporteurs et expéditeurs.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Navigation</h3>
              <ul className="space-y-2">
                <li><Link to="/" className="text-blue-300 hover:text-white transition-colors">Accueil</Link></li>
                <li><Link to="/announcements" className="text-blue-300 hover:text-white transition-colors">Annonces</Link></li>
                <li><Link to="/features" className="text-blue-300 hover:text-white transition-colors">Fonctionnalités</Link></li>
                <li><Link to="/pricing" className="text-blue-300 hover:text-white transition-colors">Tarifs</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Légal</h3>
              <ul className="space-y-2">
                <li><Link to="/privacy" className="text-blue-300 hover:text-white transition-colors">Confidentialité</Link></li>
                <li><Link to="/terms" className="text-blue-300 hover:text-white transition-colors">Conditions d'utilisation</Link></li>
                <li><Link to="/cookies" className="text-blue-300 hover:text-white transition-colors">Cookies</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Contact</h3>
              <ul className="space-y-2">
                <li className="text-blue-300">support@logitrack.com</li>
                <li className="text-blue-300">+212 6 12 34 56 78</li>
                <li className="text-blue-300">Casablanca, Maroc</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-blue-800/30 text-center text-blue-400">
            <p>© 2023 LogiTrack. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
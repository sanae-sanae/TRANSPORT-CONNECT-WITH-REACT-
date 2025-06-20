// src/pages/Auth/OAuthRedirect.jsx
import { useState } from 'react';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowPathIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';

const OAuthRedirect = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [status, setStatus] = useState('loading'); // 'loading', 'success', 'error'
  const [message, setMessage] = useState('Connexion en cours...');
  const [provider, setProvider] = useState('');

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');
    const error = queryParams.get('error');
    const providerName = queryParams.get('provider');

    if (providerName) {
      setProvider(providerName.charAt(0).toUpperCase() + providerName.slice(1));
    }

    if (token) {
      localStorage.setItem('authToken', token);
      
      setStatus('success');
      setMessage('Connexion réussie! Redirection en cours...');
      setTimeout(() => {
        navigate('/dashboard');
      }, 3000);
    } else if (error) {
      setStatus('error');
      setMessage(`Erreur de connexion: ${error}`);
    } else {
      setStatus('error');
      setMessage('Paramètres de connexion manquants');
    }
  }, [location, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-blue-900">
      <motion.div 
        className="w-full max-w-md px-6 py-10 bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {status === 'loading' && (
          <>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="mx-auto mb-6"
            >
              <ArrowPathIcon className="h-16 w-16 text-blue-400" />
            </motion.div>
            <h2 className="text-2xl font-bold text-white mb-4">Connexion avec {provider}</h2>
            <p className="text-blue-200">{message}</p>
          </>
        )}

        {status === 'success' && (
          <>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, type: "spring" }}
              className="mx-auto mb-6"
            >
              <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center">
                <CheckCircleIcon className="h-16 w-16 text-green-400" />
              </div>
            </motion.div>
            <h2 className="text-2xl font-bold text-white mb-4">Connexion réussie!</h2>
            <p className="text-green-300 mb-6">Vous êtes connecté avec {provider}</p>
            <p className="text-blue-200">Redirection vers votre tableau de bord...</p>
            <div className="mt-8 w-full bg-gray-700 rounded-full h-2">
              <motion.div 
                className="bg-green-500 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 3, ease: "linear" }}
              />
            </div>
          </>
        )}

        {status === 'error' && (
          <>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, type: "spring" }}
              className="mx-auto mb-6"
            >
              <div className="w-24 h-24 bg-red-500/20 rounded-full flex items-center justify-center">
                <XCircleIcon className="h-16 w-16 text-red-400" />
              </div>
            </motion.div>
            <h2 className="text-2xl font-bold text-white mb-4">Échec de la connexion</h2>
            <p className="text-red-300 mb-6">{message}</p>
            <button
              onClick={() => navigate('/login')}
              className="mt-4 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              Retour à la connexion
            </button>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default OAuthRedirect;
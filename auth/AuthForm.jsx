import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { 
  EnvelopeIcon, 
  LockClosedIcon, 
  UserIcon, 
  PhoneIcon, 
  EyeIcon, 
  EyeSlashIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';
import SocialAuth from './SocialAuth';
import Lottie from 'lottie-react';
import truckDriving from '../assets/animations/truck-driving.json';

const AuthForm = ({ isLogin, onSubmit, isLoading }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="bg-gradient-to-br from-white to-indigo-50 rounded-2xl shadow-xl p-8 max-w-lg w-full border border-indigo-100">
      <div className="flex flex-col items-center mb-8">
        <div className="w-32 h-32 -mt-16">
          <Lottie animationData={truckDriving} loop={true} />
        </div>
        <h2 className="text-3xl font-bold text-center text-gray-900 mt-2">
          {isLogin ? 'Connexion à votre compte' : 'Créer un nouveau compte'}
        </h2>
        <p className="text-gray-600 mt-2 text-center">
          {isLogin ? 'Accédez à votre tableau de bord' : 'Rejoignez notre communauté de transporteurs'}
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {!isLogin && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="firstName" className="block text-gray-700 mb-2">
                Prénom
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <UserIcon className="h-5 w-5 text-indigo-600" />
                </div>
                <input
                  id="firstName"
                  type="text"
                  className="pl-10 py-3 block w-full rounded-xl border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="Votre prénom"
                  {...register('firstName', { required: 'Ce champ est obligatoire' })}
                />
              </div>
              {errors.firstName && <p className="mt-2 text-red-600">{errors.firstName.message}</p>}
            </div>

            <div>
              <label htmlFor="lastName" className="block text-gray-700 mb-2">
                Nom
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <UserIcon className="h-5 w-5 text-indigo-600" />
                </div>
                <input
                  id="lastName"
                  type="text"
                  className="pl-10 py-3 block w-full rounded-xl border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="Votre nom"
                  {...register('lastName', { required: 'Ce champ est obligatoire' })}
                />
              </div>
              {errors.lastName && <p className="mt-2 text-red-600">{errors.lastName.message}</p>}
            </div>
          </div>
        )}

        {!isLogin && (
          <div>
            <label htmlFor="phone" className="block text-gray-700 mb-2">
              Téléphone
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <PhoneIcon className="h-5 w-5 text-indigo-600" />
              </div>
              <input
                id="phone"
                type="tel"
                className="pl-10 py-3 block w-full rounded-xl border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Votre numéro"
                {...register('phone', { required: 'Ce champ est obligatoire' })}
              />
            </div>
            {errors.phone && <p className="mt-2 text-red-600">{errors.phone.message}</p>}
          </div>
        )}

        <div>
          <label htmlFor="email" className="block text-gray-700 mb-2">
            Email
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <EnvelopeIcon className="h-5 w-5 text-indigo-600" />
            </div>
            <input
              id="email"
              type="email"
              className="pl-10 py-3 block w-full rounded-xl border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="email@exemple.com"
              {...register('email', { 
                required: 'Ce champ est obligatoire', 
                pattern: { 
                  value: /^\S+@\S+$/i, 
                  message: 'Email invalide' 
                } 
              })}
            />
          </div>
          {errors.email && <p className="mt-2 text-red-600">{errors.email.message}</p>}
        </div>

        <div>
          <label htmlFor="password" className="block text-gray-700 mb-2">
            Mot de passe
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <LockClosedIcon className="h-5 w-5 text-indigo-600" />
            </div>
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              className="pl-10 pr-10 py-3 block w-full rounded-xl border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="••••••••"
              {...register('password', { 
                required: 'Ce champ est obligatoire', 
                minLength: { 
                  value: 6, 
                  message: 'Minimum 6 caractères' 
                } 
              })}
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-400 hover:text-gray-500 focus:outline-none"
              >
                {showPassword ? (
                  <EyeSlashIcon className="h-5 w-5" />
                ) : (
                  <EyeIcon className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
          {errors.password && <p className="mt-2 text-red-600">{errors.password.message}</p>}
        </div>

        {!isLogin && (
          <div className="flex items-center">
            <input
              id="terms"
              type="checkbox"
              className="h-4 w-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500"
              {...register('terms', { required: 'Vous devez accepter les conditions' })}
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
              J'accepte les <a href="#" className="text-indigo-600 hover:underline">termes et conditions</a>
            </label>
          </div>
        )}

        <div>
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-4 px-6 font-bold text-white rounded-xl shadow-lg transition-all ${
              isLoading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-gradient-to-r from-indigo-600 to-purple-700 hover:from-indigo-700 hover:to-purple-800 hover:shadow-xl hover:-translate-y-0.5'
            }`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <ArrowPathIcon className="h-5 w-5 mr-3 animate-spin" />
                {isLogin ? 'Connexion en cours...' : 'Création en cours...'}
              </div>
            ) : isLogin ? (
              'Se connecter'
            ) : (
              'Créer un compte'
            )}
          </button>
        </div>
      </form>

      <div className="mt-8">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Ou continuer avec</span>
          </div>
        </div>

        <div className="mt-6">
          <SocialAuth />
        </div>
      </div>

      <div className="mt-8 text-center">
        <p className="text-gray-600">
          {isLogin ? "Vous n'avez pas de compte ? " : "Vous avez déjà un compte ? "}
          <a href={isLogin ? "/register" : "/login"} className="font-medium text-indigo-600 hover:text-indigo-500">
            {isLogin ? 'Inscrivez-vous' : 'Connectez-vous'}
          </a>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
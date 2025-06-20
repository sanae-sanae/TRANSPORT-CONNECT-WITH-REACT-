import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { 
  TruckIcon, 
  MapPinIcon, 
  PlusIcon, 
  XMarkIcon, 
  CalendarIcon,
  ArrowsRightLeftIcon,
  CubeIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';

const CreateAnnouncement = ({ onSubmit }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addStep = () => {
    if (currentStep.trim() !== '') {
      setSteps([...steps, currentStep.trim()]);
      setCurrentStep('');
    }
  };

  const removeStep = (index) => {
    setSteps(steps.filter((_, i) => i !== index));
  };

  const handleFormSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const announcementData = {
        ...data,
        steps,
        maxDimensions: `${data.length}x${data.width}x${data.height} cm`,
      };
      await onSubmit(announcementData);
      reset();
      setSteps([]);
    } catch (error) {
      console.error('Error creating announcement:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-white to-indigo-50 rounded-2xl shadow-xl p-8 border border-indigo-100">
      <h2 className="text-3xl font-bold text-gray-900 mb-2">Créer une annonce de trajet</h2>
      <p className="text-gray-600 mb-8">Remplissez les détails de votre trajet pour trouver des expéditeurs</p>
      
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label htmlFor="departure" className="block text-lg font-medium text-gray-800 mb-2">
              Lieu de départ
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MapPinIcon className="h-6 w-6 text-indigo-600" />
              </div>
              <input
                id="departure"
                type="text"
                className="pl-12 py-4 block w-full rounded-xl border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-lg"
                placeholder="Ville de départ"
                {...register('departure', { required: 'Ce champ est obligatoire' })}
              />
            </div>
            {errors.departure && <p className="mt-2 text-red-600">{errors.departure.message}</p>}
          </div>

          <div>
            <label htmlFor="destination" className="block text-lg font-medium text-gray-800 mb-2">
              Destination finale
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MapPinIcon className="h-6 w-6 text-indigo-600" />
              </div>
              <input
                id="destination"
                type="text"
                className="pl-12 py-4 block w-full rounded-xl border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-lg"
                placeholder="Ville d'arrivée"
                {...register('destination', { required: 'Ce champ est obligatoire' })}
              />
            </div>
            {errors.destination && <p className="mt-2 text-red-600">{errors.destination.message}</p>}
          </div>
        </div>

        <div>
          <label className="block text-lg font-medium text-gray-800 mb-2">
            <ArrowsRightLeftIcon className="h-6 w-6 text-indigo-600 inline mr-2" />
            Étapes intermédiaires
          </label>
          <div className="flex">
            <input
              type="text"
              value={currentStep}
              onChange={(e) => setCurrentStep(e.target.value)}
              className="flex-1 py-4 px-4 block w-full rounded-l-xl border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-lg"
              placeholder="Ajouter une étape"
            />
            <button
              type="button"
              onClick={addStep}
              className="inline-flex items-center px-6 rounded-r-xl bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none"
            >
              <PlusIcon className="h-6 w-6" />
            </button>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {steps.map((step, index) => (
              <span key={index} className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-100 text-indigo-800 text-lg">
                {step}
                <button
                  type="button"
                  onClick={() => removeStep(index)}
                  className="ml-3 text-indigo-600 hover:text-indigo-900 focus:outline-none"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <label htmlFor="date" className="block text-lg font-medium text-gray-800 mb-2">
              Date du trajet
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <CalendarIcon className="h-6 w-6 text-indigo-600" />
              </div>
              <input
                id="date"
                type="date"
                className="pl-12 py-4 block w-full rounded-xl border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-lg"
                {...register('date', { required: 'Veuillez sélectionner une date' })}
              />
            </div>
            {errors.date && <p className="mt-2 text-red-600">{errors.date.message}</p>}
          </div>

          <div>
            <label htmlFor="cargoType" className="block text-lg font-medium text-gray-800 mb-2">
              Type de marchandise
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <TruckIcon className="h-6 w-6 text-indigo-600" />
              </div>
              <select
                id="cargoType"
                className="pl-12 py-4 block w-full rounded-xl border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-lg"
                {...register('cargoType', { required: 'Veuillez sélectionner un type' })}
              >
                <option value="">Sélectionnez un type</option>
                <option value="Electronique">Électronique</option>
                <option value="Alimentaire">Alimentaire</option>
                <option value="Médical">Médical</option>
                <option value="Textile">Textile</option>
                <option value="Automobile">Automobile</option>
                <option value="Autre">Autre</option>
              </select>
            </div>
            {errors.cargoType && <p className="mt-2 text-red-600">{errors.cargoType.message}</p>}
          </div>

          <div>
            <label htmlFor="availableCapacity" className="block text-lg font-medium text-gray-800 mb-2">
              Capacité disponible (kg)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <CubeIcon className="h-6 w-6 text-indigo-600" />
              </div>
              <input
                id="availableCapacity"
                type="number"
                min="1"
                className="pl-12 py-4 block w-full rounded-xl border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-lg"
                placeholder="Capacité"
                {...register('availableCapacity', { 
                  required: 'Ce champ est obligatoire', 
                  min: { value: 1, message: 'Minimum 1 kg' } 
                })}
              />
            </div>
            {errors.availableCapacity && <p className="mt-2 text-red-600">{errors.availableCapacity.message}</p>}
          </div>
        </div>

        <div>
          <label className="block text-lg font-medium text-gray-800 mb-4">
            Dimensions maximales acceptées (cm)
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label htmlFor="length" className="block text-gray-700 mb-2">Longueur</label>
              <input
                id="length"
                type="number"
                min="1"
                className="py-4 px-6 block w-full rounded-xl border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-lg"
                placeholder="Longueur"
                {...register('length', { required: 'Ce champ est obligatoire', min: 1 })}
              />
              {errors.length && <p className="mt-2 text-red-600">{errors.length.message}</p>}
            </div>
            <div>
              <label htmlFor="width" className="block text-gray-700 mb-2">Largeur</label>
              <input
                id="width"
                type="number"
                min="1"
                className="py-4 px-6 block w-full rounded-xl border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-lg"
                placeholder="Largeur"
                {...register('width', { required: 'Ce champ est obligatoire', min: 1 })}
              />
              {errors.width && <p className="mt-2 text-red-600">{errors.width.message}</p>}
            </div>
            <div>
              <label htmlFor="height" className="block text-gray-700 mb-2">Hauteur</label>
              <input
                id="height"
                type="number"
                min="1"
                className="py-4 px-6 block w-full rounded-xl border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-lg"
                placeholder="Hauteur"
                {...register('height', { required: 'Ce champ est obligatoire', min: 1 })}
              />
              {errors.height && <p className="mt-2 text-red-600">{errors.height.message}</p>}
            </div>
          </div>
        </div>

        <div className="pt-6">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-5 px-6 text-xl font-bold text-white rounded-xl shadow-lg transition-all ${
              isSubmitting 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-gradient-to-r from-indigo-600 to-purple-700 hover:from-indigo-700 hover:to-purple-800 hover:shadow-xl hover:-translate-y-0.5'
            }`}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <ArrowPathIcon className="h-6 w-6 mr-3 animate-spin" />
                Publication en cours...
              </div>
            ) : (
              'Publier l\'annonce'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateAnnouncement;
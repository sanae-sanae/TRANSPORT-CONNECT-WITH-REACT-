import React, { useState, useRef } from 'react';
import { CameraIcon, UserCircleIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';
import GradientButton from '../../components/ui/GradientButton';
import HoverCard from '../../components/ui/HoverCard';

const EditProfile = () => {
  const [user, setUser] = useState({
    name: 'Karim Benzema',
    email: 'karim.b@example.com',
    phone: '+212 612-345678',
    company: 'Transport Pro',
    address: '123 Avenue Hassan II, Casablanca',
    bio: 'Transporteur professionnel avec 5 ans d\'expérience, spécialisé dans le transport frigorifique.'
  });
  
  const [avatar, setAvatar] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({ ...prev, [name]: value }));
  };
  
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setAvatar(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const triggerFileInput = () => {
    fileInputRef.current.click();
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Profile updated:', user);
    alert('Profil mis à jour avec succès!');
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 py-8 px-8 text-center">
            <h1 className="text-3xl font-bold text-white">Modifier votre profil</h1>
            <p className="text-blue-200 mt-2">Mettez à jour vos informations personnelles et professionnelles</p>
          </div>
          
          <div className="p-8">
            <div className="flex flex-col items-center -mt-20">
              <div className="relative">
                {previewUrl ? (
                  <img 
                    src={previewUrl} 
                    alt="Avatar" 
                    className="w-32 h-32 rounded-full border-4 border-white shadow-xl"
                  />
                ) : (
                  <div className="bg-gradient-to-br from-blue-200 to-indigo-300 w-32 h-32 rounded-full border-4 border-white shadow-xl flex items-center justify-center">
                    <UserCircleIcon className="h-16 w-16 text-white opacity-80" />
                  </div>
                )}
                
                <button 
                  onClick={triggerFileInput}
                  className="absolute bottom-0 right-0 bg-blue-500 p-2 rounded-full shadow-lg hover:bg-blue-600 transition-all transform hover:scale-105"
                >
                  <CameraIcon className="h-5 w-5 text-white" />
                </button>
                
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleAvatarChange}
                  className="hidden"
                  accept="image/*"
                />
              </div>
              
              <div className="mt-4 flex items-center">
                <h2 className="text-2xl font-bold">{user.name}</h2>
                <div className="ml-2 flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                  <ShieldCheckIcon className="h-4 w-4 mr-1" />
                  <span className="text-sm font-medium">Vérifié</span>
                </div>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <HoverCard>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nom complet</label>
                    <input
                      type="text"
                      name="name"
                      value={user.name}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      required
                    />
                  </div>
                </HoverCard>
                
                <HoverCard>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={user.email}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      required
                    />
                  </div>
                </HoverCard>
                
                <HoverCard>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={user.phone}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    />
                  </div>
                </HoverCard>
                
                <HoverCard>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Entreprise</label>
                    <input
                      type="text"
                      name="company"
                      value={user.company}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    />
                  </div>
                </HoverCard>
                
                <div className="md:col-span-2">
                  <HoverCard>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Adresse</label>
                      <input
                        type="text"
                        name="address"
                        value={user.address}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      />
                    </div>
                  </HoverCard>
                </div>
                
                <div className="md:col-span-2">
                  <HoverCard>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                      <textarea
                        name="bio"
                        value={user.bio}
                        onChange={handleChange}
                        rows="4"
                        className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      ></textarea>
                    </div>
                  </HoverCard>
                </div>
              </div>
              
              <div className="flex justify-end pt-6 space-x-4">
                <button 
                  type="button" 
                  className="px-6 py-3 border border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-all hover:shadow-md"
                >
                  Annuler
                </button>
                <GradientButton 
                  type="submit"
                  from="from-blue-600" 
                  to="to-indigo-700"
                  className="px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
                >
                  Enregistrer les modifications
                </GradientButton>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
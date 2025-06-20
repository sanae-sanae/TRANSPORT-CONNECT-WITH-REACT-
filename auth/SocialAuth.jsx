import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook, FaGithub } from 'react-icons/fa';

const SocialAuth = () => {
  const handleGoogleLogin = () => {
    console.log('Google login initiated');
  };

  const handleFacebookLogin = () => {
    console.log('Facebook login initiated');

  };

  return (
    <div className="grid grid-cols-1 gap-4">
      <button
        type="button"
        onClick={handleGoogleLogin}
        className="w-full py-3 px-4 flex items-center justify-center rounded-xl border border-gray-300 bg-white text-gray-700 shadow-sm hover:bg-gray-50 transition-colors"
      >
        <FcGoogle className="h-6 w-6 mr-3" />
        <span className="font-medium">Continuer avec Google</span>
      </button>
      
      <button
        type="button"
        onClick={handleFacebookLogin}
        className="w-full py-3 px-4 flex items-center justify-center rounded-xl border border-gray-300 bg-white text-gray-700 shadow-sm hover:bg-gray-50 transition-colors"
      >
        <FaFacebook className="h-6 w-6 text-blue-600 mr-3" />
        <span className="font-medium">Continuer avec Facebook</span>
      </button>
    </div>
  );
};

export default SocialAuth;
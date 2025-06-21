
import truckDriving from '../assets/animations/truck-driving.json';
import locationPin from '../assets/animations/location-pin.json';
import chatBubble from '../assets/animations/chat-bubble.json';

export const ANIMATIONS = {
  TRUCK: truckDriving,
  LOCATION: locationPin,
  CHAT: chatBubble
};

export const getAnimationOptions = (animationData) => ({
  loop: true,
  autoplay: true,
  animationData,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
});

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.5 }
};
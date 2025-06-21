
export const validateEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export const validatePassword = (password) => {
  return password.length >= 8;
};

export const formatUserRole = (role) => {
  const roles = {
    driver: 'Conducteur',
    shipper: 'Expéditeur',
    admin: 'Administrateur'
  };
  return roles[role] || role;
};

export const getAuthRedirect = (userRole) => {
  switch(userRole) {
    case 'driver': return '/dashboard/driver';
    case 'shipper': return '/dashboard/shipper';
    case 'admin': return '/dashboard/admin';
    default: return '/';
  }
};
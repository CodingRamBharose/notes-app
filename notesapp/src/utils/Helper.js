export function validateEmail(email) {
    const regex = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  }

export function validatePassword(password) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

 export function getInitials(name){
    if (!name) return '';
    const nameArray = name.split(' ');
    const initials = nameArray.map(n => n[0]).join('');
    return initials.toUpperCase();
  };
  
//DOM
const user_info = document.getElementById('user_info');

const settings = document.getElementById('settings');
const logout = document.getElementById('logout');
const login = document.getElementById('login');
const signUp = document.getElementById('signUp');

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
//user logs in
      user_info.innerHTML = user.email;
      settings.style.display = 'block';
      logout.style.display = 'block';
      login.style.display = 'none';
      signUp.style.display = 'none';

  }else {
    user_info.innerHTML = 'Hello, Sign in';
    settings.style.display = 'none';
    logout.style.display = 'none';
    login.style.display = 'block';
    signUp.style.display = 'block';
    //user logs out
  }
});

logout.addEventListener('click', e => {
  firebase.auth().signOut();
});

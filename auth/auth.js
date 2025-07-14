// AI: global nav auth toggle
const signInLink = document.getElementById('nav-signin');
const signOutBtn = document.getElementById('nav-signout');
if (signInLink && signOutBtn && firebase?.auth) {
  firebase.auth().onAuthStateChanged(user => {
    const signedIn = !!user;
    signInLink.style.display = signedIn ? 'none' : 'flex';
    signOutBtn.style.display = signedIn ? 'flex' : 'none';
  });

  signInLink.addEventListener('click', e => {
    e.preventDefault();
    window.location.href = '/auth/login.html';
  });

  signOutBtn.addEventListener('click', async () => {
    try {
      await firebase.auth().signOut();
    } catch (err) {
      console.error(err);
    }
    window.location.href = '/';
  });
}


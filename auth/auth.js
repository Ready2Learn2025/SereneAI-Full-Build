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

// AI: attach auth form listeners
document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');

  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value;
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password);
        window.location.href = '/prompt-library.html';
      } catch (err) {
        alert(err.message);
      }
    });
  }

  if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value;
      const confirm = document.getElementById('confirmPassword').value;

      if (password !== confirm) {
        alert('Passwords do not match.');
        return;
      }

      try {
        const cred = await firebase.auth().createUserWithEmailAndPassword(email, password);
        if (name && cred.user) {
          await cred.user.updateProfile({ displayName: name });
        }
        window.location.href = '/prompt-library.html';
      } catch (err) {
        alert(err.message);
      }
    });
  }
});


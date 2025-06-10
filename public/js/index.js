// Handler function for  login form submission
const LoginFormHandler = async (event) => {
    event.preventDefault();
    
    const username = document.querySelector('#username-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    if (username && password) {
        
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
      });
 
      if (response.ok) {
        document.location.replace('/'); 
      } else {
 
        alert('Failed to log in.'); 
      }
    }
  };
  
 
  const LoginForm = document.querySelector('.login-form');
  if (LoginForm) {
    LoginForm.addEventListener('submit', LoginFormHandler);
  }

  
  // Logout function to send request to log out the user
const Logout = async () => {
    const response = await fetch('/api/users/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
      document.location.replace('/'); 
    } else {
      alert('Failed to log out.'); 
    }
  };

  const LogoutButton = document.querySelector('#logout');
  if (LogoutButton) {
    LogoutButton.addEventListener('click', Logout);
  }

  
  // Signup request
const SignupFormHandler = async (event) => {
    event.preventDefault();
  
    const username = document.querySelector('#username').value.trim();
    const email = document.querySelector('#email').value.trim();
    const password = document.querySelector('#password').value.trim();
  
    if (username && email && password) {
      const response = await fetch('/api/users/signup', {
        method: 'POST',
        body: JSON.stringify({ username, email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to sign up.'); 
      }
    }
  };

  const SignupForm = document.querySelector('#signup-form');
  if (SignupForm) {
    SignupForm.addEventListener('submit', SignupFormHandler);
  }
  
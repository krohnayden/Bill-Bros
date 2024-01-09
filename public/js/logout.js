const logoutFormHandler = async (event) => {
  event.preventDefault();

 
    // Send a POST request to the API endpoint
    const response = await fetch('/api/user/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    
    console.log('Here');

    if (response.ok) {
      // If successful, redirect the browser to the profile page
      document.location.replace('/login');
    } else {
      alert(response.statusText);
    }
};

document
  .querySelector('#logout-btn')
  .addEventListener('click', logoutFormHandler);

const form = document.querySelector('.form');
if (!form) {
  console.error('Form element not found');
} else {
  form.addEventListener('submit', function(e) {
    e.preventDefault();
  let formData = new FormData(form);
  let dataObject = Object.fromEntries(formData.entries());
  // Output: { username: "john_doe", password: "johnpasswprd" } this is the user input
  
  if(!dataObject.username || !dataObject.password) {
    let message = document.getElementById('noempty');
    message.classList.remove('hidden');
  }
  else {
    const stored = localStorage.getItem('credentials');
    if (!stored) {
      dataObject.perms = 'admin';
      const toStore = {1: dataObject};
      localStorage.setItem('credentials', JSON.stringify(toStore));
      const message = document.getElementById('signupcomplete');
      if (message) message.classList.remove('hidden');
    } else {
      const creds = JSON.parse(stored) || {};
      let exists = false;
      for (const value of Object.values(creds)) {
        if (value && value.username === dataObject.username) {
          const message = document.getElementById('eeee');
          if (message) message.classList.remove('hidden');
          exists = true;
          break;
        }
      }
      if (!exists) {
        dataObject.perms = 'user';
        const num = String(Object.keys(creds).length + 1);
        const toAdd = {[num]: dataObject};
        const combined = {...creds, ...toAdd};
        localStorage.setItem('credentials', JSON.stringify(combined));
        const message = document.getElementById('signupcomplete');
        if (message) message.classList.remove('hidden');
      }
    }
  }
  });
}
// {1: {username: "admin", password: "admin1234", perms: "admin"}, 2: {username: "user1", password: "123", perms: "user"}}
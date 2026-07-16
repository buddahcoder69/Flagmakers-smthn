const submitbutton = document.querySelector('.submit');
if (submitbutton) {
  submitbutton.addEventListener('click', function(e) {
    e.preventDefault();

    const form = document.querySelector('.form');
    if (!form) return;

    const formData = new FormData(form);
    const dataObject = Object.fromEntries(formData.entries());
    const username = dataObject.username?.trim();
    const password = dataObject.password;

    if (!username || !password) {
      const message = document.getElementById('noempty');
      if (message) message.classList.remove('hidden');
      return;
    }

    const stored = localStorage.getItem('credentials');
    if (!stored) {
      const message = document.getElementById('invalid');
      if (message) message.classList.remove('hidden');
      return;
    }

    const creds = JSON.parse(stored) || {};
    let valid = false;

    for (const value of Object.values(creds)) {
      if (value && value.username === username && value.password === password) {
        valid = true;
        localStorage.setItem('currentUser', JSON.stringify({
          username: value.username,
          perms: value.perms
        }));
        const message = document.getElementById('loginsuccess');
        if (message) message.classList.remove('hidden');
        break;
      }
    }

    if (!valid) {
      const message = document.getElementById('invalid');
      if (message) message.classList.remove('hidden');
    }
  });
}
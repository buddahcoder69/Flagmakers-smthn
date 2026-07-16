let submitbutton = document.querySelector('.submit');
submitbutton.addEventListener('click', function(e) {
  e.preventDefault();
  let form = document.querySelector('.form');
  let formData = new FormData(form);
  let dataObject = Object.fromEntries(formData.entries());
  // Output: { username: "john_doe", password: "johnpasswprd" } this is the user input
  const creds = JSON.parse(localStorage.getItem('credentials'));
  for(const [key, value] of Object.entries(creds)) {
    console.log(key,value)
  }
})